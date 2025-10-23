import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageLayout } from "@/components/shared/PageLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { useSelectedCompany } from "@/hooks/useSelectedCompany";

export const AssetDetailsSkeleton = () => {
  const selectedCompany = useSelectedCompany();

  return (
    <PageLayout>
      <PageHeader
        label="Empresa:"
        value={selectedCompany?.name || ""}
      />

      <Card className="flex-1 flex flex-col shadow-elevated overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {/* Asset Header Skeleton */}
            <div className="text-center mb-4 space-y-3">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-7 w-48 mx-auto" />
              <Skeleton className="h-7 w-32 rounded-full mx-auto" />
            </div>

            {/* Image Skeleton - mesma altura do componente real */}
            <Skeleton className="w-full h-32 rounded-lg" />

            {/* Info Cards Skeleton */}
            <div className="space-y-3">
              {/* Card 1 - Descrição */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>

              {/* Card 2 - Responsável */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

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
        </div>

        {/* Button Skeleton */}
        <div className="p-4 border-t bg-background">
          <Skeleton className="w-full h-10" />
        </div>
      </Card>
    </PageLayout>
  );
};

