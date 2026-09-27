import React, { useState } from 'react';
import { RedistributionTicket, ScreenId } from '../types';

interface LogisticsDashboardProps {
  tickets: RedistributionTicket[];
  onMarkDelivered: (ticketId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LogisticsDashboardScreen: React.FC<LogisticsDashboardProps> = ({
  tickets,
  onMarkDelivered,
  onNavigate,
}) => {
  const [activeTicketId, setActiveTicketId] = useState<string>(tickets[0]?.ticketId || 'TK-4091');
  const [inputOtp, setInputOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const activeTicket = tickets.find((t) => t.ticketId === activeTicketId) || tickets[0];
  const isAlreadyDelivered = activeTicket?.status === 'delivered';

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOtp.trim() === (activeTicket?.otp || '4091')) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        onMarkDelivered(activeTicket.ticketId);
        setSuccessToast('🎉 Stop marked Delivered! 45kg produce & 72kg CO2e logged to ESG ledger.');
      }, 600);
    } else {
      alert('Incorrect Handover OTP. (Demo OTP: 4091)');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">verified</span>
            <span>{successToast}</span>
          </div>
        </div>
      )}

      {/* Driver & Vehicle Header Card */}
      <div className="bg-gradient-to-r from-[#293040] to-[#141b2b] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#95f8a7]">
              <span className="material-symbols-outlined text-[24px]">electric_car</span>
            </div>
            <div>
              <h2 className="text-sm font-bold font-headline">EcoFleet Nashik EV-09</h2>
              <p className="text-[11px] text-white/70">Driver: Ramesh Kumar • KA-51-AB-1234</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#00652c] text-[#95f8a7] text-[10px] font-bold border border-[#95f8a7]/30">
            Active Shift
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold">Today's Cargo</span>
            <p className="text-sm font-bold text-white mt-0.5">73 kg</p>
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold">Stops Remaining</span>
            <p className="text-sm font-bold text-[#fea619] mt-0.5">
              {isAlreadyDelivered ? '0 Stops' : '1 Stop'}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold">Cold Storage Unit</span>
            <p className="text-sm font-bold text-[#95f8a7] mt-0.5">3.4°C</p>
          </div>
        </div>
      </div>

      {/* Live Interactive Map Route Visualization */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00652c] animate-ping"></span>
            <h3 className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
              Live Eco-Route Navigation
            </h3>
          </div>
          <span className="text-xs font-bold text-[#00652c]">
            {isAlreadyDelivered ? 'Delivered' : 'ETA: 18 mins • On Time'}
          </span>
        </div>

        {/* Stylized SVG Map of Nashik Waypoints */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#e9edff] border border-[#becabc] flex items-center justify-center p-2">
          {/* Simulated Street Grid SVG */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 400 200">
            <line x1="20" y1="40" x2="380" y2="40" stroke="#becabc" strokeWidth="3" />
            <line x1="20" y1="100" x2="380" y2="100" stroke="#becabc" strokeWidth="4" />
            <line x1="20" y1="160" x2="380" y2="160" stroke="#becabc" strokeWidth="3" />
            <line x1="60" y1="10" x2="60" y2="190" stroke="#becabc" strokeWidth="3" />
            <line x1="160" y1="10" x2="160" y2="190" stroke="#becabc" strokeWidth="4" />
            <line x1="280" y1="10" x2="280" y2="190" stroke="#becabc" strokeWidth="4" />
            <line x1="340" y1="10" x2="340" y2="190" stroke="#becabc" strokeWidth="2" />

            {/* River Godavari graphic */}
            <path
              d="M 10 70 Q 120 120 220 60 T 390 90"
              fill="none"
              stroke="#79db8d"
              strokeWidth="12"
              opacity="0.5"
            />

            {/* Active GPS Route Trace Line */}
            <path
              d="M 70 100 L 160 100 L 160 50 L 280 50"
              fill="none"
              stroke="#00652c"
              strokeWidth="5"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Waypoint 1: Origin Kitchen */}
          <div className="absolute top-[82px] left-[52px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#00652c] text-white flex items-center justify-center shadow-md ring-2 ring-white">
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
            </div>
            <span className="bg-white/90 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-1 text-[#141b2b]">
              Hub #04
            </span>
          </div>

          {/* Active EV Van Pin (Pulsing) */}
          <div className="absolute top-[34px] left-[144px] flex flex-col items-center animate-bounce">
            <div className="w-9 h-9 rounded-full bg-[#fea619] text-white flex items-center justify-center shadow-lg ring-4 ring-[#fea619]/30">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <span className="bg-[#141b2b] text-[#95f8a7] text-[8px] font-bold px-1 rounded shadow-xs mt-0.5">
              Tata Ace EV
            </span>
          </div>

          {/* Waypoint 2: Destination NGO */}
          <div className="absolute top-[32px] right-[100px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-md ring-2 ring-white">
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
            </div>
            <span className="bg-white/90 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-1 text-[#141b2b]">
              Annapurna
            </span>
          </div>
        </div>

        {/* Live Route Milestones */}
        <div className="space-y-3 pt-1">
          {/* Stop 1 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#00652c] text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <div className="w-0.5 h-8 bg-[#00652c]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#141b2b]">Pickup Completed</h4>
                <span className="text-[10px] text-[#00652c] font-semibold">Bay 03</span>
              </div>
              <p className="text-[11px] text-[#4e5a53] truncate">
                Indiranagar Central Kitchen • 45kg Basmati Rice
              </p>
            </div>
          </div>

          {/* Stop 2 (Active Delivery) */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isAlreadyDelivered
                    ? 'bg-[#00652c] text-white'
                    : 'bg-[#fea619] text-white animate-pulse'
                }`}
              >
                {isAlreadyDelivered ? '✓' : '2'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#141b2b]">Drop-off & Handover</h4>
                <span className="text-[10px] font-bold text-[#855300]">
                  {isAlreadyDelivered ? 'Verified Delivered' : 'Pending OTP Verification'}
                </span>
              </div>
              <p className="text-[11px] text-[#4e5a53] truncate">
                Annapurna Community Kitchen • Panchavati Hub
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Handover Verification Card */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb]">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e5e7eb]">
          <div>
            <h3 className="text-sm font-bold text-[#141b2b] font-headline">
              Complete Delivery Verification
            </h3>
            <p className="text-xs text-[#4e5a53]">
              Confirm handover with NGO manager at destination dock.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#00652c]">
            {activeTicket?.ticketId}
          </span>
        </div>

        {isAlreadyDelivered ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ebf7ee] text-[#00652c] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">task_alt</span>
            </div>
            <h4 className="text-sm font-bold text-[#141b2b]">Delivery Successfully Certified</h4>
            <p className="text-xs text-[#4e5a53] max-w-xs mx-auto">
              45kg Basmati Rice securely delivered at 3.4°C. ESG carbon reduction ledger has been credited.
            </p>
            <button
              onClick={() => onNavigate('sustainability_dashboard')}
              className="px-4 py-2.5 rounded-xl bg-[#00652c] text-white text-xs font-bold shadow-xs hover:bg-[#15803d] transition-all"
            >
              View Updated Sustainability Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeliverySubmit} className="space-y-3">
            <div className="bg-[#f1f3ff] rounded-2xl p-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6f7a6e] uppercase tracking-wider block">
                  Recipient Contact
                </span>
                <span className="font-bold text-[#141b2b]">Mrs. Sharma (Annapurna Intake)</span>
              </div>
              <button
                type="button"
                onClick={() => setInputOtp(activeTicket?.otp || '4091')}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#becabc] text-[11px] font-semibold text-[#00652c]"
              >
                Auto-fill OTP (4091)
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#141b2b] mb-1">
                Enter Handover OTP from Receiving Staff:
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                placeholder="e.g. 4091"
                className="w-full h-12 text-center text-lg font-bold font-mono tracking-widest rounded-xl bg-white border border-[#becabc] focus:border-[#00652c] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full h-12 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              {isVerifying ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm Handover & Update Sustainability Ledger</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
