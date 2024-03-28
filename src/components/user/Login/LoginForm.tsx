import React from "react";
import { useFormik } from "formik";
// import GoogleButton from "./GoogleButton";
import { LoginFormProps } from "../../../interface/IUserLogin";
import { FormData } from "../../../interface/IUserLogin";
import { validationSchema } from "../../../validation/LoginFormValdiation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../redux/actions/userActions";
import { IUserSelector } from "../../../interface/IUserSlice";

import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { CustomJwtPayload , userDataByGoogle } from "../../helper/interfaces";

const LoginForm: React.FC<LoginFormProps> = ({ textToshow, submitLink }) => {
  const {  error } = useSelector(
    (state: IUserSelector) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values, submitLink);
    },
  });

  const googleLogin = async (response: string | any, status: boolean)=> {
    if (status) {
      try {
        let credentials : CustomJwtPayload = jwtDecode(response.credential);
  
        let userValues: userDataByGoogle = {
          email: credentials?.email,
          password : '%^%^&%&' ,
          googleAuth : true
        };
  
        const userData = await dispatch(userLogin(userValues));

        if(userData){
         navigate('/')
        }
         
      } catch (error) {
        console.error('Error processing Google Log In:', error);
      }
    }
  };
  

  const handleFormSubmit = async (values: FormData, submitLink: string) => {
    const data = await dispatch(userLogin(values));
    if (data.type !== "user/userLogin/rejected") {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };

  return (
    <section className="h-[500px] mr-10">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 flext justify-center items-center md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            {error && (
              <div className="bg-red-500 z-999 text center mb-2 text-white text-sm py-2 px-3 rounded-md mt-3">
                {error}
              </div>
            )}
            <div className="text-center mt-0 mb-5">
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Career<span className="text-blue-500">Flow</span>
              </h1>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* <GoogleButton text={'Login with Google'}/> */}
              <div className="flex justify-center items-start">
                <GoogleLogin
                  text="continue_with"
                  onSuccess={(credentialResponse) => {
                    googleLogin(credentialResponse, true);
                  }}
                  onError={() => {
                    googleLogin("err", false);
                    console.log("Login Failed");
                  }}
                />
              </div>

              <div className="my-4 flex items-center  justify-center border-t border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-gray-500 dark:text-white">
                  OR
                </p>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-500 mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border border-gray-300 rounded p-2 w-full ${
                    formik.touched.email &&
                    formik.errors.email &&
                    "border-red-500"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-500 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border border-gray-300 rounded p-2 w-full ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div onClick={()=> navigate('/reset/password')} className="mb-4 flex items-center justify-between font-serif  hover:underline  text-blue-500 hover:text-blue-600">            
                  Forgot password?
              </div>

              <button
                className="w-full bg-blue-600 py-2 text-sm font-medium text-white rounded transition duration-300 ease-in-out transform hover:bg-blue-700"
                type="submit"
              >
                Login
              </button>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-semibold">
                  Don't have an account?{" "}
                  <a
                    onClick={() => navigate("/signup ")}
                    className=" cursor-pointer text-blue-700 hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                  >
                    Register
                  </a>
                </p>
                {/* <p className="text-sm font-semibold">
                  {textToshow}{" "}
                  <a
                   onClick={() => navigate("/company/signup ")}
                    className="text-blue-700 hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                  >
                    Click here
                  </a>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
