import { Skeleton } from "@/components/ui/skeleton";

export const AssetDetailsLoading = () => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      {/* Asset Header Skeleton */}
      <div className="text-center mb-3 space-y-2">
        <Skeleton className="h-10 w-10 rounded-full mx-auto" />
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-6 w-32 rounded-full mx-auto" />
      </div>

      {/* Layout com imagem à esquerda (thumbnail) e cards ao lado */}
      <div className="flex gap-3 mb-4">
        {/* Image Skeleton - thumbnail quadrada */}
        <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg flex-shrink-0" />
        
        {/* Cards superiores ao lado da imagem */}
        <div className="flex-1 space-y-2">
          {/* Card 1 - Descrição */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>

          {/* Card 2 - Responsável */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards em largura total */}
      <div className="space-y-2">
        {/* Card 3 - Localização (com subtitle) */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
        </div>

        {/* Card 4 - Empresa */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

