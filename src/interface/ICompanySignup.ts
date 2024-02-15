export interface ICompanyForm {
    registrationId: string;
    address: string;
    phoneNumber: string;
    totalEmployees: number | string ;
    vision: string;
    logo: File | any ;
    linkedIn: URL | string ;  
  }
  
export interface IAddingJobs {
   jobTitle : string ;
   jobType : string ;
   category : string ;
   noOfVacancy : number | string ;
   salary : string ;
   requierments : any ;
   skills : any;
   jobExpiry : Date | string ;



  }
  