import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUserLoginData, ILoginForm } from "../../interface/IUserLogin";
import { IAddingJobs, ICompanyForm } from "../../interface/ICompanySignup";
import { AuthCompanyBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";

//signup process
export const companySignUp = createAsyncThunk(
  "compnay/SignUp",
  async (companyCredientials: IUserLoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/sign-up`,
        companyCredientials,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const companyLogin = createAsyncThunk(
  "company/Login",
  async (userCredentials: ILoginForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/login`,
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

export const companyForm = createAsyncThunk(
  "company/Form",
  async (userCredentials: ICompanyForm, { rejectWithValue }) => {
    try {
      
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/updateForm`,
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

export const addingJob = createAsyncThunk(
  "company/add-jobs",
  async (detials: IAddingJobs, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/add-job`,
        detials,
        config
      );

      // console.log("======================================");
      // console.log("the data over here", data);
      // console.log("======================================");
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const changeStatusOfJobApplication = createAsyncThunk(
  "company/change-status/job-application",
  async (
    dataToSend: { applicantId: string | undefined ; jobId : string | undefined ; value: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/change-status/job-application`,
        dataToSend,
        config
      );

      // console.log("======================================");
      // console.log("the data over here", data);
      // console.log("======================================");
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const updatingJob = createAsyncThunk(
  "company/updating-jobs",
  async (detials: IAddingJobs, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/updating-job`,
        detials,
        config
      );
      // console.log("======================================");
      // console.log("the data over here in updating job   ", data);
      // console.log("======================================");
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);




export const fetchComJobs = async (id: string | any) => {
  try {
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/fetch-ComJobs/${id}`,
      config
    );
    return data;
  } catch (err: any) {
    console.error(err, "=== error from fetching  jobs based on companies");
  }
};

export const changeStatusOfJob = async (id: string, value: boolean) => {
  try {
    console.log(id);
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/changestatus/job/${id}/${value}`,
      config
    );
    return data;
  } catch (err: any) {
    console.error("error happened in the changeStatusOgJob", err);
  }
};

export const fetchJobs = async () => {
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/fetchJobs`, config);
    return data;
  } catch (err: any) {}
};

export const removeSchedule = async ({ jobId  , applicantId } : { jobId : string , applicantId : string }) => {
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/removeSchedule/${jobId}/${applicantId}`, config);
    return data;
  } catch (err: any) {
    console.log(err, ' err in the removeScheule ')
  }
};


export const getTotalJobsAndApplicants = async (Id : string)=>{
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/dashboard/get-jobs-applicants/${Id}`, config);
    return data;
  } catch (err: any) {
    console.log(err,'==> error happened in the get total jobs nad applicants ')
  }
}


export const getChartData = async (Id : string , filter : string)=>{
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/dashboard/get-jobs-applicants/${filter}/${Id}`, config);
    return data;
  } catch (err: any) {
    console.log(err,'==> error happened in the get total jobs nad applicants ')
  }
}


export const fetchInterViewSchedule = async (jobId : any , applicantId : any)=>{
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/job/get-interview-schedules/${jobId}/${applicantId}`, config);
    return data;
  } catch (err: any) {
    console.log(err,'==> error happened in the get interveiw schedule list applicant profile ')
  }
}


export const chatCompanyDetials = createAsyncThunk(
  "company/chatUsersDetials",
  async ( companyIdContainer : any , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/get-chatCompanyDetials`,companyIdContainer,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);


export const scheduleInterview = createAsyncThunk(
  "job/scheduleInterview",
  async ( interViewData : any , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/job/sceduleInterview`,interViewData,
        config
      );
      return data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
