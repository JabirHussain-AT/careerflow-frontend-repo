import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { signUpValidationSchema } from "../../../validation/SignupFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import OtpPage from "./OtpPage";
import {
  CustomJwtPayload,
  SignUpFormValues,
  UserValues,
} from "../../helper/interfaces";
import { isUserExistEmail, userSignUp } from "../../../redux/actions/userActions";
import { IUserSelector } from "../../../interface/IUserSlice";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { companySignUp } from "../../../redux/actions/companyActions";
import DialogueBox from "../../common/DialogueBox";

const SignUpCard: React.FC<{
  text: string;
  namePlaceholder: string;
}> = (props) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: IUserSelector) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userValues, setUserValues] = useState<any>({});
  const [stepFirst, setStepFirst] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [_, setDialogInputValue] = useState("");
  const [userTempData, setUserTempData] = useState<SignUpFormValues>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },

    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      let userData = {};
      console.log("🚀 ~ file: SignUpCard.tsx:54 ~ onSubmit: ~ userData:", userData)
      let userExist;
      const pathLocater = location.pathname.includes("/company");

      if (!pathLocater) {
        userData = await dispatch(userSignUp(values));
        setStepFirst(!stepFirst);
      } else {
        let temp = { email: values.email };
        userExist = await dispatch(isUserExistEmail(temp));
      }
      if (userExist?.payload?.sucess) {
        userData = await dispatch(companySignUp(values));
        setStepFirst(!stepFirst);
      } else {
        setUserTempData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        console.log(error, "<<<<<<<<>>>>>>> this is error");
      }

      setUserTempData(values);
    },
  });

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleDialogSubmit = async (inputValue: string) => {
    const updatedUserValues = {
      ...userValues,
      userName: inputValue,
    };

    setUserValues(updatedUserValues);
    console.log("Submitted Input Value:", inputValue);

    const userData = await dispatch(companySignUp(updatedUserValues));
    if (userData) navigate("/company/UpdateForm");
    setDialogInputValue(inputValue);
  };

  const googleSignIn = async (response: string | any, status: boolean) => {
    if (status) {
      try {
        let credentials: CustomJwtPayload = jwtDecode(response.credential);

        let userValues: UserValues = {
          userName: credentials?.name,
          email: credentials?.email,
          profilePic: credentials?.picture,
        };

        const pathLocater = location.pathname.includes("/company");
        let userData = {};
        console.log("🚀 ~ file: SignUpCard.tsx:113 ~ googleSignIn ~ userData:", userData)

        if (!pathLocater) {
          userData = dispatch(userSignUp(userValues));
        } else {
          let temp = { email: userValues.email };

          let userExist = await dispatch(isUserExistEmail(temp));
          if (userExist?.payload?.sucess) {
            setIsOpen(true);
            // userValues.userName =  dialogInputValue;
            // const nonEmptyValue = await waitForDialogInputValue();
            // userData = dispatch(companySignUp(userValues));
            setUserValues(userValues);
          }
        }
      } catch (error) {
        console.error("Error processing Google Sign In:", error);
      }
    }
  };

  return (
    <>
      {stepFirst ? (
        <OtpPage userData={userTempData} />
      ) : (
        <div className=" bg-white w-4/5 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {isOpen && (
            <DialogueBox
              isOpen={isOpen}
              onClose={handleDialogClose}
              onSubmit={handleDialogSubmit}
            />
          )}
          <div className="p-6 space-y-4 md:space-y-6  sm:p-8">
            <h1 className=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {props.text}
            </h1>

            {/* <GoogleButton text={'continue with gooogle'}/> */}
            <div className="flex justify-center items-start">
              <GoogleLogin
                text="signup_with"
                onSuccess={(credentialResponse) => {
                  googleSignIn(credentialResponse, true);
                }}
                onError={() => {
                  googleSignIn("err", false);
                  console.log("Login Failed");
                }}
              />
            </div>

            <div className="my-4 flex items-center  justify-center border-t border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-gray-500 dark:text-white">
                OR
              </p>
            </div>

            {error && (
              <div className="bg-red-500 z-[999] text-center mb-2 text-white text-sm py-2 px-3 rounded-md mt-3">
                {error}
              </div>
            )}

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {props.namePlaceholder}
                </label>
                <input
                  type="text"
                  name="userName"
                  id="username"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.touched.userName &&
                    formik.errors.userName &&
                    "border-red-500"
                  }`}
                  placeholder={props.namePlaceholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.userName}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.touched.email &&
                    formik.errors.email &&
                    "border-red-500"
                  }`}
                  placeholder="name@company.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      formik.touched.password &&
                      formik.errors.password &&
                      "border-red-500"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff color="#808080" size={16} />
                    ) : (
                      <IoMdEye color="#808080" size={16} />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    "border-red-500"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.terms}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.terms}
                </div>
              )}

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {!location.pathname.includes("/company") ? (
                  <>
                    Are you a Company?{" "}
                    <Link
                      to="/company/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Click here
                    </Link>
                  </>
                ) : (
                  <>
                    Are you a User?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Click here
                    </Link>
                  </>
                )}
              </p>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login" // Replace "/login" with the path to your login page
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpCard;
