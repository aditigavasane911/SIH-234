import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../mockData';
import { ScreenId } from '../types';

interface SubscriptionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onPlanUpgraded?: (planName: string) => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  onNavigate,
  onPlanUpgraded,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState('institutional_green');
  const [isAnnual, setIsAnnual] = useState(false);
  const [upgradedSuccessMsg, setUpgradedSuccessMsg] = useState<string | null>(null);

  const handleUpgrade = (planName: string) => {
    setUpgradedSuccessMsg(`Congratulations! You have upgraded to ${planName}. Branded ESG reporting & priority routing are now active.`);
    if (onPlanUpgraded) {
      onPlanUpgraded(planName);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Toast Alert */}
      {upgradedSuccessMsg && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">workspace_premium</span>
            <span>{upgradedSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#00652c] to-[#15803d] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#95f8a7]">verified</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">
            SEBI & BRSR Compliant
          </span>
        </div>
        <h2 className="text-xl font-bold font-headline">Enterprise ESG & Green Tier</h2>
        <p className="text-xs text-white/90 mt-1">
          Automate Scope 3 emissions reporting, generate board-ready certificates, and secure priority EV cold-chain pickups.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/20">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-white/60'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              isAnnual ? 'bg-[#95f8a7]' : 'bg-white/30'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                isAnnual ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></div>
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1 ${isAnnual ? 'text-white font-bold' : 'text-white/60'}`}>
            Annual <span className="bg-[#fea619] text-[#2a1700] text-[9px] px-1 rounded font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const displayPrice = isAnnual && plan.price !== 'Free'
            ? plan.id === 'institutional_green' ? '₹3,999' : '₹11,999'
            : plan.price;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer bg-white relative ${
                isSelected
                  ? 'border-[#00652c] shadow-lg ring-1 ring-[#00652c]'
                  : 'border-[#e5e7eb] hover:border-[#becabc]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#fea619] text-[#2a1700] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Most Popular for Kitchens
                </div>
              )}

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#141b2b] font-headline">{plan.name}</h3>
                  <p className="text-xs text-[#4e5a53] mt-0.5">{plan.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#00652c] font-headline">{displayPrice}</span>
                  <span className="text-[10px] text-[#6f7a6e] block">{plan.billingPeriod}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 my-4 pt-3 border-t border-[#e5e7eb] text-xs">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#141b2b]">
                    <span className="w-4 h-4 rounded-full bg-[#ebf7ee] text-[#00652c] flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpgrade(plan.name);
                }}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00652c] hover:bg-[#15803d] text-white shadow-md'
                    : 'bg-[#f1f3ff] hover:bg-[#e1e8fd] text-[#141b2b]'
                }`}
              >
                <span>{plan.price === 'Free' ? 'Current Basic Plan' : `Upgrade to ${plan.name}`}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Regulatory Standards Guarantee */}
      <div className="bg-[#f1f3ff] rounded-2xl p-4 text-center text-xs text-[#4e5a53] space-y-1">
        <p className="font-bold text-[#141b2b]">ISO 14064-1 & SEBI Business Responsibility Compliance</p>
        <p className="text-[11px] text-[#6f7a6e]">
          All carbon offsets and food diversion records are cryptographically verified and exportable to ERP & auditing software.
        </p>
      </div>
    </div>
  );
};
