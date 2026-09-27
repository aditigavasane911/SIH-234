import React, { useState } from 'react';
import { ScreenId } from '../types';

interface SustainabilityDashboardProps {
  totalKgSaved: number;
  totalCO2eTons: number;
  mealsRedirected: number;
  onOpenCertificate: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SustainabilityDashboardScreen: React.FC<SustainabilityDashboardProps> = ({
  totalKgSaved,
  totalCO2eTons,
  mealsRedirected,
  onOpenCertificate,
  onNavigate,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'this_month' | 'quarter' | 'annual'>('this_month');

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#00652c] via-[#15803d] to-[#00210a] text-white rounded-3xl p-5 shadow-lg shadow-[#00652c]/20 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#95f8a7] animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wide uppercase text-white">
              Verified ESG Ledger
            </span>
          </div>
          <span className="text-xs font-semibold text-white/80">Cycle #B-2025</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold font-headline">Circular Impact Ledger</h2>
          <p className="text-xs text-white/90">
            Real-time carbon accounting and zero organic waste diversion audit.
          </p>
        </div>

        {/* Period Selector Chips */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-white/20">
          {(['this_month', 'quarter', 'annual'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedPeriod === p
                  ? 'bg-white text-[#00652c] shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {p === 'this_month' ? 'September 2026' : p === 'quarter' ? 'Q3 2026' : 'Fiscal 2025-26'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Primary ESG Metrics Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Metric 1: KG Rescued */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4e5a53] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Food Rescued</span>
            <span className="material-symbols-outlined text-[20px] text-[#00652c]">inventory_2</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#141b2b] font-headline">
              {totalKgSaved.toLocaleString()}{' '}
              <span className="text-xs font-normal text-[#6f7a6e]">kg</span>
            </div>
            <p className="text-[10px] text-[#00652c] font-semibold mt-0.5">
              ↑ 18.4% vs last period
            </p>
          </div>
        </div>

        {/* Metric 2: CO2e Offset */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4e5a53] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">CO2e Offset</span>
            <span className="material-symbols-outlined text-[20px] text-[#00652c]">eco</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#00652c] font-headline">
              {totalCO2eTons}{' '}
              <span className="text-xs font-normal text-[#6f7a6e]">Tons</span>
            </div>
            <p className="text-[10px] text-[#00652c] font-semibold mt-0.5">
              Scope 3 Methane Averted
            </p>
          </div>
        </div>

        {/* Metric 3: Meals Redirected */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4e5a53] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Meals Provided</span>
            <span className="material-symbols-outlined text-[20px] text-[#855300]">restaurant</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#855300] font-headline">
              {mealsRedirected.toLocaleString()}
            </div>
            <p className="text-[10px] text-[#4e5a53] font-medium mt-0.5">
              To 6 Nashik Relief Kitchens
            </p>
          </div>
        </div>

        {/* Metric 4: Soil Restitution */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4e5a53] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Soil Restitution</span>
            <span className="material-symbols-outlined text-[20px] text-[#fea619]">compost</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#141b2b] font-headline">
              +380 <span className="text-xs font-normal text-[#6f7a6e]">kg</span>
            </div>
            <p className="text-[10px] text-[#00652c] font-semibold mt-0.5">
              Enriched Organic Compost
            </p>
          </div>
        </div>
      </div>

      {/* Official ESG Certificate CTA Card */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#00652c]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#141b2b] font-headline">
              Audit-Ready ESG Certificate
            </h3>
            <p className="text-xs text-[#4e5a53] mt-0.5">
              SEBI BRSR & ISO 14064 verified scope 3 greenhouse gas avoidance certificate.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCertificate}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 shrink-0 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>View ESG Certificate</span>
        </button>
      </div>

      {/* Circular Lifecycle Breakdown */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#141b2b] font-headline">
              Zero-Waste Diversion Pathways
            </h3>
            <p className="text-xs text-[#4e5a53]">
              100% trace of organic surplus distribution streams.
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-xs font-bold">
            98.2% Total
          </span>
        </div>

        {/* Stacked Bar Representation */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#f1f3ff]">
          <div className="bg-[#00652c] h-full" style={{ width: '68%' }} title="Human Consumption"></div>
          <div className="bg-[#fea619] h-full" style={{ width: '22%' }} title="Biogas Clean Energy"></div>
          <div className="bg-[#79db8d] h-full" style={{ width: '10%' }} title="Farm Compost"></div>
        </div>

        {/* Stream Breakdown Items */}
        <div className="space-y-3 text-xs pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00652c]"></span>
              <div>
                <p className="font-semibold text-[#141b2b]">Human Nutrition Rescue (68%)</p>
                <p className="text-[10px] text-[#6f7a6e]">
                  Delivered to Annapurna Kitchen, Shanti Shelter & Night Shelters
                </p>
              </div>
            </div>
            <span className="font-bold text-[#141b2b]">2,610 kg</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#fea619]"></span>
              <div>
                <p className="font-semibold text-[#141b2b]">Biogas & Clean Energy Upcycle (22%)</p>
                <p className="text-[10px] text-[#6f7a6e]">
                  Processed at GreenCycle Biogas Unit (Digester #3)
                </p>
              </div>
            </div>
            <span className="font-bold text-[#141b2b]">845 kg</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#79db8d]"></span>
              <div>
                <p className="font-semibold text-[#141b2b]">Vineyard Soil Restitution (10%)</p>
                <p className="text-[10px] text-[#6f7a6e]">
                  Returned as organic compost to 6 partner farms in Nashik
                </p>
              </div>
            </div>
            <span className="font-bold text-[#141b2b]">385 kg</span>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links to Badges & Leaderboard and Subscription */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => onNavigate('leaderboard')}
          className="p-3.5 rounded-2xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3ff] text-left flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855300] text-[22px]">military_tech</span>
            <div>
              <p className="text-xs font-bold text-[#141b2b]">Public Leaderboard</p>
              <p className="text-[10px] text-[#6f7a6e]">Rank #2 in Nashik</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#6f7a6e]">chevron_right</span>
        </button>

        <button
          onClick={() => onNavigate('subscription')}
          className="p-3.5 rounded-2xl bg-white border border-[#e5e7eb] hover:bg-[#f1f3ff] text-left flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00652c] text-[22px]">auto_graph</span>
            <div>
              <p className="text-xs font-bold text-[#141b2b]">Upgrade ESG</p>
              <p className="text-[10px] text-[#6f7a6e]">Audit Reporting</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#6f7a6e]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
