
export interface IUserDoc{
    
    userName ?: string | null | undefined;
    email?: string | null | undefined;
    jobTitle: string | null;
    phone?: string | number | null;
    stage?:string
    socialMediaLinks  ?: {
        link : string ,
        socialMedia : string 
    }
    education ?: [{
            institute : string ,
            from : string  | Date,
            to : string  | Date ,
            course : string ,
    }]
    experiance?:[{
        company ?: string ,
        from : string | Date ,
        to : string | Date ,
        position : string 
    }];
    skills?: string[];
    languages?: string[] | null | undefined;
    about ?: string
    profileVerification?: boolean;
    dob?: string | number | null;
    _id?: string;
    isBlocked ?: boolean | null 
    savedJobs ?: string []
    status ?: string | boolean
    role ?: string
    createdAt ?: any
}
