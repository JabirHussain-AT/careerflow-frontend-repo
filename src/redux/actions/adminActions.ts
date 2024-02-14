import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthCompanyBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";
import { IApproveCompanyAccount } from '../../interface/ICompanyApprovelModal'

// fetching companies
export const fetchCompanies = async () => {
  try {
    const { data } = await axios.get(`${AuthCompanyBaseUrl}/fetch-companies`, config);
    return data;
  } catch (err: any) {
     console.error(err, '=== error from fetching companies')
  }
};

export const approveCompanyAccount = createAsyncThunk('compnay/approveStatus' , async ( updatigDetails : IApproveCompanyAccount ,{rejectWithValue})=>{
  try{
       console.log(' IF IT IS HERE IT IS SUCCESS >><><><><><><>',updatigDetails)
       const {data} = await axios.post(`${AuthCompanyBaseUrl}/approve-companyStatus `, updatigDetails ,config)
       return data 
  }catch(err : any){
   const axiosError = err as AxiosError<ApiError>;
       return handleError(axiosError, rejectWithValue);
  }
})
