import { QrCode, Package } from "lucide-react";

interface AssetHeaderProps {
  qrCode: string;
}

export const AssetHeader = ({ qrCode }: AssetHeaderProps) => {
  return (
    <div className="text-center mb-3">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 mb-1.5">
        <Package size={20} className="text-secondary" />
      </div>
      <h1 className="text-lg font-bold text-primary mb-1.5">Patrimônio Localizado</h1>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full">
        <QrCode size={14} className="text-primary" />
        <span className="text-primary font-mono font-semibold text-sm">{qrCode}</span>
      </div>
    </div>
  );
};

