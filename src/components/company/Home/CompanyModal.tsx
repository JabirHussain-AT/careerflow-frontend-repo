import React  from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import companySchema from "../../../validation/companySchema";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "../../../interface/IUserSlice";
import { toast } from "react-toastify";
import { companyForm } from "../../../redux/actions/companyActions";
import { CompanyModalProps } from "../../../interface/ICompanyModalProps";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const CompanyModal: React.FC<CompanyModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useSelector((state: IUserSelector) => state.user);
  const navigate = useNavigate();
  const validationSchema = companySchema;

  const modalStyles = {
    content: {
      width: "calc(2/3 * 100%)",
      maxWidth: "800px",
      height: "500px",
      margin: "auto",
      top: "80%",
      transform: "translateY(-50%)",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      registrationId: "",
      email: "",
      address: "",
      phoneNumber: "",
      totalEmployees: "",
      vision: "",
      founded: "",
      logo: "",
      linkedIn: "",
      websiteLink: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        formik.values.email = user.email;
        let file: any = values.logo;
        if (values.logo && typeof values.logo === "string") {
          // Assuming values.logo is a URL, you might want to skip uploading

          // Dispatch action to handle the form data
          const res = await dispatch(companyForm(values));

          toast.success("Company form submitted successfully!");
          if (res?.payload?.success) {
            navigate("/company/dashboard");
          }

          
        } else if (file instanceof File) {
          console.log(file, "<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>ittt");
          const formData = new FormData();
          formData.append("file", values.logo);
          formData.append("upload_preset", "wx0iwu8u");
          // Upload image to Cloudinary
          const cloudinaryResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dato7wx0r/upload",
            {
              method: "post",
              body: formData,
            }
          );

          const cloudinaryData = await cloudinaryResponse.json();
          console.log(cloudinaryData, "faiz");
          // Set the logo field to the Cloudinary URL
          formik.values.logo = cloudinaryData.url;

          // Dispatch action to handle the form data
          const res = await dispatch(companyForm(formik.values));

          toast.success("Company form submitted successfully!");
          if (res?.payload?.success) {
            navigate("/company/dashboard");
          }
        } else {
          // If no logo, just dispatch the action with other form values
          const res = await dispatch(companyForm(values));

          toast.success("Company form submitted successfully!");
          if (res?.payload?.success) {
            navigate("/company/dashboard");
          }
        }

        handleCloseModal();
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        toast.error("Error uploading logo. Please try again.");
      }
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={modalStyles}
    >
      <div className="relative">
        {error && (
          <div className="bg-red-500 z-[999] text-center mb-2 text-white text-sm py-2 px-3 rounded-md mt-3">
            {error}
          </div>
        )}

        <h2 className="text-black font-mono font-bold text-center mb-4">
          Company Registration Form
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="registrationId" className="block text-black">
              Company Registration ID:
            </label>
            <input
              type="text"
              id="registrationId"
              name="registrationId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationId}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.registrationId && formik.errors.registrationId
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.registrationId && formik.errors.registrationId && (
              <div className="text-red-500 mt-1">
                {formik.errors.registrationId}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-black">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 mt-1">{formik.errors.address}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-black">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 mt-1">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="totalEmployees" className="block text-black">
              Total Employees:
            </label>
            <input
              type="number"
              id="totalEmployees"
              name="totalEmployees"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalEmployees}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.totalEmployees && formik.errors.totalEmployees
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.totalEmployees && formik.errors.totalEmployees && (
              <div className="text-red-500 mt-1">
                {formik.errors.totalEmployees}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="vision" className="block text-black">
              Vision:
            </label>
            <textarea
              id="vision"
              name="vision"
              rows={3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.vision}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.vision && formik.errors.vision
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.vision && formik.errors.vision && (
              <div className="text-red-500 mt-1">{formik.errors.vision}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="founded" className="block text-black">
              Founded:
            </label>
            <input
              type="text"
              id="founded"
              name="founded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.founded}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.founded && formik.errors.founded
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.founded && formik.errors.founded && (
              <div className="text-red-500 mt-1">{formik.errors.founded}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="logo" className="block text-black">
              Logo:
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue("logo", event.currentTarget.files?.[0])
              }
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.logo && formik.errors.logo
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.logo && formik.errors.logo && (
              <div className="text-red-500 mt-1">{formik.errors.logo}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="linkedIn" className="block text-black">
              LinkedIn:
            </label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              placeholder="https://www.linkedin.com/company/example"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.linkedIn}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.linkedIn && formik.errors.linkedIn
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.linkedIn && formik.errors.linkedIn && (
              <div className="text-red-500 mt-1">{formik.errors.linkedIn}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="websire" className="block text-black">
              WebsiteLink:
            </label>
            <input
              type="url"
              id="websiteLink"
              name="websiteLink"
              placeholder="https://www.name.com/example"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.websiteLink}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.websiteLink && formik.errors.websiteLink
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.websiteLink && formik.errors.websiteLink && (
              <div className="text-red-500 mt-1">
                {formik.errors.websiteLink}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 text-white px-4 py-2"
          >
            Submit
          </button>
          <span
            className="bg-gray-500 ml-6 rounded px-4 py-2 text-white "
            onClick={handleCloseModal}
          >
            <button className="text-white mt-4 mx-auto "></button>Cancel
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default CompanyModal;
