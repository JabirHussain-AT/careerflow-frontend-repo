import React , { useEffect } from 'react' 
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import NavBar from '@/components/user/Home/NavBar'
import { useSelector } from 'react-redux'
import { IUserSelector } from '@/interface/IUserSlice'

const UserMeetConsole : React.FC = () => {
    
    useEffect(()=>{
        window.location.reload()
       }) 
    
    const { user } = useSelector((state: IUserSelector) => state.user);
    const { roomId } = useParams()
    const navigate = useNavigate()
    const meeting = async ( element : any ) => {
        const appID = 1916087609 ;
        const serverSecret = "9452af6a726e6150cd728db8129dc18d" ;
        const kitToken  = ZegoUIKitPrebuilt.generateKitTokenForTest(appID , serverSecret , roomId! , Date.now().toString(),`${user?.userName!}`)
        const zc = ZegoUIKitPrebuilt.create( kitToken )
        zc.joinRoom({
            container : element ,
            onReturnToHomeScreenClicked :  () => {
                navigate('/profile/my-interviews')
                },
            showLeaveRoomConfirmDialog : true ,
            scenario : {
                mode : ZegoUIKitPrebuilt.GroupCall ,
          }}
        )
    }
        return <>
        < NavBar />
        <div className='bg-green-100 flex justify-center h-screen rounded-lg p-5 '>
            <div className='w-10/12 h-5/6' ref={meeting} />
        </div>
        </>

}

export default UserMeetConsole ;