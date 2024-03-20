export interface SignUpFormValues {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    otp?: number;
  }

export interface OtpPageProps {
    userData: SignUpFormValues;
  }

export  interface UserValues {
    userName: string;
    email: string;
    profilePic?: string;
  }

export interface userDataByGoogle {
    email : string,
    password : string
    googleAuth : boolean ;

}

 export interface CustomJwtPayload {
  name: string;
  email: string;
  picture?: string;
 }

 export interface SaveChatMessagesPayload {
  content : string , 
  senderId : string ,
  recieverId : string ,
  latestMessage :string ;
}
