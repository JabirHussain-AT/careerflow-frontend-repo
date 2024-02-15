export interface UserState {
    user: UserData;
    loading: boolean;
    error: null | string;
  }

 export interface UserData {
    _id: any;
    username: string;
    email: string;
    approved ?: boolean | null
    stage ?: string | null
    role?: string | null 
    status ?: string | null
  }

export interface IUserSelector {
  user:UserState,
  loading: boolean,
  error: null | string
}

