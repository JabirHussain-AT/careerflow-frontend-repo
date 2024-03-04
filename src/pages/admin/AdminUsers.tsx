import React, { useState, useEffect } from "react";
import { FaCheck, FaBan, FaArrowAltCircleRight } from "react-icons/fa";
import AlertBox from "@/components/common/AlertBox";
import { fetchUsers } from "../../redux/actions/adminActions";
import { IUserDoc } from "@/interface/IUserDoc";
import MoreInfoModalUsers from "@/components/admin/compnayUsers.tsx/MoreInfoModalUsers";

const AdminUsers = () => {
  const [users, setUsers] = useState<IUserDoc[]>([]);
  const [filter, setFilter] = useState("user");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers()
      .then((data: { success: string; message: string; data: IUserDoc[] }) => {
        setUsers(data.data);
      })
      .catch((err: any) => {
        console.error(err, "error from fetching companies");
      });
  }, []);

  const makeChange = (id: any, status: any) => {
    setUsers((prev) =>
      prev.map((user) => (user._id === id ? { ...user, status } : user))
    );
  };

  // Modal settings

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  //

  const handleBlock = (userId: any) => {
    console.log(`Block user with ID ${userId}`);
    // Add your logic here to block the user
    makeChange(userId, "blocked");
  };

  const handleUnblock = (userId: any) => {
    console.log(`Unblock user with ID ${userId}`);
    // Add your logic here to unblock the user
    makeChange(userId, "active");
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "user") {
      return user.role === filter;
    } else if (filter === "admin") {
      return user.role === filter;
    } else if (filter !== "all") {
      return user.role === "company";
    } else {
      return true;
    }
  });

  return (
    <div className="container mx-auto mt-8 p-8">
      {/* Filter Section */}
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
          {/* Add more roles as needed */}
        </select>
      </div>
      {/* Table Section */}
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

                  <MoreInfoModalUsers clsssName="w-screen"
                    isOpen={isOpen}
                    closeModal={handleModalClose}
                    user={user}
                  />
                <td className="text-black">
                  <div className="flex justify-center mt-1">
                    {user.status === "approved" && (
                      <AlertBox
                        button={
                          <FaBan className="text-red-500 cursor-pointer mx-2" />
                        }
                        ques={"Are you sure you want to block this user?"}
                        onConfirm={() => handleBlock(user._id)}
                      />
                    )}
                    {user.status === "rejected" && (
                      <AlertBox
                        button={
                          <FaCheck className="text-green-500 cursor-pointer mx-2" />
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
