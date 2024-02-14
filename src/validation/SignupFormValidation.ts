import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. No white spaces are allowed.'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
  userName: Yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z]*$/,
      'Username cannot contain numbers, dots, underscores, and hyphens'
    )
    .matches(/^[a-zA-Z0-9._-]+(?:\s[a-zA-Z0-9._-]+)?$/, 'Username can only contain letters, numbers, dots, underscores, and hyphens. If there is a space, it should be between characters.')
});
