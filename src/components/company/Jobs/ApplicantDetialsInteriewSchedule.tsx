import { useState, useEffect } from "react";
// import LOGO from "../../../assets/googleIcon.png";
import { format, parseISO } from "date-fns";
import Modal from "../../common/ModalBox";
import { useParams } from "react-router-dom";
import {
  scheduleInterview,
  fetchInterViewSchedule,
  removeSchedule,
} from "@/redux/actions/companyActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import AlertBox from "@/components/common/AlertBox";

const ApplicantInterviewSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewTime: "",
    testType: "",
    interviewName: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [scheduledInterviews, setScheduledInterviews] = useState<any>({});
  const { jobId, applicantId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchInterViewSchedule(jobId!, applicantId!);
        // console.log("🚀 ~ file: ApplicantDetialsInteriewSchedule.tsx:30 ~ fetchData ~ response:", response?.data[0]?.applicants.schedule)
        setScheduledInterviews(response?.data[0]?.applicants?.schedule);
      } catch (error) {
        console.error("Error fetching interview schedule:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [dispatch, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelSchedule = async () => {
    setLoading(true);
    await removeSchedule({
      jobId: jobId!,
      applicantId: applicantId!,
    });
    setLoading(false);
  };

  const handleScheduleInterview = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    // Form validation
    const errors: { [key: string]: string } = {};
    if (!formData.testType) {
      errors.testType = "Test Type is required";
    }
    if (!formData.interviewName) {
      errors.interviewName = "Interview Name is required";
    }
    if (!formData.interviewDate || !formData.interviewTime) {
      errors.interviewDateTime = "Interview Date and Time are required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let obj = {
      jobId: jobId,
      applicantId: applicantId,
      date: formData.interviewDate,
      time: formData.interviewTime,
      InterviewType: formData.testType,
      InterviewName: formData.interviewName,
    };

     await dispatch(scheduleInterview(obj));

    setIsModalOpen(false);
    // Reset form data
    setFormData({
      interviewDate: "",
      interviewTime: "",
      testType: "",
      interviewName: "",
    });
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h1 className="text-gray-800 ms-3 text-sm font-semibold">
            Interview List
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setIsModalOpen(true)}
            className="font-semibold hover:cursor-pointer text-sm text-lightgreen"
          >
            {scheduledInterviews
              ? "+ Edit Scheduled Interview"
              : "+ Add Schedule Interview"}
          </h1>
        </div>
      </div>
      {/* Scheduled Interviews */}
      {scheduledInterviews && (
        <div className="border mt-5 flex justify-between flex-wrap">
          <div className="ms-3 mt-4 flex gap-x-3">
            {/* <img src={LOGO} alt="" className='w-12 h-12 rounded-full border' /> */}
            <div className="mt-2">
              <div className="flex justify-between w-full">
                <div>
                  <h1 className="text-sm text-black font-semibold">
                    {scheduledInterviews?.InterviewType}
                    {scheduledInterviews?.InterviewName}
                  </h1>
                  <h1 className="text-xs text-gray-600">
                    {scheduledInterviews?.date
                      ? format(
                          parseISO(scheduledInterviews?.date),
                          "yyyy-MM-dd"
                        )
                      : ""}{" "}
                    - {scheduledInterviews?.time}
                  </h1>

                  <div>
                    <AlertBox
                      button={
                        <button className="text-xs text-red-500 bg-red-100 px-2 rounded-md mt-7 mb-2 hover:bg-red-300 hover:text-red-700 ">
                          Cancel Interview
                        </button>
                      }
                      ques={"Are you sure to Cancel this Interveiw ?"}
                      onConfirm={() => handleCancelSchedule()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for scheduling interview */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <form onSubmit={handleScheduleInterview}>
            <div className="mb-4">
              <label
                htmlFor="testType"
                className="text-gray-600 text-sm font-semibold"
              >
                Test Type
              </label>
              <input
                required
                type="text"
                id="testType"
                name="testType"
                className={`border rounded-md py-2 px-3 mt-2 w-full outline-none ${
                  errors.testType && "border-red-500"
                }`}
                placeholder="Enter Test Type"
                value={formData.testType}
                onChange={handleInputChange}
              />
              {errors.testType && (
                <p className="text-red-500 text-xs mt-1">{errors.testType}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="interviewName"
                className="text-gray-600 text-sm font-semibold"
              >
                Interview Name
              </label>
              <input
                required
                type="text"
                id="interviewName"
                name="interviewName"
                className={`border rounded-md py-2 px-3 mt-2 w-full outline-none ${
                  errors.interviewName && "border-red-500"
                }`}
                placeholder="Enter Interview Name with Employee Name "
                value={formData.interviewName}
                onChange={handleInputChange}
              />
              {errors.interviewName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.interviewName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="interviewDate"
                className="text-gray-600 text-sm font-semibold"
              >
                Select Date
              </label>
              <input
                required
                type="date"
                id="interviewDate"
                name="interviewDate"
                className={`border rounded-md py-2 px-3 mt-2 w-full outline-none ${
                  errors.interviewDateTime && "border-red-500"
                }`}
                value={formData.interviewDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.interviewDateTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.interviewDateTime}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="interviewTime"
                className="text-gray-600 text-sm font-semibold"
              >
                Select Time
              </label>
              <input
                required
                type="time"
                id="interviewTime"
                name="interviewTime"
                className={`border rounded-md py-2 px-3 mt-2 w-full outline-none ${
                  errors.interviewDateTime && "border-red-500"
                }`}
                value={formData.interviewTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-lightgreen text-white hover:bg-blue-600 hover:scale-110 bg-blue-400 font-semibold text-center px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Loading..." : "Schedule"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantInterviewSchedule;
