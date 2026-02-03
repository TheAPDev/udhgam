import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout = ({ children, currentPage, onNavigate }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="lg:ml-64 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
};
