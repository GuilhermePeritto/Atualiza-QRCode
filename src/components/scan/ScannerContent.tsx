import { QrCode, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeScanner } from "./QRCodeScanner";

interface ScannerContentProps {
  isScanning: boolean;
  isLoading: boolean;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onShowManualInput: () => void;
  onScanSuccess: (code: string) => void;
}

export const ScannerContent = ({
  isScanning,
  isLoading,
  onStartScanning,
  onStopScanning,
  onShowManualInput,
  onScanSuccess,
}: ScannerContentProps) => {
  const header = (
    <>
      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 mb-1 sm:mb-2">
        <QrCode size={20} className="text-primary sm:w-6 sm:h-6" />
      </div>
      <h1 className="text-lg sm:text-xl font-bold text-primary mb-0.5 sm:mb-1">Leitura de QR Code</h1>
      <p className="text-xs text-muted-foreground">
        Posicione o QR Code do patrimônio em frente à câmera
      </p>
    </>
  );

  const content = isLoading ? (
    <div className="bg-muted/50 w-full h-full flex items-center justify-center rounded-xl max-h-full">
      <div className="text-center p-2 sm:p-4">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-primary mx-auto mb-1.5 sm:mb-2"></div>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Processando...
        </p>
      </div>
    </div>
  ) : isScanning ? (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm aspect-square max-h-full">
        <QRCodeScanner onSuccess={onScanSuccess} />
      </div>
    </div>
  ) : (
    <div className="bg-muted/50 w-full h-full flex items-center justify-center rounded-xl max-h-full">
      <div className="text-center p-2 sm:p-4">
        <QrCode size={40} className="text-muted-foreground mx-auto mb-1.5 sm:mb-2 sm:w-12 sm:h-12" />
        <p className="text-xs text-muted-foreground">
          Clique no botão abaixo para iniciar a leitura
        </p>
      </div>
    </div>
  );

  const actions = !isScanning ? (
    <>
      <Button
        onClick={onStartScanning}
        className="w-full h-9 sm:h-10 text-sm"
        disabled={isLoading}
      >
        <QrCode className="mr-2" size={18} />
        Iniciar Leitura
      </Button>
      <Button
        onClick={onShowManualInput}
        variant="secondary"
        className="w-full h-9 sm:h-10 text-sm"
        disabled={isLoading}
      >
        <Keyboard className="mr-2" size={18} />
        Digitar Patrimônio
      </Button>
    </>
  ) : (
    <Button
      onClick={onStopScanning}
      variant="secondary"
      className="w-full h-9 sm:h-10 text-sm"
      disabled={isLoading}
    >
      Parar Leitura
    </Button>
  );

  return { header, content, actions };
};

