import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/shared/PageLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { AssetDetailsLayout } from "@/components/asset/AssetDetailsLayout";
import { AssetDetailsLoading } from "@/components/asset/AssetDetailsLoading";
import { AssetDetailsContent } from "@/components/asset/AssetDetailsContent";
import { AssetNotFound } from "@/components/asset/AssetNotFound";
import { useSelectedCompany } from "@/hooks/useSelectedCompany";
import { useAssetData } from "@/hooks/useAssetData";

const AssetDetails = () => {
  const navigate = useNavigate();
  const { qrCode } = useParams();
  const selectedCompany = useSelectedCompany();
  const { assetData, isLoading, error } = useAssetData(qrCode, selectedCompany?.code);

  const handleNewScan = () => {
    navigate("/escanear");
  };

  // Determina qual conteúdo renderizar
  const renderContent = () => {
    if (isLoading) {
      return <AssetDetailsLoading />;
    }

    if (error || !assetData) {
      return <AssetNotFound qrCode={qrCode} />;
    }

    return (
      <AssetDetailsContent
        qrCode={qrCode || ""}
        imageUrl={assetData.imageUrl}
        description={assetData.description}
        responsible={assetData.responsible}
        location={assetData.location}
        hierarchy={assetData.hierarchy}
        company={assetData.company}
      />
    );
  };

  return (
    <PageLayout>
      <PageHeader
        label="Empresa:"
        value={selectedCompany?.name || ""}
      />

      <AssetDetailsLayout onNewScan={handleNewScan}>
        {renderContent()}
      </AssetDetailsLayout>
    </PageLayout>
  );
};

export default AssetDetails;
