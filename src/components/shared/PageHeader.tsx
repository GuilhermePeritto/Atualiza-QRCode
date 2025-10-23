import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onBack?: () => void;
  label: string;
  value: string;
}

export const PageHeader = ({ onBack, label, value }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("selectedCompany");
    navigate("/");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-white flex-shrink-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
      </Button>
      <div className="flex-1 min-w-0">
        <h2 className="text-xs opacity-90">{label}</h2>
        <p className="font-semibold text-sm truncate">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9"
        title="Sair"
      >
        <LogOut size={18} className="sm:w-5 sm:h-5" />
      </Button>
    </div>
  );
};

