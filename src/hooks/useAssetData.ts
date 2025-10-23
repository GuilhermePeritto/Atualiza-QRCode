import { useEffect, useState } from "react";
import { getAssetByQrCode, AssetData } from "@/services/assetService";

export const useAssetData = (qrCode: string | undefined, unitCode: string | undefined) => {
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qrCode || !unitCode) return;

    const fetchAssetData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAssetByQrCode(qrCode, unitCode);
        
        if (data) {
          setAssetData(data);
        } else {
          setError("Patrimônio não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar dados do patrimônio");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssetData();
  }, [qrCode, unitCode]);

  return { assetData, isLoading, error };
};

