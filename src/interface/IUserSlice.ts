export interface UserState {
    user: UserData;
    loading: boolean;
    error: null | string;
  }

 export interface UserData {
    _id: any;
    userName: string;
    email: string;
    approved ?: boolean | null
    stage ?: string | null
    role?: string | null 
    status ?: string | null
    phoneNumber ?: string
    socialMediaLinks : any
    preferredJobs ?: string[]
    position : string 
    profilePic ?: string | null
    location : string  
    updatedAt ?: any 
    dob  ?:any 
    resume ?: string 
    education ?: string [] | any
    experiance ?: any
    skills ?: string | any
    about ?: string 
  }

export interface IUserSelector {
  user:UserState,
  loading: boolean,
  error: null | string
}

