import * as Yup from 'yup';

 const companySchema = Yup.object({
  registrationId: Yup.string().trim().required('Required'),
  address: Yup.string().trim().required('Required'),
  phoneNumber: Yup.string().trim().matches(/^\d+$/, 'Invalid phone number').required('Required'),
  totalEmployees: Yup.number().required('Required').positive('Must be a positive number'),
  vision: Yup.string().trim().required('Required'),
  founded: Yup.string().trim().required('Required'),
  logo: Yup.mixed().required('Required').test('fileType', 'Only PNG or JPEG allowed', function (value) {
    if (value instanceof File) {
      return ['image/jpeg', 'image/png'].includes(value.type);
    }
    return true;
  }),
  linkedIn: Yup.string().url('Invalid URL').required('Required'),
  websiteLink: Yup.string().url('Invalid URL').required('Required'),
});

export default companySchema