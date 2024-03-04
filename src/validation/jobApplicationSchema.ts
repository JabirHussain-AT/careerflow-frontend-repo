import * as Yup from 'yup';


interface FileObject {
    size: number;
  }
  

export const ApplicationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    takeResumeFromProfile: Yup.boolean(),
    resume: Yup.lazy((value) =>
      value && value.takeResumeFromProfile
        ? Yup.mixed<FileObject>()
            .required("Resume is required when taking from profile")
            .test({
              name: "fileSize",
              message: "File size is too large",
              test: (file) => file && (file as FileObject).size <= 102400, // Example: 100 KB
            })
        : Yup.mixed()
    ),
  });