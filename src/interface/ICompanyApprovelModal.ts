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
export interface MoreInfoModalPropsForUsers {
  isOpen: boolean;
  closeModal: () => void;
  user: {
    _id: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    phone?: string | null;
    profilePic?: string | null;
    status?: string;
    skills?: string[] | null;
    socialLinks?: {
      link?: string | null;
      socialMedia?: string | null;
    }[];
    dob?: string | null;
    about?: string | null;
    languages?: string[] | null;
    education?:
      | [
          {
            degree: string;
            institution: string;
            year: string | number;
          }
        ]
      | null;
    experiance:
      | [
          {
            position: string;
            company: string;
            duration: string;
          }
        ]
      | null;
    stage: string;
    approved: boolean;
    profileVerification: boolean;
    savedJobs: string[];
  } | null;
}
export interface IApproveCompanyAccount {
  email?: string;
  companyId: string;
  status: boolean;
  reason?: string;
}

export interface ICategory {
  category: string;
  logo?: string;
}
