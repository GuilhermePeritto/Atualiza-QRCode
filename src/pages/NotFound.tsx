import { useNavigate } from "react-router-dom";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout>
      <PageHeader label="Empresa:" value="Atualiza Sistemas" />
      
      <Card className="flex-1 flex flex-col shadow-elevated animate-fade-in overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-4 sm:space-y-5 text-center py-4">
              {/* Ícone e número 404 */}
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 border-2 border-primary/20">
                  <AlertCircle size={32} className="text-primary sm:w-10 sm:h-10" />
                </div>
              </div>

              {/* Título */}
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-5xl sm:text-6xl font-bold text-primary">404</h1>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  Página Não Encontrada
                </h2>
                <p className="text-sm text-muted-foreground">
                  A página que você está procurando não existe ou foi removida.
                </p>
              </div>

              {/* Alert com informações */}
              <Alert className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-1.5">Possíveis causas:</p>
                  <ul className="text-sm space-y-0.5 list-disc list-inside ml-2">
                    <li>URL digitada incorretamente</li>
                    <li>Link desatualizado ou quebrado</li>
                    <li>Página movida ou excluída</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Botões de ação */}
              <div className="space-y-2">
                <Button 
                  onClick={handleGoHome}
                  className="w-full h-10 text-sm"
                >
                  <Home size={18} className="mr-2" />
                  Voltar para o Início
                </Button>
                <Button 
                  onClick={handleGoBack}
                  variant="outline"
                  className="w-full h-10 text-sm"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar à Página Anterior
                </Button>
              </div>

              {/* Footer com texto pequeno */}
              <p className="text-xs text-muted-foreground pt-1">
                Se o problema persistir, entre em contato com o suporte.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default NotFound;
