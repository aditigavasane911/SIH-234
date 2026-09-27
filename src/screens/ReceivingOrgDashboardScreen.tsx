import React, { useState } from 'react';
import { RedistributionTicket, ScreenId } from '../types';

interface ReceivingOrgDashboardProps {
  tickets: RedistributionTicket[];
  onAcceptTicket: (ticketId: string) => void;
  onDeclineTicket: (ticketId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ReceivingOrgDashboardScreen: React.FC<ReceivingOrgDashboardProps> = ({
  tickets,
  onAcceptTicket,
  onDeclineTicket,
  onNavigate,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<RedistributionTicket | null>(tickets[0] || null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('Storage Capacity Full Today');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 2500);
  };

  const handleAccept = (ticketId: string) => {
    onAcceptTicket(ticketId);
    showToast('Ticket accepted! Eco-Logistics driver Ramesh notified for immediate dispatch.');
  };

  const handleDeclineSubmit = () => {
    if (selectedTicket) {
      onDeclineTicket(selectedTicket.ticketId);
      setShowDeclineModal(false);
      showToast(`Ticket declined (${declineReason}). Surplus automatically rerouted to next ranked NGO.`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Toast Alert */}
      {actionSuccessMsg && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">verified</span>
            <span>{actionSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Receiving NGO Header Banner */}
      <div className="bg-gradient-to-br from-[#855300] via-[#fea619] to-[#ffddb8] text-white rounded-3xl p-5 shadow-lg shadow-[#855300]/15 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
              Verified Relief Hub • NGO #MH-2981
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Darpan Verified
            </span>
          </div>
          <h2 className="text-xl font-bold font-headline">Annapurna Community Kitchen</h2>
          <p className="text-xs text-white/90 mt-0.5">
            Panchavati Food Relief & Senior Shelter Hub • Nashik
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
            <div className="bg-black/15 rounded-xl p-2">
              <span className="text-base font-bold block">37,125</span>
              <span className="text-[10px] text-white/80">Meals Served</span>
            </div>
            <div className="bg-black/15 rounded-xl p-2">
              <span className="text-base font-bold block">94.2%</span>
              <span className="text-[10px] text-white/80">Cold Chain Safe</span>
            </div>
            <div className="bg-black/15 rounded-xl p-2">
              <span className="text-base font-bold block">1,840 kg</span>
              <span className="text-[10px] text-white/80">Intake (7 Days)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Intake Action */}
      <button
        onClick={() => setShowQrScanner(true)}
        className="w-full h-12 rounded-2xl bg-white border border-[#becabc] text-[#141b2b] hover:bg-[#f1f3ff] font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
      >
        <span className="material-symbols-outlined text-[20px] text-[#00652c]">qr_code_scanner</span>
        <span>Scan Driver Handover QR Code</span>
      </button>

      {/* Incoming Tickets Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#141b2b] font-headline">
              Incoming Surplus Tickets
            </h3>
            <p className="text-xs text-[#4e5a53]">
              Review verified kitchen surplus batches awaiting your acceptance.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#ebf7ee] text-[#00652c] text-xs font-bold">
            {tickets.length} Available
          </span>
        </div>

        {tickets.map((ticket) => {
          const isAccepted = ticket.status === 'accepted' || ticket.status === 'in_transit';
          const isDeclined = ticket.status === 'declined';

          return (
            <div
              key={ticket.ticketId}
              className={`p-4 rounded-3xl border-2 bg-white shadow-[0_2px_8px_rgba(17,24,39,0.04)] transition-all ${
                isAccepted
                  ? 'border-[#00652c] bg-[#ebf7ee]/30'
                  : isDeclined
                  ? 'border-gray-200 opacity-60'
                  : 'border-[#fea619]'
              }`}
            >
              {/* Ticket Top Meta */}
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-[#e5e7eb]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-[#00652c]">
                      #{ticket.ticketId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-[10px] font-bold">
                      Grade {ticket.freshnessScore}/100
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#141b2b] mt-1 font-headline">
                    {ticket.batchTitle}
                  </h4>
                  <p className="text-[11px] text-[#4e5a53]">From: {ticket.fromKitchen}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                      isAccepted
                        ? 'bg-[#00652c] text-white'
                        : isDeclined
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-[#fea619] text-white'
                    }`}
                  >
                    {isAccepted ? 'Accepted • In Transit' : isDeclined ? 'Declined' : 'Awaiting Review'}
                  </span>
                  <span className="text-[10px] text-[#6f7a6e] block mt-1">ETA: {ticket.etaMinutes} mins</span>
                </div>
              </div>

              {/* Logistics & Driver Details */}
              <div className="bg-[#f1f3ff] rounded-2xl p-3 text-xs space-y-1.5 my-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#6f7a6e]">Designated Transport:</span>
                  <span className="font-semibold text-[#141b2b]">{ticket.vehicleNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6f7a6e]">Assigned Driver:</span>
                  <span className="font-semibold text-[#00652c]">{ticket.driverName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6f7a6e]">Pickup Location:</span>
                  <span className="font-semibold text-[#141b2b]">{ticket.pickupBay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6f7a6e]">Verification OTP:</span>
                  <span className="font-mono font-bold text-[#00652c] tracking-wider">{ticket.otp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1">
                {isAccepted ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('logistics_dashboard')}
                      className="flex-1 py-2.5 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">map</span>
                      Track Assigned Driver on Live Map
                    </button>
                    <button
                      onClick={() => onNavigate('sustainability_dashboard')}
                      className="px-3 py-2.5 rounded-xl bg-white border border-[#becabc] text-xs font-semibold text-[#141b2b]"
                    >
                      ESG Ledger
                    </button>
                  </div>
                ) : isDeclined ? (
                  <p className="text-xs text-center text-[#6f7a6e] italic py-1">
                    Ticket declined and rerouted to alternate regional food bank.
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowDeclineModal(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-white border border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ffdad6]/30 text-xs font-semibold transition-colors"
                    >
                      Decline / Reroute
                    </button>
                    <button
                      onClick={() => handleAccept(ticket.ticketId)}
                      className="flex-1 py-2.5 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      Accept & Dispatch
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Decline Reroute Modal */}
      {showDeclineModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#dce2f7]">
            <h3 className="text-sm font-bold text-[#141b2b]">Decline & Auto-Reroute Ticket</h3>
            <p className="text-xs text-[#4e5a53] mt-1">
              Specify reason to assist the AI router in finding the next closest recipient:
            </p>

            <div className="space-y-2 my-4">
              {[
                'Storage Capacity Full Today',
                'Outside Daily Kitchen Consumption Hours',
                'Requires Immediate Refrigeration We Lack',
                'Dietary Criteria Mismatch'
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setDeclineReason(reason)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    declineReason === reason
                      ? 'border-[#00652c] bg-[#ebf7ee] text-[#00652c]'
                      : 'border-[#e5e7eb] bg-white text-[#4e5a53]'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="flex-1 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-[#141b2b]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="flex-1 py-2 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold shadow-xs"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Handover QR Intake Scanner Simulation Modal */}
      {showQrScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#dce2f7] text-center">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e7eb]">
              <span className="text-xs font-bold text-[#00652c] uppercase tracking-wider">
                Intake Verification
              </span>
              <button
                onClick={() => setShowQrScanner(false)}
                className="w-7 h-7 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#6f7a6e]"
              >
                ✕
              </button>
            </div>

            <div className="my-4 relative w-48 h-48 mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border-2 border-[#00652c]">
              <div className="absolute inset-x-2 top-2 h-0.5 bg-[#95f8a7] animate-pulse"></div>
              <span className="material-symbols-outlined text-[64px] text-white/50">qr_code_scanner</span>
            </div>

            <p className="text-xs font-semibold text-[#141b2b]">
              Point camera at Driver's Digital Handover Pass
            </p>
            <p className="text-[11px] text-[#6f7a6e] mt-0.5">
              Instantly logs verified weight and updates both organizations' ESG audit trails.
            </p>

            <button
              onClick={() => {
                setShowQrScanner(false);
                showToast('🎉 QR Scanned & Intake Verified! Receipt #390 recorded into ESG ledger.');
              }}
              className="w-full py-2.5 mt-4 rounded-xl bg-[#00652c] text-white font-bold text-xs shadow-sm hover:bg-[#15803d]"
            >
              Simulate Successful QR Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
