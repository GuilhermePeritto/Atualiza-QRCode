import { ArrowLeft, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManualInputContentProps {
  code: string;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ManualInputContent = ({
  code,
  isLoading,
  onCodeChange,
  onSubmit,
  onBack,
}: ManualInputContentProps) => {
  const header = (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="hover:bg-muted h-8 w-8 sm:h-9 sm:w-9"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
      </Button>
      <div className="min-w-0 flex-1 text-left">
        <h1 className="text-base sm:text-lg font-bold text-primary">Digitar Código</h1>
        <p className="text-xs text-muted-foreground">
          Insira o código do patrimônio
        </p>
      </div>
    </div>
  );

  const content = (
    <div className="bg-muted/50 rounded-xl p-3 sm:p-4 flex items-center justify-center w-full h-full">
      <div className="w-full text-center">
        <Keyboard size={40} className="text-muted-foreground mx-auto mb-2 sm:mb-3 sm:w-12 sm:h-12" />
        <Input
          type="text"
          placeholder="Digite o código (Ex: 12345)"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          disabled={isLoading}
          className="h-10 sm:h-11 text-sm sm:text-base text-center"
          autoFocus
        />
      </div>
    </div>
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const actions = (
    <form onSubmit={handleFormSubmit} className="w-full">
      <Button
        type="submit"
        variant="secondary"
        className="w-full h-9 sm:h-10 text-sm"
        disabled={!code.trim() || isLoading}
      >
        <Keyboard className="mr-2" size={18} />
        Buscar Patrimônio
      </Button>
    </form>
  );

  return { header, content, actions };
};

