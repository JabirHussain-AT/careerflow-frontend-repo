import { createSlice } from "@reduxjs/toolkit";
import {
  userSignUp,
  userLogin,
  isUserExist,
  submitBasicDetials,
  fetchUser,
  submitUserProfilePic,
  submitViewProfileUpdations,
  
} from "../../actions/userActions";
import { IUserLoginData } from "../../../interface/IUserLogin";
import { persistReducer } from "redux-persist";
import { persistConfig } from "../../../config/constants";
import {
  companyForm,
  companyLogin,
  companySignUp,
  updatingJob,
  addingJob,
} from "../../actions/companyActions";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null as IUserLoginData | null,
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {
    makeErrorDisable: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // user Exist
      .addCase(isUserExist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isUserExist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(isUserExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // company cases

      .addCase(companySignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companySignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(companySignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(companyLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(companyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(companyForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyForm.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.company as any;
        state.error = null;
      })
      .addCase(companyForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatingJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatingJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatingJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addingJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addingJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addingJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitBasicDetials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBasicDetials.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserLoginData;
        state.error = null;
      })
      .addCase(submitBasicDetials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserLoginData;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // .addCase(submitUserExperiance.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(submitUserExperiance.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.data as IUserLoginData
      //   state.error = null;
      // })
      // .addCase(submitUserExperiance.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      .addCase(submitViewProfileUpdations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitViewProfileUpdations.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserLoginData;
        state.error = null;
      })
      .addCase(submitViewProfileUpdations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitUserProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitUserProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserLoginData;
        state.error = null;
      })
      .addCase(submitUserProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // .addCase(submitUserEducations.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(submitUserEducations.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload.data as IUserLoginData
    //   state.error = null;
    // })
    // .addCase(submitUserEducations.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(submitUserSkills.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(submitUserSkills.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload.data as IUserLoginData
    //   state.error = null;
    // })
    // .addCase(submitUserSkills.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(submitUserAboutMe.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(submitUserAboutMe.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload.data as IUserLoginData
    //   state.error = null;
    // })
    // .addCase(submitUserAboutMe.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { makeErrorDisable, logout } = userSlice.actions;
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedUserReducer;
