import React from 'react';
import { ScreenId, UserRole } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  onOpenVoice: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  setCurrentScreen,
  userRole,
  onOpenVoice,
}) => {
  const getHomeRoute = (): ScreenId => {
    switch (userRole) {
      case 'kitchen':
        return 'kitchen_dashboard';
      case 'receiving':
        return 'receiving_dashboard';
      case 'logistics':
        return 'logistics_dashboard';
    }
  };

  const isHomeActive =
    currentScreen === 'kitchen_dashboard' ||
    currentScreen === 'receiving_dashboard' ||
    currentScreen === 'logistics_dashboard';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e5e7eb] shadow-[0_-4px_16px_rgba(17,24,39,0.06)] pb-safe">
      <div className="flex justify-between items-center h-16 px-4 max-w-lg mx-auto">
        {/* 1. Dashboard Tab */}
        <button
          onClick={() => setCurrentScreen(getHomeRoute())}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${
            isHomeActive
              ? 'text-[#00652c] font-bold'
              : 'text-[#6f7a6e] hover:text-[#00652c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {userRole === 'kitchen' ? 'dashboard' : userRole === 'receiving' ? 'volunteer_activism' : 'local_shipping'}
          </span>
          <span className="text-[10px] tracking-tight">Dashboard</span>
        </button>

        {/* 2. Batches / Surplus Tab */}
        <button
          onClick={() => setCurrentScreen('list_surplus')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${
            currentScreen === 'list_surplus'
              ? 'text-[#00652c] font-bold'
              : 'text-[#6f7a6e] hover:text-[#00652c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          <span className="text-[10px] tracking-tight">Batches</span>
        </button>

        {/* 3. Center Action: Krishi AI Voice & Optic */}
        <button
          onClick={onOpenVoice}
          className="flex flex-col items-center justify-center -mt-4 group focus:outline-none"
          title="Krishi AI Voice Assistant"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00652c] to-[#15803d] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(21,128,61,0.35)] group-hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[24px]">mic</span>
          </div>
          <span className="text-[10px] font-semibold text-[#00652c] mt-0.5">Krishi AI</span>
        </button>

        {/* 4. Redistribute / Matches Tab */}
        <button
          onClick={() => {
            if (userRole === 'logistics') {
              setCurrentScreen('logistics_dashboard');
            } else {
              setCurrentScreen('matched_orgs');
            }
          }}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${
            currentScreen === 'matched_orgs'
              ? 'text-[#00652c] font-bold'
              : 'text-[#6f7a6e] hover:text-[#00652c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">hub</span>
          <span className="text-[10px] tracking-tight">Matches</span>
        </button>

        {/* 5. Sustainability / ESG Tab */}
        <button
          onClick={() => setCurrentScreen('sustainability_dashboard')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${
            currentScreen === 'sustainability_dashboard'
              ? 'text-[#00652c] font-bold'
              : 'text-[#6f7a6e] hover:text-[#00652c]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">eco</span>
          <span className="text-[10px] tracking-tight">Mandi ESG</span>
        </button>
      </div>
    </nav>
  );
};
