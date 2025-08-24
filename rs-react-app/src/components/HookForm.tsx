import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../store/store';
import ValidationMessages from './ValidationMessages';
import { useState } from 'react';
import { validationSchema, type FormData } from '../schemas/validationSchema';
import type { FormProps } from '../types/types';

const HookForm = ({ onSubmitSuccess }: FormProps) => {
  const { addForm, countries } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const passwordValue = watch('password');

  const validatePasswordStrength = (password: string) => {
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    let strength = 0;
    if (hasNumber) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasSpecialChar) strength++;

    return strength;
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('picture', file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onload = (e) => {
        setPicturePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.picture as File);
    reader.onload = () => {
      const base64Picture = reader.result as string;

      addForm({
        ...data,
        picture: base64Picture,
      });

      onSubmitSuccess();
    };
  };

  const passwordStrength = passwordValue
    ? validatePasswordStrength(passwordValue)
    : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        <ValidationMessages errors={errors.name?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
        />
        <ValidationMessages errors={errors.age?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        <ValidationMessages errors={errors.email?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {passwordValue && (
          <div className="password-strength">
            <div className="strength-meter">
              <div
                className={`strength-bar ${passwordStrength > 0 ? 'active' : ''}`}
                data-strength="1"
              ></div>
              <div
                className={`strength-bar ${passwordStrength > 1 ? 'active' : ''}`}
                data-strength="2"
              ></div>
              <div
                className={`strength-bar ${passwordStrength > 2 ? 'active' : ''}`}
                data-strength="3"
              ></div>
              <div
                className={`strength-bar ${passwordStrength > 3 ? 'active' : ''}`}
                data-strength="4"
              ></div>
            </div>
            <div className="strength-label">
              {passwordStrength === 0 && 'Very Weak'}
              {passwordStrength === 1 && 'Weak'}
              {passwordStrength === 2 && 'Fair'}
              {passwordStrength === 3 && 'Good'}
              {passwordStrength === 4 && 'Strong'}
            </div>
          </div>
        )}
        <ValidationMessages errors={errors.password?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <ValidationMessages errors={errors.confirmPassword?.message} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" value="male" {...register('gender')} />
            Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} />
            Female
          </label>
        </div>
        <ValidationMessages errors={errors.gender?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" {...register('country')}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <ValidationMessages errors={errors.country?.message} />
      </div>

      <div className="form-group">
        <label htmlFor="picture">Profile Picture (PNG, JPEG, max 2MB)</label>
        <input
          id="picture"
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handlePictureChange}
        />
        {picturePreview && (
          <div className="picture-preview">
            <img src={picturePreview} alt="Preview" />
          </div>
        )}
        <ValidationMessages errors={errors.picture?.message} />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" {...register('acceptedTerms')} />I accept the
          Terms and Conditions
        </label>
        <ValidationMessages errors={errors.acceptedTerms?.message} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
