import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Company {
  id: string;
  name: string;
}

export const useSelectedCompany = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const company = localStorage.getItem("selectedCompany");
    if (!company) {
      navigate("/");
      return;
    }
    setSelectedCompany(JSON.parse(company));
  }, [navigate]);

  return selectedCompany;
};

