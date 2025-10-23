import { LucideIcon } from "lucide-react";

interface AssetInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
}

export const AssetInfoCard = ({ icon: Icon, label, value, subtitle }: AssetInfoCardProps) => {
  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-primary/10 rounded-lg flex-shrink-0">
          <Icon size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
          <p className="text-sm text-foreground font-semibold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

