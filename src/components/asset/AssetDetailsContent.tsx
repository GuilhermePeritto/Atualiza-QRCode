import { MapPin, User, Building2, Package } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssetHeader } from "./AssetHeader";
import { AssetInfoCard } from "./AssetInfoCard";
import { AssetImage } from "./AssetImage";

interface AssetDetailsContentProps {
  qrCode: string;
  imageUrl?: string;
  description: string;
  responsible: string;
  location: string;
  hierarchy?: string;
  company: string;
}

export const AssetDetailsContent = ({
  qrCode,
  imageUrl,
  description,
  responsible,
  location,
  hierarchy,
  company,
}: AssetDetailsContentProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        <AssetHeader qrCode={qrCode} />

        {/* Layout com imagem à esquerda e informações compactas */}
        <div className="flex gap-3 mb-4">
          <AssetImage 
            imageUrl={imageUrl} 
            description={description}
            variant="thumbnail"
          />
          
          <div className="flex-1 space-y-2 min-w-0">
            <AssetInfoCard
              icon={Package}
              label="Descrição"
              value={description}
            />
            
            <AssetInfoCard
              icon={User}
              label="Responsável"
              value={responsible}
            />
          </div>
        </div>

        {/* Informações adicionais em largura total */}
        <div className="space-y-2 pb-2">
          <AssetInfoCard
            icon={MapPin}
            label="Localização"
            value={location}
            subtitle={hierarchy}
          />

          <AssetInfoCard
            icon={Building2}
            label="Empresa"
            value={company}
          />
        </div>
      </div>
    </ScrollArea>
  );
};

