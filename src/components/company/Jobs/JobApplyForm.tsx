import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import { ApplicationSchema } from "@/validation/jobApplicationSchema";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import axios from "axios";

interface ApplicationFormProps {
  userData: any;
  handleSubmit: (values: FormData) => void;
  handleModalClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  resume: string | File;
  takeResumeFromProfile: boolean;
  takeResumeOption?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  userData,
  handleSubmit,
  handleModalClose,
}) => {
  console.log("🚀 ~ file: JobApplyForm.tsx:28 ~ userData:", userData)
  const { user } = useSelector((state: IUserSelector) => state.user);

  return (
    <Formik
      initialValues={{
        fullName: user?.userName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        resume: user?.resume || "",
        takeResumeFromProfile: false,
        takeResumeOption: user?.resume ? "yes" : "no",
      }}
      validationSchema={ApplicationSchema}
      onSubmit={async (values: FormData, actions) => {
        if (
          values.takeResumeOption === "no" &&
          (!values.resume || values.resume === "")
        ) {
          // If resume is not provided and not taken from the profile
          actions.setSubmitting(false);
          actions.setFieldError("resume", "Please upload your resume.");
          return;
        }

        if (values.takeResumeOption === "no" && values.resume instanceof File) {
          try {
            // Upload the new resume to Cloudinary
            const formData = new FormData();
            formData.append("file", values.resume);
            formData.append("upload_preset", "wx0iwu8u"); // Replace with your Cloudinary upload preset
            const cloudinaryResponse = await axios.post(
              "https://api.cloudinary.com/v1_1/dato7wx0r/upload",
              formData
            );

            // Update values.resume with the Cloudinary URL
            values.resume = cloudinaryResponse.data.secure_url;
          } catch (error) {
            console.error("Error uploading resume to Cloudinary:", error);
            // Handle error, set values.resume to a default URL or handle accordingly
          }
        }

        await handleSubmit(values);
        handleModalClose();
        actions.setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="w-full h-[500px] overflow-auto">
            <div className="w-full border-b-2 border-black p-2 h-3/12">
              <h1 className="my-1 py-2 text-lg font-bold font-sans">
                Submit Your Application
              </h1>
            </div>
            <div className="w-full h-9/12 p-4">
              <div className="mb-4">
                <div className="flex w-full">
                  <label
                    className="w-3/12 font-semibold font-sans text-md "
                    htmlFor="fullName"
                  >
                    Full Name :{" "}
                  </label>
                  <Field
                    className="border w-9/12 border-black py-1  px-1 ms-2 bg-gray-200 rounded focus:"
                    type="text"
                    name="fullName"
                  />
                </div>
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <div className="flex w-full ">
                  <label
                    className="w-3/12 font-semibold font-sans text-md"
                    htmlFor="email"
                  >
                    Email Address :{" "}
                  </label>
                  <Field
                    className="border w-9/12 border-black py-1 px-1 ms-2 bg-gray-200 rounded focus:"
                    type="text"
                    name="email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <div className="w-full flex">
                  <label
                    className="w-3/12 font-semibold font-sans text-md"
                    htmlFor="phoneNumber"
                  >
                    Phone Number :{" "}
                  </label>
                  <Field
                    className="border w-9/12 border-black py-1 px-1 ms-2 bg-gray-200 rounded focus:"
                    type="text"
                    name="phoneNumber"
                  />
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <h2 className="my-1 py-2 text-lg font-bold font-sans">
                  Attach Resume
                </h2>
                {user?.resume && (
                  <div className="mb-4">
                    <p>Do you want to take the resume from your profile?</p>
                    <label>
                      <Field type="radio" name="takeResumeOption" value="yes" />
                      Yes
                    </label>
                    <label className="ml-4">
                      <Field type="radio" name="takeResumeOption" value="no" />
                      No
                    </label>
                  </div>
                )}
                {(values?.takeResumeOption === "no" || !user?.resume) && (
                  <div className="mb-4">
                    <label htmlFor="resume">Upload your resume : </label>
                    <Field
                      name="resume"
                      render={({ field }: FieldProps) => (
                        <input
                          type="file"
                          onChange={(e: any) =>
                            setFieldValue("resume", e.currentTarget.files[0])
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      name="resume"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationForm;
