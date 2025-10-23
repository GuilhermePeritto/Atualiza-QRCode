import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { validateCompanyAccess } from "@/services/companyService";
import { toast } from "sonner";

export const useCompanyAccess = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccessCompany = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error("Por favor, insira um código de acesso");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await validateCompanyAccess(code.trim());
      
      if (result.valid && result.company) {
        localStorage.setItem("selectedCompany", JSON.stringify(result.company));
        navigate("/scan");
      } else {
        toast.error("Código de acesso inválido");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Erro ao validar código de acesso");
      console.error(error);
      setIsLoading(false);
    }
  }, [code, navigate]);

  return {
    code,
    isLoading,
    setCode,
    handleAccessCompany,
  };
};

