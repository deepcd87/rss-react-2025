import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  country: yup.string().required('Country is required'),
  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'File too large', (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 2000000; // 2MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !(value instanceof File)) return false;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
});

export type FormData = yup.InferType<typeof validationSchema>;
