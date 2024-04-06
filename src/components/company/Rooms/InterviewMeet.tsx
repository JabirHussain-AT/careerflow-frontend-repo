import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { removeSchedule } from "@/redux/actions/companyActions";
import { useNavigate } from "react-router-dom";

const InterviewMeet: React.FC = () => {
  const { roomId, jobId, applicantId } = useParams();
  const navigate = useNavigate();
  const meetingRef = useRef<any>(null); // Ref to hold the Zego instance

  useEffect(() => {
    const startMeeting = async (element: any) => {
      const appID = 1916087609;
      const serverSecret = "9452af6a726e6150cd728db8129dc18d";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId!,
        Date.now().toString(),
        "CareerFlow"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://web.careerflow.shop/company/interview-meet/${roomId}`,
            // url: `http://localhost:5173/company/interview-meet/${roomId}`,
          },
        ],
        showRemoveUserButton: true,
        showRoomTimer: true,
        onReturnToHomeScreenClicked: async () => {
          const response = await removeSchedule({
            jobId: jobId!,
            applicantId: applicantId!,
          });

          if (response?.success === true) {
            navigate(
              `/company/jobApplicant/viewProfile/${jobId}/${applicantId}/profile`
            );
          }
        },
        showInviteToCohostButton: true,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });

      // Store the Zego instance in the ref
      meetingRef.current = zc;
    };

    // Call the startMeeting function
    startMeeting(meetingRef.current);

    // Cleanup function
    return () => {
      if (meetingRef.current) {
        meetingRef.current.destroy(); // Destroy the Zego instance
        meetingRef.current = null; // Clear the ref
      }
    };
  }, [roomId, jobId, applicantId, navigate]);

  return (
    <div className="p-5 bg-gray-100 w-full h-screen">
      <div className="w-10/12 h-5/6" ref={meetingRef} />
    </div>
  );
};

export default InterviewMeet;
