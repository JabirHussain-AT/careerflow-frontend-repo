export interface IJob{
        map(arg0: (job: IJob) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    
        jobType: string | null | undefined;
        category?: string | null | undefined;
        applicants ?: any;
        logo ?: string ;
        jobTitle: string | null;
        createdAt?: string | undefined ;
        jobDescription: string | null;
        companyId : {
                userName : string ,
                logo : string ,
                address ?: string ,
                email?:string
        }
        requirements?: any[];
        skills?: string[];
        fromSalary?: string | null | undefined;
        toSalary?: string | null | undefined;
        status : boolean
        jobExpiry?: any | undefined;
        vacancy: string | number | null;
        noOfApplications?: number | null;
        countdown?: string | number
        _id?: string;
}