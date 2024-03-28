import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import validationSchema from "../../../validation/jobAddingValidation"; // Replace with the correct path
import Dropdown from "@/components/common/Dropdown";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { addingJob } from "../../../redux/actions/companyActions";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICategory } from "@/interface/ICompanyApprovelModal";
import { fetchCategories } from "@/redux/actions/adminActions";

const CompanyJobsForm: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { user, error, loading } = useSelector(  
    (state: IUserSelector) => state.user
  );
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allCategories , setAllCategories ] = useState<string[]>([])

  const [requirements, setRequirements] = useState<string[]>([]);
  const [requirementsInput, setRequirementsInput] = useState<string>("");

  const [skills, setSkills] = useState<string[]>([]);
  const [skillsInput, setSkillInput] = useState<string>("");

  const [requirmentError, setRequirmentError] = useState<boolean>(false);
  const [duplicationError, setDuplicationError] = useState<boolean>(false);
  const [requirmentErrorSkills, setRequirmentErrorSkills] =
    useState<boolean>(false);
  const [duplicationErrorSkills, setDuplicationErrorSkills] =
    useState<boolean>(false);

    useEffect(()=>{
      const fetchCategoriesFun = async ( ) =>  {
        const result = await fetchCategories()
        let temp : string[] = []
        const updatedResult = result?.data.filter((data : ICategory)=>{
          console.log(updatedResult)
          let category = data?.category
          temp.push(category)
          return category
        })
       
        setAllCategories(temp)
    }
    fetchCategoriesFun()
    },[])

  // Job type
  const handleJobTypeChange = (
    selectedOption: string,
    setFieldValue: Function
  ) => {
    setSelectedJobType(selectedOption);
    setFieldValue("selectedJobType", selectedOption);
  };

  // Category
  const handleCategoryChange = (
    selectedOption: string,
    setFieldValue: Function
  ) => {
    setSelectedCategory(selectedOption);
    setFieldValue("selectedCategory", selectedOption);
  };

  //Skills
  const handleRemoveSkills = (index: number): void => {
    setSkills((prevSkills) => {
      return prevSkills.filter((_, i) => i !== index);
    });
  };

  const handleAddSkills = (
    value: any,
    setFieldError: Function,
    setFieldValue: Function
  ) => {
    if (skills.includes(skillsInput.trim())) {
      setDuplicationErrorSkills(true);
      return;
    }

    if (skillsInput.trim() !== "") {
      setDuplicationErrorSkills(false);
      setSkills((prev) => [...prev, skillsInput]);
      setFieldValue("skills", [...skills, skillsInput]);
      setSkillInput("");
      setRequirmentErrorSkills(true);
    }
    setRequirmentErrorSkills(false);
    if(value && setFieldError){
      console.log(value,setFieldError)
    }
  };

  const handleSkillInputChange = (value: any) => {
    setSkillInput(value);
  };

  // Requerments
  const handleRemoveRequirments = (index: number): void => {
    setRequirements((prevRequirements) => {
      return prevRequirements.filter((_, i) => i !== index);
    });
  };

  const handleAddRequirments = (
    value: any,
    setFieldError: Function,
    setFieldValue: Function
  ) => {
    if (requirements.includes(requirementsInput.trim())) {
      setDuplicationError(true);
      return;
    }

    if (requirementsInput.trim() !== "") {
      setDuplicationError(false);
      setRequirements((prev) => [...prev, requirementsInput]);
      setFieldValue("requirements", [...requirements, requirementsInput]);
      setRequirementsInput("");
      setRequirmentError(false);
    }
    setRequirmentError(true);
    if(value && setFieldError){
      console.info(value,'---',setFieldError)
    }
  };

  const handleInputChange = (value: any) => {
    setRequirementsInput(value);
  };

  // job expiry

  const handleDateChange = (
    date: Date | string | null,
    setFieldValue: Function
  ) => {
    setFieldValue("jobExpiry", date);
  };

  //

  const handleSubmit = async (values: any) => {
    try {
      setRequirmentError(true);

      values.requirements = requirements;
      values.companyId = user?._id;
      values.companyEmails = user?.email;

      console.log("Form data:", values);
      const res = await dispatch(addingJob(values));

      if (res.payload.success) {
        console.log("------------");
        console.log("success the adding job front end");
        console.log("------------");
        toast.success("Job added successfully!");
      } else {
        console.log("Error adding job:", res.payload.error);
        console.log("------------");
        console.log("------------");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-500 mx-28 z-[999] text-center mb-2 text-white text-sm py-2 px-3 rounded-md mt-3">
          {error}
        </div>
      )}

      <div>
        <h2 className="text-md font-mono px-5 py-3 font-bold underline">
          Post A Job
        </h2>
      </div>
      <div className="w-full text-black">
        <div className="lg:w-5/6 mx-auto">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              selectedJobType: "",
              selectedCategory: "",
              jobTitle: "",
              jobDescription: "",
              requirements: "",
              skills: [""],
              salary: "",
              jobExpiry:'',
              vacancy: "",
            }}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue, setFieldError }) => (
              <Form className="flex flex-wrap">
                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label>Job Title</label>
                  <Field
                    name="jobTitle"
                    as={Input}
                    placeholder="Enter Job Title"
                    type="text"
                    className="bg-white"
                  />
                  <ErrorMessage
                    name="jobTitle"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label>
                    {" "}
                    Job Type <br />{" "}
                  </label>
                  <Dropdown
                    button={
                      <div className="btn rounded-md px-5 py-2 text-sm bg-white ">
                        {selectedJobType || "Select Job Type"}
                      </div>
                    }
                    title="Select Job Type"
                    options={["Full time", "Part Time", "Remote"]}
                    onChange={(selectedOption: string) =>
                      handleJobTypeChange(selectedOption, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="selectedJobType"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label>
                    {" "}
                    Category <br />
                  </label>
                  <Dropdown
                    button={
                      <div className="btn rounded-md px-5 py-2 text-sm bg-white ">
                        {selectedCategory || "Select Category"}
                      </div>
                    }
                    title="Select .."
                    options={allCategories}
                    onChange={(selectedOption: string) =>
                      handleCategoryChange(selectedOption, setFieldValue)
                    }
                  />
                  {/* <Dropdown
                    button={
                      <div className="btn rounded-md px-5 py-2 text-sm bg-white ">
                        {selectedCategory || "Select Category"}
                      </div>
                    }
                    title="Select .."
                    options={["Devoloper", "Marketing", "Accountant"]}
                    onChange={(selectedOption: string) =>
                      handleCategoryChange(selectedOption, setFieldValue)
                    }
                  /> */}
                  <ErrorMessage
                    name="selectedCategory"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label htmlFor="jobDescription">
                    Job Description <br />
                  </label>
                  <Field
                    name="jobDescription"
                    as="textarea"
                    placeholder="Enter job description here"
                    className="bg-white w-72 rounded-md"
                  />
                  <ErrorMessage
                    name="jobDescription"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label htmlFor="No of Vacancies">
                    No of Vacancies <br />
                  </label>
                  <Field
                    name="vacancy"
                    as={Input}
                    placeholder="Enter No of Vacancies here"
                    className="bg-white w-72 rounded-md"
                  />
                  <ErrorMessage
                    name="vacancy"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label htmlFor="No of Vacancies">
                    Salary <br />
                  </label>
                  <Field
                    name="salary"
                    as={Input}
                    placeholder="Enter No of Vacancies here"
                    className="bg-white w-72 rounded-md"
                  />
                  <ErrorMessage
                    name="salary"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/*  */}
                {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label htmlFor="requirements">
                    Requirements <br />
                    <div className="w-full flex justify-start flex-wrap">
                      {requirements?.length > 0 && (
                        <div className="bg-yellow-50 rounded-md font-serif">
                          {requirements.map((elem, index) => (
                            <div className=" flex" key={index}>
                              <div className="flex px-3   py-1">
                                <span className="mx-auto mt-1">
                                  <BsDot />{" "}
                                </span>
                                <h5 className="font-sans">{elem}</h5>
                                <span
                                  onClick={() => handleRemoveRequirments(index)}
                                >
                                  <FaTrash className="text-xs m-2 cursor-pointer text-gray-500" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                  <div className="flex flex-wrap mx-auto">
                    <input
                      className="px-2 rounded-md"
                      type="text"
                      min={1}
                      value={requirementsInput}
                      placeholder="Enter Requirements"
                      onChange={(e) => handleInputChange(e.target.value)}
                    />

                    <span className="p-3">
                      <FaPlus
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          handleAddRequirments(
                            values.requirements,
                            setFieldError,
                            setFieldValue
                          )
                        }
                      />
                    </span>
                  </div>
                  {requirmentError && requirements?.length == 0 && (
                    <p className="text-red-500">Requirments is Required</p>
                  )}
                  {duplicationError && (
                    <p className="text-red-500">Its Already exists</p>
                  )}
                </div>

                {/* <<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="w-full lg:w-1/2 px-2 mb-4">
                  <label htmlFor="requirements">
                    Skills <br />
                    <div className="w-full flex justify-start flex-wrap">
                      {skills?.length > 0 && (
                        <div className="bg-yellow-50 rounded-md font-serif">
                          {skills.map((elem, index) => (
                            <div className=" flex" key={index}>
                              <div className="flex px-3   py-1">
                                <span className="mx-auto mt-1">
                                  <BsDot />{" "}
                                </span>
                                <h5 className="font-sans">{elem}</h5>
                                <span onClick={() => handleRemoveSkills(index)}>
                                  <FaTrash className="text-xs m-2 cursor-pointer text-gray-500" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                  <div className="flex flex-wrap mx-auto">
                    <input
                      className="px-2 rounded-md"
                      type="text"
                      min={1}
                      value={skillsInput}
                      placeholder="Enter Requirements"
                      onChange={(e) => handleSkillInputChange(e.target.value)}
                    />

                    <span className="p-3">
                      <FaPlus
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          handleAddSkills(
                            values.skills,
                            setFieldError,
                            setFieldValue
                          )
                        }
                      />
                    </span>
                  </div>
                  {requirmentErrorSkills && skills?.length == 0 && (
                    <p className="text-red-500">Skills is Required</p>
                  )}
                  {duplicationErrorSkills && (
                    <p className="text-red-500">Its Already exists</p>
                  )}
                </div>

                {/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="w-full  lg:w-1/2 px-2 mb-4 h-auto">
                  <label htmlFor="jobExpiry">
                    Job Expiry <br />{" "}
                  </label>
                  <DatePicker
                   selected={values.jobExpiry ? new Date(Date.parse(values.jobExpiry)) : null}
                    onChange={(date) => handleDateChange(date, setFieldValue)}
                    minDate={new Date()} // Restrict to future dates
                    className="bg-white w-auto py-1 px-2 rounded-md"
                  />
                  <ErrorMessage
                    name="jobExpiry"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* ... Repeat the pattern for other fields ... */}

                <div className="w-full px-2 mb-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`transition duration-300 ${
                      loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    } text-white duration-300 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobsForm;
