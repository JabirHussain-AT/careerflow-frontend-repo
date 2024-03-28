import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthCompanyBaseUrl, AuthBaseAdminUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";
import {
  IApproveCompanyAccount,
  ICategory,
} from "../../interface/ICompanyApprovelModal";



// fetching companies
export const fetchCompanies = async () => {
  try {
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/fetch-companies`,
      config
    );
    return data;
  } catch (err) {
    console.error(err, "=== error from fetching companies");
  }
};

export const approveCompanyAccount = createAsyncThunk(
  "compnay/approveStatus",
  async (updatigDetails: IApproveCompanyAccount, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${AuthCompanyBaseUrl}/approve-companyStatus `,
        updatigDetails,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const userBlockStatus = createAsyncThunk(
  "user/userBlockStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${AuthBaseAdminUrl}/change-user-Block-status/${userId}`,
        config
      );
      return data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${AuthBaseAdminUrl}/fetchUsers`, config);
    return data;
  } catch (err: unknown) {
    console.log(err, "err in the fetchUsers catch");
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(
      `${AuthCompanyBaseUrl}/fetchCategories`,
      config
    );
    return data;
  } catch (err: unknown) {
    console.log(err, "err in the fetchUsers catch");
  }
};

export const addCategories = createAsyncThunk(
  "compnay/addCategories",
  async (category: ICategory, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AuthCompanyBaseUrl}/add-Category`,
        category,
        config
      );
      return data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "company/deleteCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${AuthCompanyBaseUrl}/delete-Category/${category}`,
        config
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
);
