import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Camera, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface QRCodeScannerProps {
  onSuccess: (code: string) => void;
}

export const QRCodeScanner = ({ onSuccess }: QRCodeScannerProps) => {
  const [permissionStatus, setPermissionStatus] = useState<"prompt" | "granted" | "denied" | "checking">("checking");

  useEffect(() => {
    let html5QrCode: any = null;
    let isMounted = true;

    const checkCameraPermission = async () => {
      try {
        // Verifica se a API de permissões está disponível
        if (navigator.permissions && navigator.permissions.query) {
          try {
            const result = await navigator.permissions.query({ name: "camera" as PermissionName });
            setPermissionStatus(result.state as "prompt" | "granted" | "denied");
            
            // Listener para mudanças na permissão
            result.addEventListener("change", () => {
              setPermissionStatus(result.state as "prompt" | "granted" | "denied");
            });
          } catch (error) {
            // Alguns navegadores não suportam query para câmera
            // Vamos tentar solicitar diretamente
            setPermissionStatus("prompt");
          }
        } else {
          setPermissionStatus("prompt");
        }
      } catch (error) {
        console.error("Error checking permissions:", error);
        setPermissionStatus("prompt");
      }
    };

    const requestCameraAccess = async () => {
      try {
        // Solicita acesso à câmera explicitamente
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        
        // Para o stream imediatamente - só queríamos a permissão
        stream.getTracks().forEach(track => track.stop());
        
        setPermissionStatus("granted");
        return true;
      } catch (error: any) {
        console.error("Camera access denied:", error);
        
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          setPermissionStatus("denied");
          toast.error("Permissão de câmera negada. Por favor, habilite nas configurações do navegador.");
        } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
          toast.error("Nenhuma câmera encontrada no dispositivo.");
        } else {
          toast.error("Erro ao acessar a câmera: " + error.message);
        }
        
        return false;
      }
    };

    const initScanner = async () => {
      try {
        // Primeiro verifica as permissões
        await checkCameraPermission();
        
        // Se precisar, solicita acesso
        const hasPermission = await requestCameraAccess();
        
        if (!hasPermission || !isMounted) {
          return;
        }

        const { Html5Qrcode } = await import("html5-qrcode");
        
        if (!isMounted) return;

        html5QrCode = new Html5Qrcode("qr-reader");
        
        // Ajusta o tamanho do qrbox baseado na largura da tela
        const isMobile = window.innerWidth < 640; // sm breakpoint do Tailwind
        const qrboxSize = isMobile ? 200 : 250;
        
        const config = {
          fps: 10,
          qrbox: { width: qrboxSize, height: qrboxSize },
          aspectRatio: 1.0,
        };

        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText: string) => {
            if (isMounted && decodedText) {
              onSuccess(decodedText);
            }
          },
          () => {
            // Ignore scan errors
          }
        );
      } catch (err: any) {
        console.error("Scanner initialization error:", err);
        if (isMounted) {
          if (err.name === "NotAllowedError") {
            setPermissionStatus("denied");
            toast.error("Permissão de câmera negada");
          } else {
            toast.error("Não foi possível iniciar a câmera");
          }
        }
      }
    };

    initScanner();

    return () => {
      isMounted = false;
      
      if (html5QrCode) {
        html5QrCode.stop()
          .then(() => {
            html5QrCode.clear();
          })
          .catch((err: any) => {
            console.warn("Error stopping scanner:", err);
          });
      }
    };
  }, [onSuccess]);

  const handleRetryPermission = async () => {
    setPermissionStatus("checking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus("granted");
      window.location.reload(); // Recarrega para reinicializar o scanner
    } catch (error) {
      setPermissionStatus("denied");
      toast.error("Ainda sem permissão. Verifique as configurações do navegador.");
    }
  };

  if (permissionStatus === "denied") {
    return (
      <Alert variant="destructive" className="m-2 sm:m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          <div className="space-y-2 sm:space-y-3">
            <p className="font-semibold text-sm">Permissão de câmera negada</p>
            <p className="text-xs sm:text-sm">
              Para usar o scanner de QR Code, você precisa permitir o acesso à câmera.
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs">
              <p className="font-medium">Como habilitar:</p>
              <ol className="list-decimal list-inside space-y-0.5 sm:space-y-1">
                <li>Toque no ícone de cadeado/informações na barra de endereço</li>
                <li>Procure por "Câmera" ou "Permissões"</li>
                <li>Altere para "Permitir"</li>
                <li>Clique no botão abaixo para tentar novamente</li>
              </ol>
            </div>
            <Button 
              onClick={handleRetryPermission}
              variant="outline"
              size="sm"
              className="w-full mt-1.5 sm:mt-2 h-8 sm:h-9"
            >
              <Camera className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Tentar Novamente
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (permissionStatus === "checking") {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-xs sm:text-sm text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="qr-reader" 
      className="rounded-xl overflow-hidden border-4 border-secondary"
    />
  );
};

