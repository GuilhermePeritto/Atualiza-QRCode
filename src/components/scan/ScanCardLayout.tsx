import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ScanCardLayoutProps {
  header: ReactNode;
  content: ReactNode;
  actions: ReactNode;
}

export const ScanCardLayout = ({ header, content, actions }: ScanCardLayoutProps) => {
  return (
    <Card className="flex-1 flex flex-col shadow-elevated overflow-hidden">
      <div className="text-center py-2 sm:py-3 px-3 sm:px-4 flex-shrink-0">
        {header}
      </div>

      <div className="flex-1 flex flex-col px-3 sm:px-4 pb-3 sm:pb-4 min-h-0">
        <div className="flex-1 flex items-center justify-center mb-2 sm:mb-3 min-h-0">
          {content}
        </div>

        <div className="space-y-1.5 sm:space-y-2 flex-shrink-0">
          {actions}
        </div>
      </div>
    </Card>
  );
};

