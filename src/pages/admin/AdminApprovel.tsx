import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaCheck, FaTimes } from "react-icons/fa";
import {
  approveCompanyAccount,
  fetchCompanies,
} from "../../redux/actions/adminActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import MoreInfoModal from "@/components/admin/companyApprovel.tsx/MoreInfoModal";
import AlertBox from "@/components/common/AlertBox";

const AdminApprovel = () => {
  const [companies, setCompanies] = useState([{}]);
  const [filter, setFilter] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    fetchCompanies()
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((err) => {
        console.error(err, "error from fetching companies");
      });
  }, []);

  const makeChange = (id: string, status: string) => {
    setCompanies((prev) => {
      return prev.map((company: any) => {
        if (company._id === id) {
          return { ...company, status: status };
        }
        return company;
      });
    });
  };

  const handleApprove = async (companyId: string) => {
    console.log(`Approve company with ID ${companyId}`);
    const res = await dispatch(
      approveCompanyAccount({
        status: true,
        companyId: companyId,
      })
    );
    if (res?.payload?.data) {
      console.log("its on changing process 1");
      makeChange(res.payload.data._id, res.payload.data.status);
    }
  };

  const handleReject = async (companyId: string , reason?:string) => {
    console.log(`Reject company with ID ${companyId}`);
    const res = await dispatch(
      approveCompanyAccount({
        status: false,
        companyId: companyId,
        reason : reason
      })
    );
    if (res?.payload?.data) {
      console.log("its on changing process 2", res.payload.data);
      makeChange(res.payload.data._id, res.payload.data.status);
    }
  };

  const handleMoreInfoClick = (company: any) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const filteredCompanies: any = companies.filter((company: any) => {
    if (filter === "all") {
      return true;
    } else {
      return company.status === filter;
    }
  });
  

  return (
    <div className="container mx-auto mt-8 p-8">
      {/* Filter Section */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Filter:</label>
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <MoreInfoModal
        isOpen={modalVisible}
        closeModal={() => setModalVisible(false)}
        company={selectedCompany}
      />
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-green-500 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Sr.No</th>
              <th className="py-2 px-4">Company Name</th>
              <th className="py-2 px-4">Website Link</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">More</th>
              <th className="py-2 px-4 w-auto">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredCompanies.map((company: any, index: any) => (
              <tr key={company.id} className="bg-white border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-5">{company.userName}</td>
                <td className="py-2 px-4">
                  <a
                    href={company.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {company.websiteLink}
                  </a>
                </td>
                <td className="py-2 px-2">{company.status}</td>
                <td className="py-2 flex justify-center mt-2 text-gray-600 cursor-pointer">
                  <FaArrowAltCircleRight
                    onClick={() => handleMoreInfoClick(company)}
                  />
                </td>
                <td className="text-black">
                  <div className="flex justify-center mt-1">
                    {company.status === "approved" && (
                      <FaCheck className="text-green-500 cursor-not-allowed mx-2" />
                    )}
                    {company.status === "rejected" && (
                      <FaTimes className="text-red-500 cursor-not-allowed mx-2" />
                    )}
                    {company.status === "pending" && (
                      <div className="flex justify-center">
                        <AlertBox
                          button={
                            <FaCheck
                              values="approved"
                              className="text-green-500 cursor-pointer mx-2"
                            />
                          }
                          ques={"Are you sure ?"}
                          onConfirm={() => handleApprove(company._id)}
                        />
                        <AlertBox
                          button={
                            <FaTimes
                              values="rejected"
                              className="text-red-500 cursor-pointer mx-2"
                            />
                          }
                          ques={"Are you sure ?"}
                          onConfirm={(reason) => handleReject(company._id, reason)}
                          option={true}
                          placeholder={'Reason for the rejection'}
                        />
                      </div>
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

export default AdminApprovel;
