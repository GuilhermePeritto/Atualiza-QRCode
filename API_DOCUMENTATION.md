# Documentação da API

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# API Configuration
VITE_API_BASE_URL=https://api.exemplo.com
VITE_API_TIMEOUT=30000

# Environment
VITE_ENV=development
```

### Estrutura

O sistema de API está organizado da seguinte forma:

```
src/
├── lib/
│   └── api.ts              # Métodos HTTP padronizados (GET, POST, PUT, DELETE, PATCH)
├── services/
│   ├── index.ts            # Exportação centralizada
│   ├── assetService.ts     # Serviço de patrimônios
│   └── unitService.ts      # Serviço de unidades
└── hooks/
    ├── useAssetData.ts     # Hook para buscar dados de patrimônio
    └── useUnitAccess.ts    # Hook para validar acesso a unidade
```

## Serviço de API Base (`src/lib/api.ts`)

### Métodos Disponíveis

#### `apiGet<T>(endpoint: string, options?: RequestInit)`

Realiza requisições GET.

**Exemplo:**
```typescript
import { apiGet } from '@/lib/api';

const response = await apiGet<{ data: Asset }>('/assets/123');
if (response.isSuccess) {
  console.log(response.data);
}
```

#### `apiPost<T, D>(endpoint: string, data?: D, options?: RequestInit)`

Realiza requisições POST.

**Exemplo:**
```typescript
import { apiPost } from '@/lib/api';

const response = await apiPost<{ success: boolean }, { name: string }>(
  '/assets',
  { name: 'Novo Patrimônio' }
);
```

#### `apiPut<T, D>(endpoint: string, data?: D, options?: RequestInit)`

Realiza requisições PUT.

#### `apiPatch<T, D>(endpoint: string, data?: D, options?: RequestInit)`

Realiza requisições PATCH.

#### `apiDelete<T>(endpoint: string, options?: RequestInit)`

Realiza requisições DELETE.

### Resposta Padronizada

Todos os métodos retornam um objeto `ApiResponse<T>`:

```typescript
interface ApiResponse<T> {
  data: T | null;           // Dados da resposta (se sucesso)
  error: ApiError | null;   // Erro (se falha)
  isSuccess: boolean;       // Indica se foi bem-sucedido
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
```

### Tratamento de Timeout

Todas as requisições têm timeout configurável via `VITE_API_TIMEOUT` (padrão: 30 segundos).

## Serviços Específicos

### Asset Service (`src/services/assetService.ts`)

Gerenciamento de patrimônios.

#### `getAssetByQrCode(qrCode: string, unitCode: string): Promise<AssetData | null>`

Busca um patrimônio pelo QR Code.

**Parâmetros:**
- `qrCode`: Código QR do patrimônio
- `unitCode`: Código da unidade

**Retorno:**
```typescript
interface AssetData {
  id?: string;
  qrCode: string;
  description: string;
  responsible: string;
  location: string;
  hierarchy: string;
  unit: string;
  imageUrl?: string;
}
```

**Uso no Hook:**
```typescript
import { useAssetData } from '@/hooks/useAssetData';

const { assetData, isLoading, error } = useAssetData(qrCode, unitCode);
```

#### `updateAsset(assetId: string, data: Partial<AssetData>): Promise<boolean>`

Atualiza dados de um patrimônio.

### Unit Service (`src/services/unitService.ts`)

Gerenciamento de unidades.

#### `validateUnitAccess(accessCode: string): Promise<ValidateUnitResponse>`

Valida código de acesso de uma unidade.

**Retorno:**
```typescript
interface ValidateUnitResponse {
  valid: boolean;
  unit?: Unit;
}

interface Unit {
  id: string;
  name: string;
  code: string;
}
```

**Uso no Hook:**
```typescript
import { useUnitAccess } from '@/hooks/useUnitAccess';

const { code, isLoading, setCode, handleAccessUnit } = useUnitAccess();
```

#### `getUnitById(unitId: string): Promise<Unit | null>`

Busca informações de uma unidade pelo ID.

## Hooks Personalizados

### `useAssetData`

Hook para buscar dados de patrimônio com gerenciamento de estado.

**Retorno:**
```typescript
{
  assetData: AssetData | null;
  isLoading: boolean;
  error: string | null;
}
```

### `useUnitAccess`

Hook para validação de acesso a unidade.

**Retorno:**
```typescript
{
  code: string;
  isLoading: boolean;
  setCode: (code: string) => void;
  handleAccessUnit: (e: React.FormEvent) => Promise<void>;
}
```

## Modo Mock

Atualmente, os serviços estão configurados em modo **MOCK** para desenvolvimento. Eles simulam:

- Delay de rede (800ms - 1500ms)
- Dados de exemplo
- Erros aleatórios (no caso de imagens)

### Ativando a API Real

Para conectar à API real, remova os comentários nos serviços:

**Exemplo em `assetService.ts`:**

```typescript
// Remover este bloco:
const mockData: AssetData = { /* ... */ };
return mockData;

// Descomentar este bloco:
const response = await apiGet<AssetApiResponse>(`/assets/${qrCode}?unit=${unitCode}`);
if (response.isSuccess && response.data) {
  return response.data.asset;
}
return null;
```

## Melhorias Futuras

- [ ] Implementação de cache de requisições
- [ ] Retry automático em caso de falha
- [ ] Interceptors para autenticação
- [ ] Logs estruturados de requisições
- [ ] Versionamento de API
- [ ] GraphQL (se necessário)

## Tratamento de Erros

Os erros são tratados automaticamente e retornados de forma padronizada. Exemplos:

```typescript
// Timeout
{
  message: "Tempo de requisição excedido",
  status: 408,
  code: "TIMEOUT"
}

// Erro HTTP
{
  message: "Erro na requisição: Not Found",
  status: 404,
  code: "HTTP_ERROR"
}

// Erro desconhecido
{
  message: "Ocorreu um erro desconhecido",
  code: "UNKNOWN_ERROR"
}
```

## Testes

Para testar as APIs em modo mock:

1. Execute o projeto: `npm run dev`
2. As requisições simularão delays e retornarão dados mock
3. Verifique o console para logs de desenvolvimento

## Suporte

Para dúvidas ou problemas, consulte a documentação do Vite sobre variáveis de ambiente:
https://vitejs.dev/guide/env-and-mode.html

