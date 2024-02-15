import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUserLoginData , ILoginForm} from "../../interface/IUserLogin";
import {IAddingJobs, ICompanyForm} from '../../interface/ICompanySignup'
import { AuthCompanyBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";

//signup process
export const companySignUp = createAsyncThunk('compnay/SignUp' , async (companyCredientials : IUserLoginData,{rejectWithValue})=>{
     try{
        console.log(' IF IT IS HERE IT IS SUCCESS UNTIL HERE OKAY ')
          const {data} = await axios.post(`${AuthCompanyBaseUrl}/sign-up`,companyCredientials,config)
          return data 
     }catch(err : any){
      const axiosError = err as AxiosError<ApiError>;
          return handleError(axiosError, rejectWithValue);
     }
  })


export const companyLogin = createAsyncThunk('company/Login' ,async (userCredentials : ILoginForm ,{rejectWithValue}) =>{
     try{
          const {data} = await axios.post(`${AuthCompanyBaseUrl}/login`,userCredentials,config)
          return data

     }catch(err : any ){
          const axiosError = err as AxiosError<ApiError> ;
          return handleError(axiosError,rejectWithValue)
     }
})



export const companyForm = createAsyncThunk('company/Form' ,async (userCredentials : ICompanyForm  ,{rejectWithValue}) =>{
     try{
          
          
          const {data} = await axios.post(`${AuthCompanyBaseUrl}/updateForm`,userCredentials,config)
          
                         console.log('======================================')
                         console.log('the data over here',data)
                         console.log('======================================')
          return data

     }catch(err : any ){
          const axiosError = err as AxiosError<ApiError> ;
          return handleError(axiosError,rejectWithValue)
     }
})
export const addingJob = createAsyncThunk('company/add-jobs' ,async (detials : IAddingJobs  ,{rejectWithValue}) =>{
     try{
          
          
          const {data} = await axios.post(`${AuthCompanyBaseUrl}/add-job`,detials,config)
          
                         console.log('======================================')
                         console.log('the data over here',data)
                         console.log('======================================')
          return data

     }catch(err : any ){
          const axiosError = err as AxiosError<ApiError> ;
          return handleError(axiosError,rejectWithValue)
     }
})

export const fetchComJobs = async (id : string | any) => {
     try {
       const { data } = await axios.get(`${AuthCompanyBaseUrl}/fetch-ComJobs/${id}`, config);
       return data;
     } catch (err: any) {
        console.error(err, '=== error from fetching  jobs based on companies')
     }

}



