import React, { useState } from 'react';
import { AppAlert, ScreenId } from '../types';

interface AlertsScreenProps {
  alerts: AppAlert[];
  onMarkAllRead: () => void;
  onDismissAlert: (id: string) => void;
  onToggleRead: (id: string) => void;
  onResetAlerts: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  alerts,
  onMarkAllRead,
  onDismissAlert,
  onToggleRead,
  onResetAlerts,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'freshness' | 'pickup'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.category === activeFilter;
  });

  const unreadCount = alerts.filter((a) => a.unread).length;

  const handleActionClick = (alertItem: AppAlert) => {
    onToggleRead(alertItem.id);
    if (alertItem.actionTargetScreen) {
      onNavigate(alertItem.actionTargetScreen);
    } else if (alertItem.actionType === 'view_log') {
      onNavigate('kitchen_dashboard');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-1 px-4 max-w-lg mx-auto space-y-3">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Screen Sub-Header & Controls (Matching Screenshot 3) */}
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#141b2b] font-headline">Alerts & Activity</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold tracking-wide">
                {unreadCount} New
              </span>
            )}
          </div>

          <button
            onClick={() => {
              onMarkAllRead();
              showToast('All notifications marked as read');
            }}
            className="flex items-center gap-1 text-xs font-semibold text-[#4e5a53] hover:text-[#00652c] transition-colors py-1 px-2 rounded-lg"
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            <span>Mark all read</span>
          </button>
        </div>

        {/* Live Telemetry Status Strip (Matching Screenshot 3) */}
        <div className="bg-[#f1f3ff] px-3.5 py-2 rounded-2xl flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00652c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00652c]"></span>
            </span>
            <span className="text-xs font-semibold text-[#4e5a53]">
              FreshoFarm Grid • 6 Active Hubs
            </span>
          </div>
          <span className="text-xs text-[#00652c] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">sync</span>
            Synced
          </span>
        </div>

        {/* Filter Chips Row (Matching Screenshot 3) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-1 px-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            <span>All</span>
            <span className="text-[10px] opacity-80">{alerts.length}</span>
          </button>

          <button
            onClick={() => setActiveFilter('critical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'critical'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
            <span>Critical & IoT</span>
            <span className="text-[10px] opacity-80">
              {alerts.filter((a) => a.category === 'critical').length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('freshness')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'freshness'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fea619]"></span>
            <span>Freshness</span>
            <span className="text-[10px] opacity-80">
              {alerts.filter((a) => a.category === 'freshness').length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('pickup')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'pickup'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00652c]"></span>
            <span>NGO Pickups</span>
            <span className="text-[10px] opacity-80">
              {alerts.filter((a) => a.category === 'pickup').length}
            </span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl p-6 border border-[#e5e7eb]">
          <div className="w-14 h-14 rounded-full bg-[#ebf7ee] text-[#00652c] flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[32px]">task_alt</span>
          </div>
          <h3 className="text-base font-bold text-[#141b2b] font-headline">All Caught Up!</h3>
          <p className="text-xs text-[#4e5a53] max-w-xs mt-1 mb-4">
            Cold storage nodes are balanced, perishable batches are assigned, and dispatches are moving smoothly.
          </p>
          <button
            onClick={() => {
              onResetAlerts();
              showToast('Demo notifications reloaded');
            }}
            className="px-4 py-2 bg-[#f1f3ff] text-[#00652c] font-bold text-xs rounded-xl hover:bg-[#e1e8fd] transition-colors"
          >
            Reload Demo Activity
          </button>
        </div>
      ) : (
        /* Notification Feed List (Matching Screenshot 3) */
        <div className="space-y-3">
          {filteredAlerts.map((alertItem) => {
            const isCritical = alertItem.category === 'critical';
            const isFreshness = alertItem.category === 'freshness';
            const isPickup = alertItem.category === 'pickup';

            return (
              <article
                key={alertItem.id}
                onClick={() => onToggleRead(alertItem.id)}
                className={`p-4 rounded-3xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] border transition-all cursor-pointer bg-white relative ${
                  alertItem.unread ? 'border-[#dce2f7]' : 'border-[#e5e7eb] opacity-85'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Category Icon Iconography */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCritical
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : isFreshness
                        ? 'bg-[#ffddb8] text-[#855300]'
                        : 'bg-[#ebf7ee] text-[#00652c]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isCritical ? 'ac_unit' : isFreshness ? 'timer' : 'local_shipping'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {alertItem.unread && (
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isCritical ? 'bg-[#ba1a1a]' : isFreshness ? 'bg-[#fea619]' : 'bg-[#00652c]'
                            }`}
                          ></span>
                        )}
                        <h2 className="text-xs font-bold text-[#141b2b] truncate font-headline">
                          {alertItem.title}
                        </h2>
                      </div>

                      {alertItem.statusBadge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isCritical
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : isFreshness
                              ? 'bg-[#ffddb8] text-[#855300]'
                              : 'bg-[#ebf7ee] text-[#00652c]'
                          }`}
                        >
                          {alertItem.statusBadge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#3f493f] leading-snug mb-2.5">
                      {alertItem.description}
                    </p>

                    {/* Driver ETA strip for pickup notifications */}
                    {isPickup && alertItem.ticketId && (
                      <div className="bg-[#f1f3ff] p-2 rounded-xl flex items-center justify-between mb-2.5 text-xs">
                        <div className="flex items-center gap-1.5 text-[#00652c] font-semibold">
                          <span className="material-symbols-outlined text-[16px]">near_me</span>
                          <span>ETA: 22 mins • Bay 03</span>
                        </div>
                        <span className="text-[#6f7a6e] font-mono">OTP: 4091</span>
                      </div>
                    )}

                    {/* Card Footer Controls */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#e5e7eb]/60">
                      <span className="text-[10px] text-[#6f7a6e] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">sensors</span>
                        {alertItem.timestamp} • {alertItem.source}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDismissAlert(alertItem.id);
                            showToast('Alert dismissed');
                          }}
                          className="px-2 py-1 text-[11px] text-[#6f7a6e] hover:text-[#141b2b] font-semibold rounded-lg hover:bg-[#f1f3ff] transition-colors"
                        >
                          Dismiss
                        </button>

                        {/* Deep link Action Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(alertItem);
                          }}
                          className={`px-3 py-1 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1 transition-all ${
                            isCritical
                              ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                              : isFreshness
                              ? 'bg-[#855300] text-white hover:bg-[#653e00]'
                              : 'bg-[#00652c] text-white hover:bg-[#15803d]'
                          }`}
                        >
                          <span>
                            {isCritical
                              ? 'View Log'
                              : isFreshness
                              ? 'Expedite Dispatch'
                              : 'Track Live'}
                          </span>
                          <span className="material-symbols-outlined text-[13px]">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
