import { ReactNode } from "react";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AssetDetailsLayoutProps {
  children: ReactNode;
  onNewScan: () => void;
}

export const AssetDetailsLayout = ({ children, onNewScan }: AssetDetailsLayoutProps) => {
  return (
    <Card className="flex-1 flex flex-col shadow-elevated animate-fade-in overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>

      <div className="p-4 border-t bg-background flex-shrink-0">
        <Button
          onClick={onNewScan}
          className="w-full h-10 text-sm"
        >
          <QrCode size={18} className="mr-2" />
          Fazer Nova Leitura
        </Button>
      </div>
    </Card>
  );
};

