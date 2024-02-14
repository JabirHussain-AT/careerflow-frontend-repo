import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUserLoginData , ILoginForm} from "../../interface/IUserLogin";
import { AuthBaseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";

//signup process
export const userSignUp = createAsyncThunk('user/userSignUp' , async (userCredientials : IUserLoginData,{rejectWithValue})=>{
     try{
          const {data} = await axios.post(`${AuthBaseUrl}/sign-up`,userCredientials,config)
          return data 
     }catch(err : any){
      const axiosError = err as AxiosError<ApiError>;
          return handleError(axiosError, rejectWithValue);
     }
  })

export const userLogin = createAsyncThunk('user/userLogin' ,async (userCredentials : ILoginForm ,{rejectWithValue}) =>{
     try{
          const {data} = await axios.post(`${AuthBaseUrl}/login`,userCredentials,config)
          return data

     }catch(err : any ){
          const axiosError = err as AxiosError<ApiError> ;
          return handleError(axiosError,rejectWithValue)
     }
})
export const isUserExist = createAsyncThunk('user/isUserExist' ,async (userCredentials : any ,{rejectWithValue}) =>{
     try{
          console.log('<<<<<<<<>>>>>>>>>>>>>>>>>>>==========================================================',userCredentials)
          const {data} = await axios.post(`${AuthBaseUrl}/exists`,userCredentials,config)
          return data

     }catch(err : any ){
          const axiosError = err as AxiosError<ApiError> ;
          return handleError(axiosError,rejectWithValue)
     }
})


