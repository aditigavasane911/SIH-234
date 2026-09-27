import React from 'react';
import { ScreenId, UserRole } from '../types';

interface TopHeaderProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  unreadAlertsCount: number;
  onOpenVoice: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  setCurrentScreen,
  userRole,
  setUserRole,
  unreadAlertsCount,
}) => {
  const isSubScreen = [
    'list_surplus',
    'matched_orgs',
    'leaderboard',
    'subscription',
    'alerts'
  ].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'kitchen_dashboard':
        return 'Kitchen Dashboard';
      case 'receiving_dashboard':
        return 'Receiving Organization';
      case 'logistics_dashboard':
        return 'Logistics Partner';
      case 'list_surplus':
        return 'List Surplus & AI Scan';
      case 'matched_orgs':
        return 'Matched Receivers';
      case 'sustainability_dashboard':
        return 'Sustainability & ESG';
      case 'leaderboard':
        return 'Badges & Leaderboard';
      case 'subscription':
        return 'Upgrade & ESG Plan';
      case 'alerts':
        return 'Alerts & Activity';
      case 'settings':
        return 'Settings & Profile';
      default:
        return 'FreshoFarm';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'kitchen':
        return 'Kitchen Unit';
      case 'receiving':
        return 'NGO Receiver';
      case 'logistics':
        return 'Logistics Partner';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Left: Back button or Location */}
        <div className="flex items-center gap-2 min-w-0">
          {isSubScreen ? (
            <button
              onClick={() => {
                if (currentScreen === 'matched_orgs') {
                  setCurrentScreen('kitchen_dashboard');
                } else if (currentScreen === 'list_surplus') {
                  setCurrentScreen('kitchen_dashboard');
                } else {
                  setCurrentScreen(
                    userRole === 'kitchen'
                      ? 'kitchen_dashboard'
                      : userRole === 'receiving'
                      ? 'receiving_dashboard'
                      : 'logistics_dashboard'
                  );
                }
              }}
              className="w-9 h-9 rounded-full bg-[#f1f3ff] text-[#141b2b] flex items-center justify-center hover:bg-[#e1e8fd] transition-colors shrink-0"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#4e5a53] uppercase tracking-wider truncate">
              <span>Nashik, MH</span>
              <span className="text-[#becabc]">•</span>
              <span className="text-[#00652c] font-bold">{getRoleLabel()}</span>
            </div>
            <h1 className="text-[16px] font-bold text-[#141b2b] leading-tight truncate">
              {getScreenTitle()}
            </h1>
          </div>
        </div>

        {/* Right Action Icons: Role Quick Switcher, Alerts & Avatar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Role Quick Switch Menu */}
          <div className="relative group">
            <button
              className="px-2 py-1 rounded-lg bg-[#f1f3ff] hover:bg-[#e1e8fd] text-[11px] font-semibold text-[#00652c] flex items-center gap-1 border border-[#becabc]/40 transition-colors"
              title="Switch user role demo"
            >
              <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
              <span className="hidden sm:inline">Role</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-1.5 hidden group-hover:block z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6f7a6e]">
                Switch Active Role
              </div>
              <button
                onClick={() => {
                  setUserRole('kitchen');
                  setCurrentScreen('kitchen_dashboard');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] flex items-center gap-2 transition-colors ${
                  userRole === 'kitchen'
                    ? 'bg-[#ebf7ee] text-[#00652c] font-semibold'
                    : 'text-[#141b2b] hover:bg-[#f1f3ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
                Kitchen Hub
              </button>
              <button
                onClick={() => {
                  setUserRole('receiving');
                  setCurrentScreen('receiving_dashboard');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] flex items-center gap-2 transition-colors ${
                  userRole === 'receiving'
                    ? 'bg-[#ebf7ee] text-[#00652c] font-semibold'
                    : 'text-[#141b2b] hover:bg-[#f1f3ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                Receiving NGO
              </button>
              <button
                onClick={() => {
                  setUserRole('logistics');
                  setCurrentScreen('logistics_dashboard');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] flex items-center gap-2 transition-colors ${
                  userRole === 'logistics'
                    ? 'bg-[#ebf7ee] text-[#00652c] font-semibold'
                    : 'text-[#141b2b] hover:bg-[#f1f3ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                Logistics Partner
              </button>
            </div>
          </div>

          {/* Alerts Notification Button */}
          <button
            onClick={() => setCurrentScreen('alerts')}
            className={`w-9 h-9 rounded-full flex items-center justify-center relative transition-colors ${
              currentScreen === 'alerts'
                ? 'bg-[#00652c] text-white'
                : 'text-[#3f493f] hover:bg-[#f1f3ff]'
            }`}
            aria-label="Alerts"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
            )}
          </button>

          {/* Profile Avatar -> Settings */}
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`w-8 h-8 rounded-full overflow-hidden ring-2 transition-all ${
              currentScreen === 'settings' ? 'ring-[#00652c]' : 'ring-transparent hover:ring-[#00652c]/50'
            }`}
            aria-label="Settings & Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
