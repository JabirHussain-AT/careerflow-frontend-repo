import { createSlice } from "@reduxjs/toolkit";
import { changeStatusOfJobApplication } from '@/redux/actions/companyActions'

const jobApplicantSlice = createSlice({

 name: "jobApplicantProfile",
 initialState: {
  error: null as string | null,
  loading: false as boolean,
  Job: null as any | null,
 },
 reducers: {},

 extraReducers(builder) {
  builder
   .addCase(changeStatusOfJobApplication.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(changeStatusOfJobApplication.fulfilled, (state, action) => {
    state.loading = false;
    state.Job = action.payload.data
    state.error = null;
   })
   .addCase(changeStatusOfJobApplication.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
   });
 },
});



export default jobApplicantSlice.reducer;