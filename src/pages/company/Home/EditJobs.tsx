import CompanyEditForm from "@/components/company/Jobs/CompanyEditForm";
import React from "react";

export const EditJobs: React.FC = () => {
  const handleSave = () => {};

  const handleClose = () => {};

  return (
    <div className="h-full">
      <CompanyEditForm onSave={handleSave} onClose={handleClose} />
    </div>
  );
};
