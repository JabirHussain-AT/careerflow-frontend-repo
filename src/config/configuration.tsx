import { AxiosError } from "axios";
import { toast, ToastOptions } from "react-toastify";
// import { useHistory } from "react-router-dom";
import TokenInvalid from "@/components/common/TokenInvalied";

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
  // const history = useHistory();

  if (error.response && error.response.status === 401) {
    const message = "You are not authorized. Please log in.";
    // toast.error(message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   onClose: () => {
    //     localStorage.removeItem("userDetails");
    //     // history.push('/login');
    //   },
    // } as any); // Use 'as any' to avoid TypeScript error

    toast(
      (t) => <TokenInvalid handleClose={t} />,
      { duration: Infinity } as ToastOptions<any>
    );
    return rejectWithValue(message);
  } else if (error.response && error.response.data.message) {
    console.log(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};
