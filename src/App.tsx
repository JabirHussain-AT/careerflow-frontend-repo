import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IUserSelector } from "./interface/IUserSlice";
import { useEffect, ReactNode, useState } from "react";
import { makeErrorDisable } from "./redux/reducers/user/userSlice";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import CompanySignup from "./pages/company/Signup/CompanySignup";
import Home from "./pages/user/Home";
import CompanyForm from "./pages/company/Home/CompanyForm";
import CompanyDashBoard from "./pages/company/Home/CompanyDashboard";
import AdminDashboard from "./pages/admin/AdminDashborad";
import AdminApproval from "./pages/admin/AdminApprovel";
import Sidebar from "./components/admin/Sidebar";
import CompanySidebar from "./components/company/Sidebar/CompanySidebar";
import CompanyJobs from "./pages/company/Home/CompanyJobs";
// import CompanyJobsForm from "./pages/company/Home/CompanyJobs";
import ShowJobs from "./pages/user/ShowJobs";
import AddJobs from "./pages/company/Home/AddJobs";
import { EditJobs } from "./pages/company/Home/EditJobs";
import Profile from "./pages/user/Profile/Profile";
import AdminUsers from "./pages/admin/AdminUsers";
import JobDetialPage from "./pages/user/JobDetialPage";
import AdminCategories from "./pages/admin/AdminCategories";
import ViewProfile from "./pages/user/Profile/ViewProfile";
import UserDashboard from "./pages/user/Profile/UserDashboard";
import BrowseJob from "./pages/user/BrowseJob";
import MyApplications from "./pages/user/Profile/MyApplications";
import ViewJobApplicants from "./pages/company/Job/ViewJobApplicants";
import ViewJobApplicantProfile from "./pages/company/Job/ViewJobApplicantProfile";
import ApplicantDetialProfile from "./components/company/Jobs/ApplicantDetialProfile";
import ApplicantDetialsResume from "./components/company/Jobs/ApplicantDetialsResume";
import ApplicantDetialsHiring from "./components/company/Jobs/ApplicantDetialsHiring";
import ApplicantDetialsInteriewSchedule from "./components/company/Jobs/ApplicantDetialsInteriewSchedule";
import MessageHome from "./pages/company/Messages/MessageHome";
import Messages from "./pages/user/Messages";
import { useSocket } from "@/contexts/socketContext";
import MyInterviews from "./pages/user/Profile/MyInteviews";
import MySavedJobs from "./pages/user/Profile/MySavedJobs";
import InterviewMeet from "./components/company/Rooms/InterviewMeet";
import UserMeetConsole from "./pages/user/UserMeetConsole";
import CompanySchedules from "./pages/company/Schedules/CompanySchedules";

interface ProtectedRouteProps {
  element: ReactNode;
}

function App() {
  const { user, error } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket && user) {
      socket.emit("join-user-room", user?._id);
    }
  }, [socket, user?._id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
  }, [error, dispatch]);

  const userProtectedRoute = ({
    element,
  }: ProtectedRouteProps): JSX.Element => {
    return user?.role === "user" ? <>{element}</> : <Navigate to="/login" />;
  };

  const companyProtectedRoute = ({
    element,
  }: ProtectedRouteProps): JSX.Element => {
    return user?.role === "company" ? <>{element}</> : <Navigate to="/login" />;
  };

  const adminProtectedRoute = ({
    element,
  }: ProtectedRouteProps): JSX.Element => {
    return user?.role === "admin" ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {user !== null && user.role ? (
          // Common Routes
          <>
            <Route
              path="/"
              element={
                <>
                  {user?.role === "company" ? (
                    <Navigate to={"/company/updateForm"} />
                  ) : user?.role === "admin" ? (
                    <Navigate to={"/admin/dashboard"} />
                  ) : (
                    <Home />
                  )}
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  {user?.role === "company" ? (
                    <Navigate to={"/company/dashboard"} />
                  ) : user?.role === "admin" ? (
                    <Navigate to={"/admin/dashboard"} />
                  ) : (
                    <Navigate to={"/"} />
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user?.role === "company" ? (
                    <Navigate to={"/company/updateForm"} />
                  ) : user?.role === "admin" ? (
                    <Navigate to={"/admin/dashboard"} />
                  ) : (
                    <Navigate to={"/"} />
                  )}{" "}
                </>
              }
            />
            <Route
              path="/company/signup"
              element={
                <>
                  {user?.role === "company" ? (
                    <Navigate to={"/company/dashboard"} />
                  ) : (
                    <CompanySignup />
                  )}
                </>
              }
            />
            <Route
              path="/company/updateForm"
              element={
                <>
                  {user?.role === "company" ? (
                    <CompanyForm />
                  ) : (
                    <Navigate to={"/company/dashboard"} />
                  )}{" "}
                </>
              }
            />

            {/* Company Routes */}

            <Route
              path="/company/signup"
              element={
                <>{companyProtectedRoute({ element: <CompanySignup /> })}</>
              }
            />

            <Route
              path="company"
              element={
                <>{companyProtectedRoute({ element: <CompanySidebar /> })}</>
              }
            >
              <Route
                path="dashboard"
                element={
                  <>
                    {companyProtectedRoute({ element: <CompanyDashBoard /> })}
                  </>
                }
              />
              <Route
                path="add-jobs"
                element={<>{companyProtectedRoute({ element: <AddJobs /> })}</>}
              />
              <Route
                path="messages"
                element={
                  <>{companyProtectedRoute({ element: <MessageHome /> })}</>
                }
              />
              <Route
                path="jobs"
                element={
                  <>{companyProtectedRoute({ element: <CompanyJobs /> })}</>
                }
              />
              <Route
                path="schedules"
                element={
                  <>{companyProtectedRoute({ element: < CompanySchedules /> })}</>
                }
              />
              <Route
                path="interview-meet/:roomId/:jobId/:applicantId"
                element={
                  <>{companyProtectedRoute({ element: <InterviewMeet /> })}</>
                }
              />
              <Route
                path="edit-job/:jobId"
                element={
                  <>{companyProtectedRoute({ element: <EditJobs /> })}</>
                }
              />
              <Route
                path="job/viewApplicants/:jobId"
                element={
                  <>
                    {companyProtectedRoute({ element: <ViewJobApplicants /> })}
                  </>
                }
              />
              <Route
                path="jobApplicant/viewProfile/:jobId/:applicantId"
                element={
                  <>
                    {companyProtectedRoute({
                      element: <ViewJobApplicantProfile />,
                    })}
                  </>
                }
              >
                <Route path="profile" element={<ApplicantDetialProfile />} />
                <Route path="resume" element={<ApplicantDetialsResume />} />
                <Route
                  path="hiring-stage"
                  element={<ApplicantDetialsHiring />}
                />
                <Route
                  path="interview-schedule"
                  element={<ApplicantDetialsInteriewSchedule />}
                />
              </Route>
            </Route>

            {/* User Routes */}
            <Route
              path="/"
              element={<>{userProtectedRoute({ element: <Home /> })}</>}
            />
            <Route
              path="/showJobs"
              element={<>{userProtectedRoute({ element: <BrowseJob /> })}</>}
            />
            <Route
              path="/messages"
              element={<>{userProtectedRoute({ element: <Messages /> })}</>}
            />
            <Route
              path="/interview-meet/:roomId"
              element={
                <>{userProtectedRoute({ element: <UserMeetConsole /> })}</>
              }
            />
            {/* <Route path='/showJobs' element={<>{userProtectedRoute({ element: < ShowJobs /> })}</>} /> */}
            <Route
              path="/job/:id"
              element={
                <>{userProtectedRoute({ element: <JobDetialPage /> })}</>
              }
            />
            <Route
              path="profile"
              element={<>{userProtectedRoute({ element: <Profile /> })}</>}
            >
              <Route
                path="view"
                element={
                  <>{userProtectedRoute({ element: <ViewProfile /> })}</>
                }
              />
              <Route
                path="dashboard"
                element={
                  <>{userProtectedRoute({ element: <UserDashboard /> })}</>
                }
              />
              <Route
                path="my-applications"
                element={
                  <>{userProtectedRoute({ element: <MyApplications /> })}</>
                }
              />
              <Route
                path="my-interviews"
                element={
                  <>{userProtectedRoute({ element: <MyInterviews /> })}</>
                }
              />
              <Route
                path="saved-jobs"
                element={
                  <>{userProtectedRoute({ element: <MySavedJobs /> })}</>
                }
              />
            </Route>
            <Route
              path="/signup"
              element={<>{userProtectedRoute({ element: <Signup /> })}</>}
            />
            <Route
              path="/login"
              element={<>{userProtectedRoute({ element: <Login /> })}</>}
            />

            {/* Admin Routes */}
            <Route
              path="admin"
              element={<>{adminProtectedRoute({ element: <Sidebar /> })}</>}
            >
              <Route
                path="dashboard"
                element={
                  <>{adminProtectedRoute({ element: <AdminDashboard /> })}</>
                }
              />
              <Route
                path="company-approval"
                element={
                  <>{adminProtectedRoute({ element: <AdminApproval /> })}</>
                }
              />
              <Route
                path="users"
                element={
                  <>{adminProtectedRoute({ element: <AdminUsers /> })}</>
                }
              />
              <Route
                path="categories"
                element={
                  <>{adminProtectedRoute({ element: <AdminCategories /> })}</>
                }
              />
            </Route>

            {/* <Route path='/admin/dashboard' element={<>{adminProtectedRoute({ element: < AdminDashboard /> })}</>} />
            <Route path='/admin/company-approvel' element={<>{adminProtectedRoute({ element: <  AdminApproval /> })}</>} />
            <Route path='/login' element={<>{adminProtectedRoute({ element: <Login /> })}</>} /> */}
          </>
        ) : (
          // Redirect to Login when user is null
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/company/signup" element={<CompanySignup />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
