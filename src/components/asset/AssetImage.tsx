import { useState } from "react";
import { Package, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AssetImageProps {
  imageUrl?: string;
  description: string;
  variant?: "full" | "thumbnail";
}

export const AssetImage = ({ imageUrl, description, variant = "full" }: AssetImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const fallbackImage = "/novo-patrimonio.jpg";
  const shouldUseFallback = !imageUrl || imageError;

  const thumbnailClasses = variant === "thumbnail" 
    ? "w-24 h-24 sm:w-28 sm:h-28" 
    : "w-full h-32";

  return (
    <>
      {/* Miniatura */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`relative ${thumbnailClasses} bg-muted rounded-lg overflow-hidden flex-shrink-0 group cursor-pointer transition-all hover:ring-2 hover:ring-primary/50`}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <Package size={variant === "thumbnail" ? 20 : 28} className="animate-pulse" />
              {variant !== "thumbnail" && <span className="text-xs">Carregando...</span>}
            </div>
          </div>
        )}
        
        <img
          src={shouldUseFallback ? fallbackImage : imageUrl}
          alt={description}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!shouldUseFallback) {
              setImageError(true);
              setImageLoaded(false);
            } else {
              setImageLoaded(true);
            }
          }}
        />
        
        {/* Overlay com ícone de expandir */}
        {imageLoaded && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={variant === "thumbnail" ? 20 : 28} />
          </div>
        )}
        
        {shouldUseFallback && imageLoaded && variant !== "thumbnail" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-xs text-white/90 text-center">
              Imagem não disponível
            </p>
          </div>
        )}
      </button>

      {/* Dialog de expansão */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{description}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            <img
              src={shouldUseFallback ? fallbackImage : imageUrl}
              alt={description}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

