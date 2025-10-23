# Atualiza QR Code 📱

Sistema web moderno para leitura e gestão de QR Codes de patrimônios empresariais.

## 📋 Sobre o Projeto

O **Atualiza QR Code** é uma Progressive Web App (PWA) desenvolvida para facilitar a inventariação e rastreamento de patrimônios através de QR Codes. O sistema oferece uma experiência mobile-first com suporte offline completo.

### ✨ Funcionalidades Principais

- 🏢 **Seleção de Empresa** - Acesso multi-empresa com código de autenticação
- 📷 **Leitura de QR Code** - Scanner integrado usando câmera do dispositivo
- ⌨️ **Entrada Manual** - Busca por código quando o QR não está disponível
- 📊 **Visualização Detalhada** - Informações completas do patrimônio com imagem
- 🚪 **Logout Rápido** - Botão de sair sempre acessível no header
- 📱 **PWA** - Instalável como app no smartphone
- ⚡ **Navegação Instantânea** - Transições suaves com skeleton loading

## 🚀 Tecnologias

### Core Stack
- **React 18.3** - Biblioteca UI moderna com hooks
- **TypeScript 5.8** - Tipagem estática e IntelliSense
- **Vite 7.1** - Build tool extremamente rápido
- **React Router DOM 6.30** - Roteamento SPA

### UI & Design
- **Tailwind CSS 3.4** - Framework utility-first
- **shadcn/ui** - Componentes reutilizáveis e acessíveis
- **Radix UI** - Primitivos de UI (Dialog, ScrollArea, Slot)
- **Lucide React** - Biblioteca de ícones
- **Sonner** - Sistema de toasts elegante
- **next-themes** - Suporte a temas dark/light

### Gerenciamento de Estado
- **TanStack Query 5.83** - Cache e sincronização de dados
- **LocalStorage** - Persistência de sessão

### Funcionalidades Específicas
- **html5-qrcode 2.3** - Leitura de QR Code via câmera
- **class-variance-authority** - Variantes de componentes
- **clsx** - Conditional className
- **tailwind-merge** - Merge de classes Tailwind

### PWA & Performance
- **vite-plugin-pwa** - Service Worker e manifest
- **workbox-window** - Estratégias de cache

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── asset/               # Componentes de patrimônio
│   │   ├── AssetDetailsContent.tsx
│   │   ├── AssetDetailsLayout.tsx
│   │   ├── AssetDetailsLoading.tsx
│   │   ├── AssetDetailsSkeleton.tsx
│   │   ├── AssetHeader.tsx
│   │   ├── AssetImage.tsx
│   │   ├── AssetInfoCard.tsx
│   │   └── AssetNotFound.tsx
│   ├── company/             # Componentes de empresa
│   │   └── CompanyAccessForm.tsx
│   ├── scan/                # Componentes de scanner
│   │   ├── ManualInputContent.tsx
│   │   ├── QRCodeScanner.tsx
│   │   ├── ScanCardLayout.tsx
│   │   └── ScannerContent.tsx
│   ├── shared/              # Componentes compartilhados
│   │   ├── PageHeader.tsx
│   │   └── PageLayout.tsx
│   └── ui/                  # Componentes UI base
│       ├── alert.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── scroll-area.tsx
│       ├── skeleton.tsx
│       └── sonner.tsx
├── hooks/                   # Custom React Hooks
│   ├── useAssetData.ts
│   ├── useCompanyAccess.ts
│   ├── useSelectedCompany.ts
│   ├── useScannerState.ts
│   └── use-mobile.tsx
├── lib/                     # Utilitários e configurações
│   ├── api.ts              # Cliente HTTP com cache
│   └── utils.ts            # Funções auxiliares
├── pages/                   # Páginas da aplicação
│   ├── AssetDetails.tsx    # Detalhes do patrimônio
│   ├── NotFound.tsx        # Página 404
│   ├── ScanQRCode.tsx      # Scanner de QR Code
│   └── SelectCompany.tsx   # Seleção de empresa
├── services/                # Camada de serviços
│   ├── assetService.ts     # Serviço de patrimônios
│   └── companyService.ts   # Serviço de empresas
├── App.tsx                  # Componente raiz
├── main.tsx                # Entry point
└── index.css               # Estilos globais
```

## 🎨 Padrões de Código

### Composição de Componentes

O projeto utiliza **Composition Pattern** para evitar re-renderizações desnecessárias:

```typescript
// Layout fixo com conteúdo dinâmico
<AssetDetailsLayout onNewScan={handleNewScan}>
  {isLoading ? <AssetDetailsLoading /> : <AssetDetailsContent {...data} />}
</AssetDetailsLayout>
```

### Custom Hooks

Lógica de negócio encapsulada em hooks reutilizáveis:

```typescript
const { assetData, isLoading, error } = useAssetData(qrCode, companyCode);
const selectedCompany = useSelectedCompany();
```

### Serviços com Cache

API client configurado com retry e cache:

```typescript
const mockData = await getAssetByQrCode(qrCode, companyCode);
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd Atualiza-QRCode

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview
```

### PWA Icons

```bash
# Gerar ícones PWA a partir de uma imagem
npm run generate-icons
```

## 📱 Uso da Aplicação

### 1. Acesso à Empresa

1. Insira o código de acesso fornecido pelo administrador
2. Clique em **"ACESSAR"**
3. Em caso de dúvida, clique em **"Não possuo código de acesso!"**

### 2. Escaneamento de QR Code

**Opção 1 - Scanner:**
1. Clique em **"Iniciar Leitura"**
2. Aponte a câmera para o QR Code do patrimônio
3. O sistema reconhece automaticamente e exibe os detalhes

**Opção 2 - Entrada Manual:**
1. Clique em **"Digitar Patrimônio"**
2. Digite o código do patrimônio
3. Clique em **"Buscar Patrimônio"**

### 3. Visualização de Detalhes

- **Imagem do patrimônio** - Clique para expandir
- **Descrição** - Nome e tipo do equipamento
- **Responsável** - Pessoa responsável pelo item
- **Localização** - Local físico + hierarquia
- **Empresa** - Unidade/empresa proprietária

### 4. Navegação

- **Seta ← (Voltar)** - Retorna para a página anterior
- **Ícone 🚪 (Sair)** - Encerra a sessão e volta para login
- **Botão "Fazer Nova Leitura"** - Retorna para o scanner

## 🎯 Recursos Especiais

### Skeleton Loading

Carregamento visual enquanto busca dados:
- Preserva layout da página
- Evita flash de conteúdo
- Feedback visual imediato

### Toast Notifications

Sistema de notificações não-intrusivo:
- **Desktop** - Canto superior direito
- **Mobile** - Centro inferior
- **Botão de fechar** em todos os toasts
- **Apenas erros** são exibidos

### Página "Não Encontrado"

Tela amigável quando patrimônio não existe:
- Ícone animado
- Código QR buscado
- Possíveis causas do erro
- Sugestões de ação

### PWA Features

- **Instalável** - Adicione à tela inicial
- **Offline Ready** - Funciona sem internet (dados em cache)
- **App-like** - Experiência de aplicativo nativo

## 🔐 Segurança

- Código de acesso por empresa
- Sessão salva em LocalStorage
- Logout manual disponível
- Validação de entrada em todos os formulários

## 🌐 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Navegadores mobile modernos

## 📄 Licença

Este projeto é proprietário da Atualiza Sistemas.

## 👥 Equipe

Desenvolvido por Atualiza Sistemas
