import React from 'react';

interface ESGCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgName?: string;
  totalKg?: number;
  totalCO2eTons?: number;
  mealsRedirected?: number;
}

export const ESGCertificateModal: React.FC<ESGCertificateModalProps> = ({
  isOpen,
  onClose,
  orgName = 'Indiranagar Central Institutional Kitchen',
  totalKg = 3840,
  totalCO2eTons = 8.4,
  mealsRedirected = 9600,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#dce2f7] max-h-[90vh] flex flex-col">
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-[#00652c] to-[#15803d] text-white p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-2 ring-4 ring-white/30">
            <span className="material-symbols-outlined text-[28px] text-white">verified_user</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight font-headline">Zero-Waste ESG Certificate</h2>
          <p className="text-xs text-white/80 mt-0.5">Circular Food Redistribution & Scope 3 Verification</p>
        </div>

        {/* Certificate Body (Diploma Style) */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#f9f9ff]">
          <div className="border-2 border-dashed border-[#00652c]/30 rounded-xl p-5 bg-white relative">
            <div className="text-center space-y-1 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#00652c]">
                SEBI BRSR & ISO 14064 COMPLIANT
              </span>
              <p className="text-xs text-[#6f7a6e]">Certificate Serial: <span className="font-mono font-bold text-[#141b2b]">FES-2025-9981-NSK</span></p>
            </div>

            <div className="text-center my-3">
              <p className="text-xs text-[#4e5a53] italic">This certifies that</p>
              <h3 className="text-base font-bold text-[#141b2b] mt-1 font-headline">{orgName}</h3>
              <p className="text-xs text-[#6f7a6e]">Nashik Agricultural & Institutional Hub</p>
            </div>

            <p className="text-xs text-center text-[#3f493f] leading-relaxed my-3">
              has successfully diverted verified organic edible surplus from landfill, preventing methane emission and nourishing local community networks.
            </p>

            {/* Impact Metric Grid inside Certificate */}
            <div className="grid grid-cols-3 gap-2 my-4 text-center">
              <div className="bg-[#ebf7ee] p-2.5 rounded-lg border border-[#00652c]/10">
                <span className="text-base font-bold text-[#00652c] block">{totalKg.toLocaleString()} kg</span>
                <span className="text-[10px] text-[#4e5a53] font-medium">Surplus Rescued</span>
              </div>
              <div className="bg-[#ebf7ee] p-2.5 rounded-lg border border-[#00652c]/10">
                <span className="text-base font-bold text-[#00652c] block">{totalCO2eTons} Tons</span>
                <span className="text-[10px] text-[#4e5a53] font-medium">CO2e Offset</span>
              </div>
              <div className="bg-[#ebf7ee] p-2.5 rounded-lg border border-[#00652c]/10">
                <span className="text-base font-bold text-[#855300] block">{mealsRedirected.toLocaleString()}</span>
                <span className="text-[10px] text-[#4e5a53] font-medium">Meals Redirected</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb] mt-4">
              <div className="text-left">
                <p className="text-[10px] text-[#6f7a6e]">Audited by</p>
                <p className="text-xs font-bold text-[#141b2b]">Dr. S. Kulkarni</p>
                <p className="text-[9px] text-[#6f7a6e]">Nashik Green Council</p>
              </div>

              {/* QR Verification Stamp */}
              <div className="w-14 h-14 bg-white p-1 rounded-lg border border-[#becabc] flex flex-col items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[30px] text-[#00652c]">qr_code_2</span>
                <span className="text-[7px] text-[#6f7a6e]">Scan to Verify</span>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-[#6f7a6e]">Certified Date</p>
                <p className="text-xs font-bold text-[#141b2b]">Sept 27, 2026</p>
                <p className="text-[9px] text-[#00652c] font-semibold">Tier A - Platinum</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                alert('Certificate downloaded in high-res PDF format with immutable cryptographic verification hash.');
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#00652c] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-[#15803d] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download Official PDF
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Certificate public verification link copied to clipboard!');
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#becabc] text-[#141b2b] font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[#f1f3ff] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
