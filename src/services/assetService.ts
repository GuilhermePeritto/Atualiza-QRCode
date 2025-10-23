/**
 * Serviço de API para gerenciamento de patrimônios
 */

import { apiGet } from '@/lib/api';

export interface AssetData {
  id?: string;
  qrCode: string;
  description: string;
  responsible: string;
  location: string;
  hierarchy: string;
  company: string;
  imageUrl?: string;
}

export interface AssetApiResponse {
  asset: AssetData;
}

/**
 * Busca dados de um patrimônio pelo QR Code
 */
export const getAssetByQrCode = async (
  qrCode: string,
  companyCode: string
): Promise<AssetData | null> => {
  try {
    // TODO: Remover mock quando a API estiver disponível
    // const response = await apiGet<AssetApiResponse>(`/assets/${qrCode}?company=${companyCode}`);
    
    // Mock de dados para desenvolvimento
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Hash simples do qrCode para determinar se tem imagem (consistente)
    const hasImage = qrCode.length % 3 === 0;
    
    const mockData: AssetData = {
      id: qrCode,
      qrCode,
      description: `Equipamento ${qrCode}`,
      responsible: 'João Silva',
      location: 'Sala 101 - Bloco A',
      hierarchy: 'Administração > TI > Equipamentos',
      company: companyCode,
      // Baseado no qrCode, alguns terão imagem, outros não (mas será sempre o mesmo)
      imageUrl: hasImage ? `/novo-patrimonio.jpg` : undefined,
    };

    return mockData;
  } catch (error) {
    console.error('Erro ao buscar patrimônio:', error);
    return null;
  }
};

/**
 * Atualiza dados de um patrimônio
 */
export const updateAsset = async (
  assetId: string,
  data: Partial<AssetData>
): Promise<boolean> => {
  try {
    // TODO: Implementar quando a API estiver disponível
    // const response = await apiPut<AssetApiResponse, Partial<AssetData>>(
    //   `/assets/${assetId}`,
    //   data
    // );
    // return response.isSuccess;
    
    console.log('Atualizando patrimônio:', assetId, data);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar patrimônio:', error);
    return false;
  }
};

