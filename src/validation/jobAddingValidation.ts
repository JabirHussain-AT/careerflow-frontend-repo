import * as Yup from "yup";

const validationSchema = Yup.object({
  selectedJobType: Yup.string().required("Job Type is required"),
  selectedCategory: Yup.string().required("Category is required"),
  jobTitle: Yup.string().required("Job Title is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  requirements: Yup.array()
    .of(Yup.string().required("Requirement is required"))
    .min(1, "At least one requirement is required"),
  skills: Yup.array().of(Yup.string().required('Skill is required')),
  salary: Yup.string()
    .required('Salary is required')
    .test('valid-salary', 'Invalid salary range eg : min - max', function (value : any) : any {

      const salaryRange = value.split('-').map(Number);
      if (salaryRange.length === 2 && !isNaN(salaryRange[0]) && !isNaN(salaryRange[1])) {
        return salaryRange[1] > salaryRange[0];
      }

      return false;
    }),
    jobExpiry: Yup.date()
    .required('Job Expiry is required')
    .min(new Date(), 'Job Expiry must be a future date'),
  vacancy: Yup.number().required('Number of Vacancies is required').positive('Number of Vacancies must be a positive number'),
});

export default validationSchema;
