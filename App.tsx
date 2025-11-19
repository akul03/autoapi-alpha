/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  // Simple state-based routing
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');

  // Handle browser back button (optional for this prototype but good for UX)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page as any);
    window.history.pushState({ page }, '', `#${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-stone-200 selection:bg-accent selection:text-stone-900 font-sans">
      {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
      {(currentPage === 'login' || currentPage === 'signup') && (
        <Auth
          initialView={currentPage}
          onLogin={() => navigate('dashboard')}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={() => navigate('landing')} />
      )}
    </div>
  );
};

export default App;
