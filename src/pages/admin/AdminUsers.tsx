import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import AlertBox from "@/components/common/AlertBox";
import { fetchUsers, userBlockStatus } from "../../redux/actions/adminActions";
import { IUserDoc } from "@/interface/IUserDoc";
// import MoreInfoModalUsers from "@/components/admin/compnayUsers/MoreInfoModalUsers";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<IUserDoc[]>([]);
  const [filter, setFilter] = useState("user"); // Set default filter value
  const [_, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers()
      .then((data: { success: string; message: string; data: IUserDoc[] }) => {
        setUsers(data.data);
      })
      .catch((err: unknown) => {
        console.error(err, "error from fetching companies");
      });
  }, []);

  const makeChange = (userId: string, isBlocked: boolean) => {
    // Update users state with new isBlocked value
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isBlocked } : user
      )
    );
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  console.log(handleModalClose);

  const handleBlock = async (userId: string) => {
    // Optimistically update isBlocked to false
    makeChange(userId, true);
    try {
      // Dispatch action to block user
      await dispatch(userBlockStatus(userId));
    } catch (error) {
      // Revert changes if action fails
      makeChange(userId, false);
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async (userId: string | undefined) => {
    // Optimistically update isBlocked to true
    makeChange(userId!, false);
    try {
      // Dispatch action to unblock user
      await dispatch(userBlockStatus(userId!));
    } catch (error) {
      // Revert changes if action fails
      makeChange(userId!, true);
      console.error("Error unblocking user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    // Filter users based on selected role
    if (filter === "user") {
      return user.role === filter;
    } else if (filter === "company") {
      return user.role === filter && user.stage === "completed";
    } else if (filter === "admin") {
      return user.role === filter;
    } else {
      return true;
    }
  });

  return (
    <div className="container mx-auto mt-8 p-8 min-h-screen">
      <div className="mb-4 flex items-center">
        <label className="mr-2">Filter by Role:</label>
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="company">Company</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-green-500 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Sr.No</th>
              <th className="py-2 px-4">User Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">More</th>
              <th className="py-2 px-4 w-auto">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="bg-white border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-5">{user?.userName}</td>
                <td className="py-2 px-4">
                  <a
                    href={`mailto:${user?.email}`}
                    className="text-blue-500 underline"
                  >
                    {user?.email}
                  </a>
                </td>
                <td className="py-2 px-2">{user.role}</td>
                <td className="py-2 flex justify-center mt-2 text-gray-600 cursor-pointer">
                  <FaArrowAltCircleRight onClick={handleModalOpen} />
                </td>
                <td className="text-black">
                  <div className="flex justify-center mt-1">
                    {user.isBlocked === false && (
                      <AlertBox
                        button={
                          <p className="text-red-500 cursor-pointer bg-red-200 px-2 rounded-md mx-2 font-semibold text-sm hover:bg-red-400 hover:text-red-600">
                            Block
                          </p>
                        }
                        ques={"Are you sure you want to block this user?"}
                        onConfirm={() => handleBlock(user._id!)}
                      />
                    )}
                    {user.isBlocked === true && (
                      <AlertBox
                        button={
                          <p className="text-green-500 cursor-pointer bg-green-200 px-2 rounded-md mx-2 font-semibold text-sm hover:bg-green-400 hover:text-green-600">
                            Unblock
                          </p>
                        }
                        ques={"Are you sure you want to unblock this user?"}
                        onConfirm={() => handleUnblock(user._id)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
