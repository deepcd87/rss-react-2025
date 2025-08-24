import { useRef, useState } from 'react';
import { useStore } from '../store/store';
import type { FormErrors } from '../types/types';
import * as yup from 'yup';
import { validationSchema } from '../schemas/validationSchema';
import ValidationMessages from './ValidationMessages';
import type { FormProps } from '../types/types';

const UncontrolledForm = ({ onSubmitSuccess }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const { addForm, countries } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      acceptedTerms: formData.get('acceptedTerms') === 'on',
      picture: formData.get('picture') as File,
      country: formData.get('country') as string,
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      const reader = new FileReader();
      reader.readAsDataURL(formValues.picture);
      reader.onload = () => {
        const base64Picture = reader.result as string;

        addForm({
          ...formValues,
          picture: base64Picture,
        });

        onSubmitSuccess();
      };
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <ValidationMessages errors={errors.name} />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" min="0" />
        <ValidationMessages errors={errors.age} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <ValidationMessages errors={errors.email} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <ValidationMessages errors={errors.password} />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <ValidationMessages errors={errors.confirmPassword} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
        <ValidationMessages errors={errors.gender} />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country">
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <ValidationMessages errors={errors.country} />
      </div>

      <div className="form-group">
        <label htmlFor="picture">Profile Picture (PNG, JPEG, max 2MB)</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".png,.jpeg,.jpg"
        />
        <ValidationMessages errors={errors.picture} />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" name="acceptedTerms" />I accept the Terms and
          Conditions
        </label>
        <ValidationMessages errors={errors.acceptedTerms} />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
