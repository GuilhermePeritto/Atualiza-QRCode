import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CompanyAccessFormProps {
  code: string;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CompanyAccessForm = ({
  code,
  isLoading,
  onCodeChange,
  onSubmit,
}: CompanyAccessFormProps) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="relative">
          <Input
            id="code"
            type="text"
            placeholder="Insira o código de acesso aqui"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="pl-12 h-12 text-base"
            required
          />
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        </div>
        
        <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mt-2 w-full text-center text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Não possuo código de acesso!
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Como obter o código de acesso?</DialogTitle>
              <DialogDescription className="space-y-3 pt-2">
                <p>
                  O código de acesso é gerado pelo administrador do sistema através do painel administrativo.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Para gerar um código:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Acesse o painel administrativo</li>
                    <li>Vá em "Empresas"</li>
                    <li>Selecione sua empresa</li>
                    <li>Clique em "Gerar Código de Acesso"</li>
                  </ol>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Em breve adicionaremos um GIF demonstrativo aqui.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="w-full h-12 text-base font-semibold"
        disabled={!code.trim() || isLoading}
      >
        {isLoading ? "ACESSANDO..." : "ACESSAR"}
      </Button>
    </form>
  );
};

