import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/shared/PageLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScanCardLayout } from "@/components/scan/ScanCardLayout";
import { ScannerContent } from "@/components/scan/ScannerContent";
import { ManualInputContent } from "@/components/scan/ManualInputContent";
import { useScannerState } from "@/hooks/useScannerState";
import { useSelectedCompany } from "@/hooks/useSelectedCompany";

const ScanQRCode = () => {
  const navigate = useNavigate();
  const selectedCompany = useSelectedCompany();
  
  const {
    isScanning,
    isLoading,
    manualCode,
    showManualInput,
    setManualCode,
    setShowManualInput,
    handleScanSuccess,
    startScanning,
    stopScanning,
    handleManualSubmit,
  } = useScannerState();

  if (!selectedCompany) return null;

  // Seleciona o conteúdo baseado no modo atual
  const contentProps = !showManualInput 
    ? ScannerContent({
        isScanning,
        isLoading,
        onStartScanning: startScanning,
        onStopScanning: stopScanning,
        onShowManualInput: () => setShowManualInput(true),
        onScanSuccess: handleScanSuccess,
      })
    : ManualInputContent({
        code: manualCode,
        isLoading,
        onCodeChange: setManualCode,
        onSubmit: handleManualSubmit,
        onBack: () => setShowManualInput(false),
      });

  return (
    <PageLayout>
      <PageHeader
        label="Empresa Selecionada:"
        value={selectedCompany.name}
      />

      <ScanCardLayout
        header={contentProps.header}
        content={contentProps.content}
        actions={contentProps.actions}
      />
    </PageLayout>
  );
};

export default ScanQRCode;
