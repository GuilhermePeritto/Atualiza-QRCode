import { Card } from "@/components/ui/card";
import { CompanyAccessForm } from "@/components/company/CompanyAccessForm";
import { useCompanyAccess } from "@/hooks/useCompanyAccess";

const SelectCompany = () => {
  const { code, isLoading, setCode, handleAccessCompany } = useCompanyAccess();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-primary to-primary/90">
      <Card className="w-full max-w-md p-8 shadow-elevated animate-fade-in">
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="Atualiza Sistemas" className="mx-8" />
        </div>

        <CompanyAccessForm
          code={code}
          isLoading={isLoading}
          onCodeChange={setCode}
          onSubmit={handleAccessCompany}
        />
      </Card>
    </div>
  );
};

export default SelectCompany;

