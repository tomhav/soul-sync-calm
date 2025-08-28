import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  topBar?: ReactNode;
  bottomNav?: ReactNode;
  className?: string;
}

const AppShell = ({ children, topBar, bottomNav, className = "" }: AppShellProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Background gradient applied globally via body in index.css */}
      
      {/* Top App Bar */}
      {topBar && (
        <div className="sticky top-0 z-50">
          {topBar}
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-sm mx-auto w-full">
          <div className="space-y-6 sm:space-y-8">
            {children}
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      {bottomNav && (
        <div className="sticky bottom-0 z-50">
          {bottomNav}
        </div>
      )}
    </div>
  );
};

export default AppShell;