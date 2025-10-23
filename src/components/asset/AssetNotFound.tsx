import { PackageX, Search, QrCode, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssetNotFoundProps {
  qrCode?: string;
}

export const AssetNotFound = ({ qrCode }: AssetNotFoundProps) => {
  return (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Ícone principal com animação */}
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/20">
            <PackageX size={48} className="text-destructive animate-bounce" style={{ animationDuration: "2s" }} />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Patrimônio Não Encontrado
          </h2>
          {qrCode && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
              <QrCode size={14} className="text-muted-foreground" />
              <span className="text-sm font-mono font-medium text-muted-foreground">
                {qrCode}
              </span>
            </div>
          )}
        </div>

        {/* Mensagem principal */}
        <p className="text-muted-foreground">
          Não foi possível localizar este patrimônio em nosso sistema. 
          Verifique se o código está correto ou tente novamente.
        </p>

        {/* Alert com sugestões */}
        <Alert className="text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            <p className="font-medium">Possíveis causas:</p>
            <ul className="text-sm space-y-1 list-disc list-inside ml-2">
              <li>O patrimônio ainda não foi cadastrado</li>
              <li>O código QR pode estar danificado ou ilegível</li>
              <li>O patrimônio foi removido do sistema</li>
              <li>Você pode estar em uma empresa diferente</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Dicas visuais */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-muted/50 rounded-lg space-y-1">
            <Search size={20} className="text-primary mx-auto" />
            <p className="text-xs font-medium">Verifique o código</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg space-y-1">
            <QrCode size={20} className="text-primary mx-auto" />
            <p className="text-xs font-medium">Tente outro QR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

