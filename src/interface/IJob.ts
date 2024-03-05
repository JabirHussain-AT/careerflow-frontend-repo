export interface IJob{
    
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
        }
        requirements?: any[];
        skills?: string[];
        fromSalary?: string | null | undefined;
        toSalary?: string | null | undefined;
        status : boolean
        jobExpiry?: any | undefined;
        vacancy: string | number | null;
        noOfApplications?: number | null;
        _id?: string;
}