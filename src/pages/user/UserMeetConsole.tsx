import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import NavBar from '@/components/user/Home/NavBar';
import { useSelector } from 'react-redux';
import { IUserSelector } from '@/interface/IUserSlice';

const UserMeetConsole: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const meeting = async (element: HTMLDivElement | null) => {
      if (!element) return;
      console.log('-----------------------------------------------------------'111111111)
      const appID = 46877336;
      const serverSecret = "4ac3ffa5d4e7f2f54e4bb82b0c876db8";
      // const appID = 1916087609;
      // const serverSecret = "9452af6a726e6150cd728db8129dc18d";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId!,
        Date.now().toString(),
        `${user?.userName!}`
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        onReturnToHomeScreenClicked: () => {
          navigate('/profile/my-interviews');
        },
        showLeaveRoomConfirmDialog: true,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });

      // Return the destroy function to be executed when the component unmounts
      return () => {
        zc.destroy();
      };
    };

    meeting(meetingRef.current);
  }, [roomId, user, navigate]);

  return (
    <>
      <NavBar />
      <div className='bg-green-100 flex justify-center h-screen w-screen rounded-lg p-5 '>
        <div className='w-10/12 h-5/6' ref={meetingRef} />
      </div>
    </>
  );
};

export default UserMeetConsole;
