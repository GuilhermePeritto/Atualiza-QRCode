import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export const PWAInstallPrompt = () => {
  const { isInstallable, isInstalled, installPWA } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é mobile
    const checkMobile = () => {
      const mobileDevice = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobileDevice);
      return mobileDevice;
    };

    const mobileDetected = checkMobile();
    window.addEventListener('resize', checkMobile);

    // Verifica se o usuário já dispensou a sugestão
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const threeDays = 3 * 24 * 60 * 60 * 1000; // 3 dias em ms
    
    // Mostra o prompt se:
    // 1. É mobile
    // 2. PWA é instalável
    // 3. Não está instalado
    // 4. Não foi dispensado recentemente (últimos 3 dias)
    if (mobileDetected && isInstallable && !isInstalled && (Date.now() - dismissedTime > threeDays)) {
      // Delay de 2 segundos para não ser intrusivo
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    const installed = await installPWA();
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt || !isMobile || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-card border border-border rounded-lg shadow-2xl p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Download className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Instalar Aplicativo
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Adicione à tela inicial para acesso rápido e use offline
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="flex-1 h-8 text-xs"
              >
                <Download className="w-3 h-3 mr-1.5" />
                Instalar
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
                className="h-8 px-3"
              >
                Agora não
              </Button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

