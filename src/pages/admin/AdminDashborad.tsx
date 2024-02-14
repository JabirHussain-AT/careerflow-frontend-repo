import React from "react";
import { logout } from "../../redux/reducers/user/userSlice";
import { useDispatch } from "react-redux";
import Sidebar from "@/components/admin/Sidebar";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("its here in logout");
    dispatch(logout());
  };

  return (
    <>
    <div className=" ">
     
      hiii
    </div>
    </>
  );
};

export default AdminDashboard;
