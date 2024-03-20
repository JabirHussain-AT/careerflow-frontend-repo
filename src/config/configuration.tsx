import { AxiosError } from "axios";
import { toast, ToastOptions } from "react-toastify";
import TokenInvalid from "@/components/common/TokenInvalied";
import UserBlocked from "@/components/common/UserBlocked";

export interface ApiError {
  message: string;
}

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const handleError = (
  error: AxiosError<ApiError>,
  rejectWithValue: (value: string | unknown) => string | unknown
) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    if (error.response.status === 401) {
      const message = "You are not authorized. Please log in.";
      toast(<TokenInvalid handleClose={toast} />, { duration: Infinity } as ToastOptions<any>);
      return rejectWithValue(message);
    } else {
      if (error.response.data.message === "User is blocked!") {
        const message = 'User is blocked by the admin.';
        toast(<UserBlocked handleClose={toast} />, { duration: Infinity } as ToastOptions<any>);
        return rejectWithValue(message);
      } else {
        if (error.response && error.response.data.message) {
          console.log(error.response.data.message);
          return rejectWithValue(error.response.data.message);    
        }  
      }
    }
  } else if (error.response && error.response.data.message) {
    console.log(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};
