import React from 'react';
import { ScreenId } from '../types';

interface SplashScreenProps {
  onGetStarted: () => void;
  onCreateAccount: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onGetStarted,
  onCreateAccount,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ebf7ee] via-[#f9f9ff] to-white flex flex-col justify-between px-6 py-10 max-w-lg mx-auto">
      {/* Top Brand Pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-xs border border-[#dce2f7]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00652c] animate-pulse"></span>
          <span className="text-xs font-bold text-[#00652c] tracking-wide uppercase">
            FreshoFarm Grid v2.4
          </span>
        </div>
        <span className="text-xs font-semibold text-[#4e5a53] flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          Nashik Hub
        </span>
      </div>

      {/* Hero Visual & Branding */}
      <div className="flex flex-col items-center text-center my-auto py-8">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#00652c] to-[#15803d] flex items-center justify-center shadow-xl shadow-[#00652c]/20 transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="material-symbols-outlined text-[52px] text-white">agriculture</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#fea619] text-white flex items-center justify-center shadow-md ring-2 ring-white">
            <span className="material-symbols-outlined text-[20px]">eco</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#141b2b] tracking-tight font-headline">
          FreshoFarm
        </h1>
        <p className="text-sm font-semibold text-[#00652c] mt-1 uppercase tracking-wider">
          Circular Food Surplus & ESG Redistribution
        </p>
        <p className="text-xs text-[#4e5a53] max-w-xs mt-3 leading-relaxed">
          AI-powered bridge connecting institutional kitchens, local relief organizations, and green logistics with real-time freshness telemetry.
        </p>

        {/* 3 Pillars Bento Preview */}
        <div className="grid grid-cols-3 gap-2.5 w-full mt-8">
          <div className="bg-white p-3 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </div>
            <span className="text-[11px] font-bold text-[#141b2b]">Kitchens</span>
            <span className="text-[9px] text-[#6f7a6e] mt-0.5">AI Freshness</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-[#ffddb8] text-[#855300] flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            </div>
            <span className="text-[11px] font-bold text-[#141b2b]">NGOs</span>
            <span className="text-[9px] text-[#6f7a6e] mt-0.5">Zero-Hunger</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-[#dce2f7] text-[#00652c] flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="text-[11px] font-bold text-[#141b2b]">Logistics</span>
            <span className="text-[9px] text-[#6f7a6e] mt-0.5">Eco Cold-Chain</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onGetStarted}
          className="w-full h-13 rounded-2xl bg-[#00652c] hover:bg-[#15803d] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,101,44,0.3)] flex items-center justify-center gap-2 transition-all"
        >
          <span>Welcome Back (Sign In)</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          onClick={onCreateAccount}
          className="w-full h-12 rounded-2xl bg-white hover:bg-[#f1f3ff] text-[#141b2b] font-semibold text-xs border border-[#becabc] flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Create New Organization Account</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6f7a6e] pt-1">
          <span className="material-symbols-outlined text-[13px] text-[#00652c]">verified</span>
          <span>FSSAI Certified • ESG Scope 3 Ledger • 100% Zero-Waste</span>
        </div>
      </div>
    </div>
  );
};
