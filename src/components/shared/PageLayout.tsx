import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-2 sm:p-4">
        {children}
      </div>
    </div>
  );
};

