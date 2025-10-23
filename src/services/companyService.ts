/**
 * Serviço de API para gerenciamento de empresas
 */

import { apiGet, apiPost } from '@/lib/api';

export interface Company {
  id: string;
  name: string;
  code: string;
}

export interface ValidateCompanyResponse {
  valid: boolean;
  company?: Company;
}

/**
 * Valida o código de acesso de uma empresa
 */
export const validateCompanyAccess = async (
  accessCode: string
): Promise<ValidateCompanyResponse> => {
  try {
    // TODO: Remover mock quando a API estiver disponível
    // const response = await apiPost<ValidateCompanyResponse>(
    //   '/companies/validate',
    //   { code: accessCode }
    // );

    // Mock de dados para desenvolvimento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockCompany: Company = {
      id: '1',
      name: 'Entidade Modelo - Apresentação - Atualiza Sistemas',
      code: accessCode,
    };

    return {
      valid: true,
      company: mockCompany,
    };

    // Quando a API estiver disponível, usar:
    // if (response.isSuccess && response.data) {
    //   return response.data;
    // }
    // 
    // return { valid: false };
  } catch (error) {
    console.error('Erro ao validar empresa:', error);
    return { valid: false };
  }
};

/**
 * Busca informações de uma empresa pelo ID
 */
export const getCompanyById = async (companyId: string): Promise<Company | null> => {
  try {
    // TODO: Implementar quando a API estiver disponível
    // const response = await apiGet<{ company: Company }>(`/companies/${companyId}`);
    // 
    // if (response.isSuccess && response.data) {
    //   return response.data.company;
    // }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    return null;
  }
};

