import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUserLoginData, ILoginForm } from "../../interface/IUserLogin";
import { AuthBaseUrl, AuthCompanyBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";

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
    } catch (err: any) {
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
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const isUserExist = createAsyncThunk(
  "user/isUserExist",
  async (userCredentials: any, { rejectWithValue }) => {
    try {
  
      const { data } = await axios.post(
        `${AuthBaseUrl}/exists`,
        userCredentials,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);




export const fetchJob = async (jobId: any) => {
  try {
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/fetchJob/${jobId}`,
      config
    );
    return data;
  } catch (err: any) {}
};

export const getUser = async (userId: any) => {
  try {
    const { data } = await axios.get(
      `${AuthBaseUrl}/fetchUser/${userId}`,
      config
    );
    return data;
  } catch (err: any) {}
};

//from here its mostly profile page data submissions actions

export const fetchUser = createAsyncThunk(
  "user/fetchUser ",
  async (userId: any, { rejectWithValue }) => {
    try {
      // console.log('User :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================',userId)
      const { data } = await axios.get(
        `${AuthBaseUrl}/fetchUser/${userId}`,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitUserProfilePic = createAsyncThunk(
  "user/userProfilePic ",
  async (userProfilePic: any, { rejectWithValue }) => {
    try {
      console.log(
        "User Educations  :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================",
        userProfilePic
      );
      const { data } = await axios.post(
        `${AuthBaseUrl}/update-profile`,
        userProfilePic,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitViewProfileUpdations = createAsyncThunk(
  "user/userProfileUpdations ",
  async (dataToStore: any, { rejectWithValue }) => {
    try {
      console.log(
        "User Educations  :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================",
        dataToStore
      );
      const { data } = await axios.post(
        `${AuthBaseUrl}/update-profile`,
        dataToStore,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);




export const fetchJobsMain = createAsyncThunk(
  "user/fetchJobsMain ",
  async (jobDocs: any, { rejectWithValue }) => {
    try {
      // console.log('User Jobs Looking  :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================',jobDocs)
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/find-jobs-data`,
        jobDocs,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const submitBasicDetials = createAsyncThunk(
  "user/submitbasicDetials ",
  async (basicDetials: any, { rejectWithValue }) => {
    try {
      // console.log('User updating profile :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================',basicDetials)
      const { data } = await axios.post(
        `${AuthBaseUrl}/updateBasicDetials`,
        basicDetials,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const createJobApply = createAsyncThunk(
  "user/createJobApply ",
  async (jobApplicationData: any, { rejectWithValue }) => {
    try {
      console.log(
        "job application submitting :: <<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================",
        jobApplicationData
      );
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/applyJob`,
        jobApplicationData,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const getUserApplications = createAsyncThunk(
  "user/getUserApplications ",
  async (userId: any, { rejectWithValue }) => {
    try {
      console.log("It reached here ");
      const { data } = await axios.get(
        `${AuthCompanyBaseUrl}/getUserApplications/${userId}`,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);



export const getPrefferedJobs = createAsyncThunk(
  "user/getPrefferedJobs",
  async ({ prefferedJobs, currentPage }: { prefferedJobs: any, currentPage: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${AuthCompanyBaseUrl}/getPrefferedJobs/${prefferedJobs}/${currentPage}`,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const chatUsersDetials = createAsyncThunk(
  "user/chatUsersDetials",
  async ( userIdContainer : any , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/get-chatUserDetials`,userIdContainer,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const saveTheJob = createAsyncThunk(
  "user/saveThejob",
  async ( { userId , jobId } :{ userId : string , jobId : string}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthBaseUrl}/save-the-job/${userId}/${jobId}`,
        {},
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
