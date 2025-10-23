import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useScannerState = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const handleScanSuccess = useCallback((qrCode: string) => {
    setIsScanning(false);
    navigate(`/asset-details/${qrCode}`);
  }, [navigate]);

  const startScanning = useCallback(() => {
    setIsScanning(true);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const handleManualSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (manualCode.trim()) {
      navigate(`/asset-details/${manualCode.trim()}`);
    }
  }, [manualCode, navigate]);

  return {
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
  };
};

