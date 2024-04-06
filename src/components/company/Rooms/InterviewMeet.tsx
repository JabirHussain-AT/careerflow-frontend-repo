import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { removeSchedule } from "@/redux/actions/companyActions";
import { useNavigate } from "react-router-dom";

const InterviewMeet: React.FC = () => {
  const { roomId, jobId, applicantId } = useParams();
  const navigate = useNavigate();
  const meetingRef = useRef<HTMLDivElement>(null);
  const zcRef = useRef<any>(null); // Define zcRef to hold the zc instance

  useEffect(() => {
    const meeting = async (element: HTMLDivElement | null) => {
      if (!element) return;

      const appID = 1916087609;
      const serverSecret = "9452af6a726e6150cd728db8129dc18d";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId!,
        Date.now().toString(),
        "CareerFlow"
      );
      zcRef.current = ZegoUIKitPrebuilt.create(kitToken); // Assign to zcRef instead of zc
      zcRef.current.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link ",
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
    };

    meeting(meetingRef.current);

    // Cleanup function
    return () => {
      if (zcRef.current) {
        zcRef.current.destroy(); // Call destroy() on zcRef.current if it exists
      }
    };
  }, [roomId, jobId, applicantId, navigate]);

  return (
    <div className="p-5 bg-gray-100 m-10 h-screen">
      <div className="w-10/12 h-5/6" ref={meetingRef} />
    </div>
  );
};

export default InterviewMeet;
