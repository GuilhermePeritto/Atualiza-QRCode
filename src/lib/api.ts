/**
 * Serviço de API centralizado e padronizado
 * Todas as requisições devem passar por este serviço
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.exemplo.com';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  isSuccess: boolean;
}

/**
 * Classe de erro customizada para APIs
 */
export class ApiException extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

/**
 * Configuração de timeout para requisições
 */
const createTimeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new ApiException('Tempo de requisição excedido', 408, 'TIMEOUT')), ms);
  });
};

/**
 * Função auxiliar para fazer requisições com timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    createTimeoutPromise(timeout)
  ]);
};

/**
 * Tratamento de erros padronizado
 */
const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiException) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: 'Ocorreu um erro desconhecido',
    code: 'UNKNOWN_ERROR',
  };
};

/**
 * Método GET padronizado
 */
export const apiGet = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiException(
        `Erro na requisição: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    const data = await response.json();

    return {
      data,
      error: null,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      error: handleApiError(error),
      isSuccess: false,
    };
  }
};

/**
 * Método POST padronizado
 */
export const apiPost = async <T, D = unknown>(
  endpoint: string,
  data?: D,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiException(
        `Erro na requisição: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    const responseData = await response.json();

    return {
      data: responseData,
      error: null,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      error: handleApiError(error),
      isSuccess: false,
    };
  }
};

/**
 * Método PUT padronizado
 */
export const apiPut = async <T, D = unknown>(
  endpoint: string,
  data?: D,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiException(
        `Erro na requisição: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    const responseData = await response.json();

    return {
      data: responseData,
      error: null,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      error: handleApiError(error),
      isSuccess: false,
    };
  }
};

/**
 * Método DELETE padronizado
 */
export const apiDelete = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiException(
        `Erro na requisição: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    const responseData = await response.json();

    return {
      data: responseData,
      error: null,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      error: handleApiError(error),
      isSuccess: false,
    };
  }
};

/**
 * Método PATCH padronizado
 */
export const apiPatch = async <T, D = unknown>(
  endpoint: string,
  data?: D,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiException(
        `Erro na requisição: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    const responseData = await response.json();

    return {
      data: responseData,
      error: null,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      error: handleApiError(error),
      isSuccess: false,
    };
  }
};

/**
 * Exporta a URL base da API para uso direto quando necessário
 */
export const getApiBaseUrl = () => API_BASE_URL;

/**
 * Exporta o timeout configurado
 */
export const getApiTimeout = () => API_TIMEOUT;

