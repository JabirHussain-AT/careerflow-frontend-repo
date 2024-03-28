import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUserLoginData, ILoginForm } from "../../interface/IUserLogin";
import { AuthBaseUrl, AuthCompanyBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";
import { IUserDoc } from "@/interface/IUserDoc";

//signup process
export const userSignUp = createAsyncThunk(
  "user/userSignUp",
  async (userCredientials: IUserLoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/sign-up`,
        userCredientials,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userCredentials: ILoginForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/login`,
        userCredentials,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const isUserExist = createAsyncThunk(
  "user/isUserExist",
  async (userCredentials: IUserDoc , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/exists`,
        userCredentials,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const isUserExistEmail = createAsyncThunk(
  "user/isUserExistemail",
  async (email : { email : string}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/exists`,
        email,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const fetchJob = async (jobId: string) => {
  try {
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/fetchJob/${jobId}`,
      config
    );
    return data;
  } catch (err) {}
};

export const getUser = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `${AuthBaseUrl}/fetchUser/${userId}`,
      config
    );
    return data;
  } catch (err) {}
};

//from here its mostly profile page data submissions actions

export const fetchUser = createAsyncThunk(
  "user/fetchUser ",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${AuthBaseUrl}/fetchUser/${userId}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitUserProfilePic = createAsyncThunk(
  "user/userProfilePic ",
  async (userProfilePic: { userId : string , profilePic : string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${AuthBaseUrl}/update-profile`,
        userProfilePic,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitViewProfileUpdations = createAsyncThunk(
  "user/userProfileUpdations ",
  async (dataToStore: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${AuthBaseUrl}/update-profile`,
        dataToStore,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const fetchJobsMain = createAsyncThunk(
  "user/fetchJobsMain ",
  async (jobDocs: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/find-jobs-data`,
        jobDocs,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitBasicDetials = createAsyncThunk(
  "user/submitbasicDetials ",
  async (basicDetials: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${AuthBaseUrl}/updateBasicDetials`,
        basicDetials,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const createJobApply = createAsyncThunk(
  "user/createJobApply ",
  async (jobApplicationData: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/applyJob`,
        jobApplicationData,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const getUserApplications = createAsyncThunk(
  "user/getUserApplications ",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${AuthCompanyBaseUrl}/getUserApplications/${userId}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const getPrefferedJobs = createAsyncThunk(
  "user/getPrefferedJobs",
  async (
    {
      prefferedJobs,
      currentPage,
    }: { prefferedJobs: string[] | string ; currentPage: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${AuthCompanyBaseUrl}/getPrefferedJobs/${prefferedJobs}/${currentPage}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const chatUsersDetials = createAsyncThunk(
  "user/chatUsersDetials",
  async (userIdContainer: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/get-chatUserDetials`,
        userIdContainer,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);



export const saveTheJob = createAsyncThunk(
  "user/saveThejob",
  async (
    { userId, jobId }: { userId: string; jobId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/save-the-job/${userId}/${jobId}`,
        {},
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);



export const resetPass = createAsyncThunk(
  "user/resetPass",
  async (
     email : string  ,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(
        `${AuthBaseUrl}/reset-password`,
        {email} ,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);



export const changePass = createAsyncThunk(
  "user/changePass",
  async (
    { oldPassword , newPassword } :{ oldPassword : string , newPassword : string}  ,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(
        `${AuthBaseUrl}/change-password`,
        { oldPassword , newPassword },
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
