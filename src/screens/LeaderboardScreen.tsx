import React, { useState } from 'react';
import { LeaderboardEntry, ScreenId } from '../types';

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onNavigate: (screen: ScreenId) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  entries,
  onNavigate,
}) => {
  const [isOptedIn, setIsOptedIn] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'hospitality' | 'corporate' | 'campus'>('all');

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Donor Tier Header Card */}
      <div className="bg-gradient-to-r from-[#fea619] via-[#855300] to-[#2a1700] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
            Current Tier: Platinum
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-[#ffddb8]">
            <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
            <span>Tier A Certified</span>
          </div>
        </div>

        <h2 className="text-xl font-bold font-headline">Zero-Waste Champion</h2>
        <p className="text-xs text-white/80 mt-0.5">
          Top 3% of institutional dining facilities in Maharashtra circular food network.
        </p>

        {/* Upgrade Callout inside Banner */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
          <span className="text-[11px] text-white/90">Want branded ESG badges on social & PR?</span>
          <button
            onClick={() => onNavigate('subscription')}
            className="px-3 py-1 rounded-xl bg-white text-[#855300] font-bold text-xs hover:bg-[#ffddb8] transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <h3 className="text-sm font-bold text-[#141b2b] font-headline">Earned Facility Badges</h3>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-[#ebf7ee] rounded-2xl p-2.5 flex flex-col items-center border border-[#00652c]/15">
            <span className="material-symbols-outlined text-[24px] text-[#00652c]">eco</span>
            <span className="text-[10px] font-bold text-[#141b2b] mt-1 leading-tight">Methane Stopper</span>
          </div>

          <div className="bg-[#ffddb8]/40 rounded-2xl p-2.5 flex flex-col items-center border border-[#855300]/15">
            <span className="material-symbols-outlined text-[24px] text-[#855300]">volunteer_activism</span>
            <span className="text-[10px] font-bold text-[#141b2b] mt-1 leading-tight">10k Meals Hero</span>
          </div>

          <div className="bg-[#dce2f7]/60 rounded-2xl p-2.5 flex flex-col items-center border border-[#00652c]/15">
            <span className="material-symbols-outlined text-[24px] text-[#00652c]">ac_unit</span>
            <span className="text-[10px] font-bold text-[#141b2b] mt-1 leading-tight">Cold-Chain Ace</span>
          </div>

          <div className="bg-[#f1f3ff] rounded-2xl p-2.5 flex flex-col items-center border border-[#becabc]/30">
            <span className="material-symbols-outlined text-[24px] text-[#00652c]">verified</span>
            <span className="text-[10px] font-bold text-[#141b2b] mt-1 leading-tight">98% Diverted</span>
          </div>
        </div>
      </div>

      {/* Public Opt-in Toggle */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[22px] text-[#00652c]">public</span>
          <div>
            <p className="text-xs font-bold text-[#141b2b]">Public Leaderboard Visibility</p>
            <p className="text-[10px] text-[#6f7a6e]">Visible to municipal green auditors and city rankings</p>
          </div>
        </div>
        <button
          onClick={() => setIsOptedIn(!isOptedIn)}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
            isOptedIn ? 'bg-[#00652c]' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
              isOptedIn ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></div>
        </button>
      </div>

      {/* Leaderboard Table List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#141b2b] font-headline">
            Nashik Circular Food Leaderboard
          </h3>
          <span className="text-xs text-[#6f7a6e]">Updated Daily</span>
        </div>

        <div className="space-y-2">
          {entries.map((entry) => {
            const isRank1 = entry.rank === 1;
            const isRank2 = entry.rank === 2;
            const isRank3 = entry.rank === 3;

            return (
              <div
                key={entry.rank}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  entry.isCurrentUser
                    ? 'border-[#00652c] bg-[#ebf7ee]/50 shadow-sm'
                    : 'border-[#e5e7eb] bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isRank1
                        ? 'bg-[#fea619] text-white shadow-xs'
                        : isRank2
                        ? 'bg-[#79db8d] text-[#00210a]'
                        : isRank3
                        ? 'bg-[#ffddb8] text-[#855300]'
                        : 'bg-[#f1f3ff] text-[#4e5a53]'
                    }`}
                  >
                    #{entry.rank}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#141b2b] truncate font-headline">
                        {entry.name}
                      </h4>
                      {entry.isCurrentUser && (
                        <span className="px-1.5 py-0.5 rounded bg-[#00652c] text-white text-[9px] font-bold">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#6f7a6e] truncate">
                      {entry.type} • {entry.location}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#00652c] block">
                    {entry.kgDiverted.toLocaleString()} kg
                  </span>
                  <span className="text-[10px] text-[#4e5a53] block">
                    {entry.percentDiverted}% Diverted
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscription Call to Action */}
      <div className="bg-[#f1f3ff] rounded-3xl p-5 border border-[#becabc] text-center space-y-2 mt-2">
        <span className="material-symbols-outlined text-[32px] text-[#00652c]">auto_graph</span>
        <h4 className="text-sm font-bold text-[#141b2b] font-headline">
          Boost Your Sustainability Standing
        </h4>
        <p className="text-xs text-[#4e5a53] max-w-xs mx-auto">
          Institutional Green Pro unlocks automated corporate ESG reporting, branded digital badges, and sponsored placement.
        </p>
        <button
          onClick={() => onNavigate('subscription')}
          className="px-5 py-2.5 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-md transition-all inline-flex items-center gap-1.5"
        >
          <span>Explore Upgrade Tiers</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
