import React, { useState } from 'react';
import { FoodBatch, ScreenId } from '../types';

interface KitchenDashboardProps {
  batches: FoodBatch[];
  onNavigate: (screen: ScreenId) => void;
  onOpenBatchDetail?: (batch: FoodBatch) => void;
  onConfirmDispatchOtp?: (batchId: string) => void;
}

export const KitchenDashboardScreen: React.FC<KitchenDashboardProps> = ({
  batches,
  onNavigate,
  onConfirmDispatchOtp,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'human' | 'biomass' | 'cold'>('all');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [activeBatchForOtp, setActiveBatchForOtp] = useState<FoodBatch | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const filteredBatches = batches.filter((b) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'human') return b.category === 'Cooked Meals' || b.category === 'Bakery & Dairy';
    if (activeFilter === 'biomass') return b.category === 'Biomass / Trimmings';
    if (activeFilter === 'cold') return b.category === 'Fresh Produce';
    return true;
  });

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeBatchForOtp) {
      if (enteredOtp.trim() === (activeBatchForOtp.otp || '4091')) {
        if (onConfirmDispatchOtp) {
          onConfirmDispatchOtp(activeBatchForOtp.id);
        }
        setIsOtpModalOpen(false);
        setEnteredOtp('');
        showToast('✅ Dispatch OTP Verified! Batch handed over to driver & logged to ESG ledger.');
      } else {
        alert('Invalid OTP. Please check with driver (Demo OTP is 4091).');
      }
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 1. Live Kitchen Feed Banner Card (Matching Screenshot 1) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00652c] via-[#15803d] to-[#79db8d] text-white p-5 shadow-lg shadow-[#00652c]/15">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#95f8a7] animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wide uppercase text-white">
              Live Kitchen Feed
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>FSSAI Grade A+</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div>
            <div className="text-4xl font-extrabold tracking-tight font-headline">96.4%</div>
            <p className="text-xs text-white/90 font-medium mt-0.5">
              Overall Batch Freshness Index
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
            0 Waste Target
          </span>
        </div>
      </div>

      {/* 2. IoT Cold Storage #04 Card (Matching Screenshot 1) */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb]">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">ac_unit</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#141b2b]">IoT Cold Storage #04</h2>
              <p className="text-[11px] text-[#4e5a53]">Indiranagar Central Hub</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-xs font-bold flex items-center gap-1 border border-[#00652c]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00652c]"></span>
            Optimal
          </span>
        </div>

        {/* 3 Metric Pillars */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#f1f3ff] rounded-2xl p-2.5 flex flex-col justify-center">
            <span className="text-[10px] text-[#4e5a53] uppercase font-bold tracking-wider">
              Storage Temp
            </span>
            <span className="text-lg font-bold text-[#00652c] mt-0.5 font-headline">3.8°C</span>
            <span className="text-[10px] text-[#6f7a6e]">Target &lt;4°C</span>
          </div>

          <div className="bg-[#f1f3ff] rounded-2xl p-2.5 flex flex-col justify-center">
            <span className="text-[10px] text-[#4e5a53] uppercase font-bold tracking-wider">
              Humidity
            </span>
            <span className="text-lg font-bold text-[#141b2b] mt-0.5 font-headline">85%</span>
            <span className="text-[10px] text-[#6f7a6e]">Stable</span>
          </div>

          <div className="bg-[#f1f3ff] rounded-2xl p-2.5 flex flex-col justify-center">
            <span className="text-[10px] text-[#4e5a53] uppercase font-bold tracking-wider">
              Uptime
            </span>
            <span className="text-lg font-bold text-[#141b2b] mt-0.5 font-headline">99.4%</span>
            <span className="text-[10px] text-[#00652c] font-semibold">0 anomalies</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Scan CTA Button (Matching Screenshot 1) */}
      <button
        onClick={() => onNavigate('list_surplus')}
        className="w-full h-14 rounded-2xl bg-[#00652c] hover:bg-[#15803d] active:scale-[0.99] text-white flex items-center justify-center gap-2.5 font-bold text-sm shadow-[0_4px_16px_rgba(0,101,44,0.3)] transition-all"
      >
        <span className="material-symbols-outlined text-[24px]">photo_camera</span>
        <span>List New Surplus & AI Scan</span>
      </button>

      {/* Quick Navigation Shortcut Strip */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onNavigate('leaderboard')}
          className="p-3 rounded-2xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3ff] text-left flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ffddb8] text-[#855300] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#141b2b]">Leaderboard</p>
              <p className="text-[10px] text-[#6f7a6e]">Rank #2 • Tier A</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#6f7a6e]">chevron_right</span>
        </button>

        <button
          onClick={() => onNavigate('subscription')}
          className="p-3 rounded-2xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3ff] text-left flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#141b2b]">Upgrade ESG</p>
              <p className="text-[10px] text-[#6f7a6e]">Scope 3 Audits</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#6f7a6e]">chevron_right</span>
        </button>
      </div>

      {/* 4. Active Surplus Batches Header & Filter Strip */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-[#141b2b] font-headline">Active Surplus Batches</h2>
          <span className="text-xs font-semibold text-[#00652c]">
            {filteredBatches.length} Active Listings
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar -mx-1 px-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            All Batches ({batches.length})
          </button>
          <button
            onClick={() => setActiveFilter('human')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === 'human'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            Human Rescue (2)
          </button>
          <button
            onClick={() => setActiveFilter('biomass')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === 'biomass'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            Biogas / Feed (1)
          </button>
          <button
            onClick={() => setActiveFilter('cold')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === 'cold'
                ? 'bg-[#00652c] text-white shadow-xs'
                : 'bg-white text-[#4e5a53] border border-[#e5e7eb] hover:bg-[#f1f3ff]'
            }`}
          >
            Produce (1)
          </button>
        </div>

        {/* Batches Cards List */}
        <div className="space-y-3 mt-2">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-[10px] font-bold">
                      {batch.category === 'Cooked Meals' ? 'Verified Fresh' : 'High Grade'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00652c] text-white text-[10px] font-bold">
                      {batch.aiFreshnessScore}/100 AI Score
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#141b2b] truncate font-headline">
                    {batch.title}
                  </h3>
                  <p className="text-[11px] text-[#4e5a53]">
                    Batch #{batch.batchNumber} • <span className="font-semibold text-[#141b2b]">{batch.volumeKg} kg</span> available
                  </p>
                </div>

                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#f1f3ff] border border-[#e5e7eb]">
                  <img
                    src={batch.imageUrl}
                    alt={batch.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Shelf Life Strip */}
              <div className="rounded-xl bg-[#f1f3ff] p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#141b2b]">
                  <span className="material-symbols-outlined text-[16px] text-[#855300]">timer</span>
                  <span>
                    Shelf-life: <strong className="font-bold">{batch.shelfLifeRemainingHours} hrs</strong> remaining
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#00652c]">
                  {batch.matchedOrg ? 'Auto-matching NGOs' : 'Ready for Biogas/Feed'}
                </span>
              </div>

              {/* Footer row with status & action button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#4e5a53] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#00652c]">
                    device_thermostat
                  </span>
                  Chilled at {batch.storageTempC}°C since prep
                </span>

                <div className="flex items-center gap-1.5">
                  {batch.status === 'matched' && (
                    <button
                      onClick={() => {
                        setActiveBatchForOtp(batch);
                        setIsOtpModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#00652c] text-white text-xs font-bold shadow-xs hover:bg-[#15803d] flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Verify OTP
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('matched_orgs')}
                    className="px-3 py-1.5 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8fd] text-xs font-semibold text-[#141b2b] transition-colors"
                  >
                    Manage Batch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Ecosystem Distribution & Matches (Matching Screenshot 1) */}
      <div className="pt-2">
        <h2 className="text-base font-bold text-[#141b2b] font-headline mb-2.5">
          Ecosystem Distribution & Matches
        </h2>

        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3.5">
          {/* Match 1 */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#141b2b] truncate font-headline">
                  Annapurna Community Kitchen
                </h4>
                <p className="text-[11px] text-[#4e5a53] truncate">
                  Matched for 45kg Rice Batch • En route
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#ebf7ee] text-[#00652c] text-[11px] font-bold shrink-0">
              Claimed
            </span>
          </div>

          {/* Match 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#dce2f7] text-[#00652c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#141b2b] truncate font-headline">
                  GreenCycle Biogas Unit
                </h4>
                <p className="text-[11px] text-[#4e5a53] truncate">
                  Scheduled pickup for veg scrap at 06:00 PM
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#f1f3ff] text-[#4e5a53] text-[11px] font-semibold shrink-0">
              Scheduled
            </span>
          </div>
        </div>
      </div>

      {/* 6. Circular Batch Lifecycle Pipeline (Matching Screenshot 5) */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">recycling</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6f7a6e] block">
                Zero Organic Waste
              </span>
              <span className="text-xs font-bold text-[#141b2b]">98.2% Diverted</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#00652c] text-white text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">bolt</span>
            Target Met
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#f1f3ff] h-2 rounded-full overflow-hidden mb-4">
          <div className="bg-[#00652c] h-full rounded-full" style={{ width: '98.2%' }}></div>
        </div>

        {/* 4 Pipeline Milestones */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00652c] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <span className="font-semibold text-[#141b2b]">1. Harvest & Cold Storage</span>
            </div>
            <span className="text-[#00652c] font-bold text-[11px]">Done</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00652c] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <span className="font-semibold text-[#141b2b]">2. Krishi AI Freshness Audit</span>
            </div>
            <span className="text-[#00652c] font-bold text-[11px]">94/100</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#fea619] text-white flex items-center justify-center text-[10px] animate-pulse">
                •
              </span>
              <span className="font-bold text-[#141b2b]">3. Eco-Routing & Redistribution</span>
            </div>
            <span className="text-[#855300] font-bold text-[11px]">Active Match</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#f1f3ff] text-[#6f7a6e] flex items-center justify-center text-[10px]">
                4
              </span>
              <span className="text-[#6f7a6e]">4. ESG Ledger & Certification</span>
            </div>
            <span className="text-[#6f7a6e] text-[11px]">Pending OTP</span>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && activeBatchForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#dce2f7] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <h3 className="text-sm font-bold text-[#141b2b]">Driver Handover OTP</h3>
              </div>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#6f7a6e]"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-center">
              <p className="text-xs text-[#4e5a53] mb-1">
                Enter 4-digit OTP provided by Driver Ramesh for batch:
              </p>
              <p className="text-xs font-bold text-[#141b2b]">{activeBatchForOtp.title}</p>

              <form onSubmit={handleVerifyOtp} className="mt-4 space-y-3">
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  placeholder="Demo OTP: 4091"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-40 h-12 mx-auto text-center text-xl font-bold tracking-widest rounded-xl bg-[#f1f3ff] border border-[#becabc] focus:border-[#00652c] focus:outline-none"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEnteredOtp(activeBatchForOtp.otp || '4091')}
                    className="flex-1 py-2 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8fd] text-xs font-semibold text-[#00652c]"
                  >
                    Auto-fill (4091)
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-sm"
                  >
                    Confirm Handover
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
