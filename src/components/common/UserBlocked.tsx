import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user/userSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";

const UserBlocked = ({ handleClose }: { handleClose: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOkClick = () => {
    dispatch(logout());
    toast.dismiss(handleClose.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-red-600 text-xl mb-4">Blocked!</h1>
        <p className="mb-4">You are Blocked By the Admin </p>
        <button
          onClick={handleOkClick}
          className="px-4 py-1 border border-red-600 rounded-md text-lightgreen"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default UserBlocked;
