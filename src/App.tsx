import { Toaster as Sonner } from "@/components/ui/sonner";
import { PWAInstallPrompt } from "@/components/shared/PWAInstallPrompt";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectCompany from "./pages/SelectCompany";
import ScanQRCode from "./pages/ScanQRCode";
import AssetDetails from "./pages/AssetDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Sonner />
    <PWAInstallPrompt />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectCompany />} />
        <Route path="/scan" element={<ScanQRCode />} />
        <Route path="/asset-details/:qrCode" element={<AssetDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;