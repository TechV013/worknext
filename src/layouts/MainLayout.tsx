import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { NotificationDrawer } from '../components/common/NotificationDrawer';
import { AccessibilityBar } from '../components/common/AccessibilityBar';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';
import { ScrollToTop } from '../components/common/ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <NotificationDrawer />
      <AccessibilityBar />
      <GlobalSearchModal />
      <ScrollToTop />
    </div>
  );
};
