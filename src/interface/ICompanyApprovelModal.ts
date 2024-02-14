 export interface MoreInfoModalProps {
    isOpen: boolean;
    closeModal: () => void;
    company: {
      _id: string;
      email: string;
      role: string;
      userName: string;
      approved: boolean;
      address: string;
      createdAt: string;
      founded: string;
      linkedIn: string;
      logo: string;
      registrationId: string;
      stage: string;
      status: string;
      totalEmployees: number;
      updatedAt: string;
      vision: string;
      websiteLink: string;
      // Add more properties as needed
    } | null;
  }
 export interface IApproveCompanyAccount {
    companyId : string ,
    status : boolean  ,
    reason?: string
   }
   