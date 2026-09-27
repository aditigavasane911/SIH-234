import React, { useState } from 'react';
import { RedistributionTicket, ScreenId } from '../types';

interface MatchedOrgsScreenProps {
  onTicketConfirmed: (ticket: RedistributionTicket) => void;
  onNavigate: (screen: ScreenId) => void;
  selectedBatchTitle?: string;
  selectedBatchVolumeKg?: number;
}

export const MatchedOrgsScreen: React.FC<MatchedOrgsScreenProps> = ({
  onTicketConfirmed,
  onNavigate,
  selectedBatchTitle = 'Cooked Basmati Rice & Lentils',
  selectedBatchVolumeKg = 45,
}) => {
  const [selectedOrgId, setSelectedOrgId] = useState('org-1');
  const [isTicketGenerated, setIsTicketGenerated] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<RedistributionTicket | null>(null);

  const MATCHED_RECEIVERS = [
    {
      id: 'org-1',
      name: 'Annapurna Community Kitchen',
      type: 'Direct Human Feeding (Mid-Day & Dinner)',
      distanceKm: 2.8,
      etaMins: 22,
      matchScore: 98,
      verifiedFssai: true,
      currentNeed: 'High - Serving 650 meals today',
      recommendedTransport: 'Tata Ace Cold-EV #09',
      driver: 'Ramesh Kumar',
      plate: 'KA-51-AB-1234'
    },
    {
      id: 'org-2',
      name: 'Shanti Shelter Child Care',
      type: 'Children Home & Community Care',
      distanceKm: 4.1,
      etaMins: 35,
      matchScore: 92,
      verifiedFssai: true,
      currentNeed: 'Accepts cooked grains and bakery only',
      recommendedTransport: 'Eco-Van EV #04',
      driver: 'Kishore Patil',
      plate: 'MH-15-EV-5510'
    },
    {
      id: 'org-3',
      name: 'GreenCycle Biogas Unit (Digester #3)',
      type: 'Circular Energy & Biomass Upcycling',
      distanceKm: 6.5,
      etaMins: 45,
      matchScore: 89,
      verifiedFssai: false,
      currentNeed: 'Organic scraps, peelings & trimmings',
      recommendedTransport: 'Tanker B-04',
      driver: 'Manoj Shinde',
      plate: 'MH-15-CD-9921'
    },
    {
      id: 'org-4',
      name: 'Vanashree Cattle & Animal Rescue',
      type: 'Animal Feed & Rescue Sanctuary',
      distanceKm: 8.2,
      etaMins: 55,
      matchScore: 84,
      verifiedFssai: false,
      currentNeed: 'Vegetable trimmings & dry grains',
      recommendedTransport: 'Utility Truck #07',
      driver: 'Sunil Jadhav',
      plate: 'MH-15-TR-2201'
    }
  ];

  const currentOrg = MATCHED_RECEIVERS.find((o) => o.id === selectedOrgId) || MATCHED_RECEIVERS[0];

  const handleCreateTicket = () => {
    const newTicket: RedistributionTicket = {
      ticketId: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId: `batch-active`,
      batchTitle: `${selectedBatchTitle} (${selectedBatchVolumeKg}kg)`,
      volumeKg: selectedBatchVolumeKg,
      fromKitchen: 'Indiranagar Central Institutional Kitchen',
      toOrg: currentOrg.name,
      driverName: currentOrg.driver,
      vehicleNumber: currentOrg.plate,
      pickupBay: 'Bay 03 (Cold Chute)',
      otp: '4091',
      status: 'pending_acceptance',
      etaMinutes: currentOrg.etaMins,
      freshnessScore: 94,
      timestamp: 'Just now'
    };

    setGeneratedTicket(newTicket);
    setIsTicketGenerated(true);
  };

  const handleFinalConfirm = () => {
    if (generatedTicket) {
      onTicketConfirmed(generatedTicket);
      onNavigate('kitchen_dashboard');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Context Header */}
      <div className="bg-[#ebf7ee] rounded-2xl p-3.5 border border-[#00652c]/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white text-[#00652c] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[22px]">join_inner</span>
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
              Surplus Batch Ready for Dispatch
            </h2>
            <p className="text-xs font-semibold text-[#00652c]">
              {selectedBatchTitle} • {selectedBatchVolumeKg} kg
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#00652c] text-white text-[10px] font-bold">
          4 Matches
        </span>
      </div>

      {!isTicketGenerated ? (
        <>
          {/* Ranked List of Organizations */}
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#141b2b] font-headline">
              AI-Ranked Receiving Organizations
            </h3>
            <p className="text-xs text-[#4e5a53]">
              Ranked by proximity, dietary intake capacity, cold-chain safety, and delivery urgency.
            </p>
          </div>

          <div className="space-y-3">
            {MATCHED_RECEIVERS.map((org, index) => {
              const isSelected = selectedOrgId === org.id;
              return (
                <div
                  key={org.id}
                  onClick={() => setSelectedOrgId(org.id)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#00652c] bg-white shadow-md'
                      : 'border-[#e5e7eb] bg-white hover:border-[#becabc]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#ebf7ee] text-[#00652c] font-bold text-xs flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#141b2b] font-headline">{org.name}</h4>
                        <p className="text-[11px] text-[#4e5a53]">{org.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-xs font-bold block">
                        {org.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-[#6f7a6e] mt-0.5 block">{org.distanceKm} km away</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-[#f1f3ff] rounded-xl p-2.5 text-xs text-[#141b2b] space-y-1 my-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#4e5a53]">Current Need:</span>
                      <span className="text-[11px] font-semibold text-[#141b2b]">{org.currentNeed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#4e5a53]">Recommended Logistics:</span>
                      <span className="text-[11px] font-semibold text-[#00652c]">
                        {org.recommendedTransport} (~{org.etaMins}m ETA)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#6f7a6e] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#00652c]">
                        eco
                      </span>
                      ~{Math.round(selectedBatchVolumeKg * 1.6)} kg CO2e avoided
                    </span>

                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#00652c] text-white shadow-xs'
                          : 'bg-[#f1f3ff] text-[#141b2b] hover:bg-[#e1e8fd]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action to Generate Ticket */}
          <button
            onClick={handleCreateTicket}
            className="w-full h-14 rounded-2xl bg-[#00652c] hover:bg-[#15803d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-3"
          >
            <span>Generate Redistribution Ticket for {currentOrg.name.slice(0, 18)}...</span>
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </>
      ) : (
        /* Generated Redistribution Ticket View */
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-[#00652c] relative overflow-hidden">
            {/* Stamp Banner */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#00652c]/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[44px] text-[#00652c]/30">verified</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00652c]">
                  FreshoFarm Dispatch Ticket
                </span>
                <h3 className="text-lg font-bold text-[#141b2b] font-headline">
                  {generatedTicket?.ticketId}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#855300] text-[11px] font-bold">
                Pending Acceptance
              </span>
            </div>

            {/* QR Code and Key Verification Details */}
            <div className="py-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-[#f9f9ff] p-2 rounded-2xl border-2 border-dashed border-[#becabc] flex flex-col items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[80px] text-[#00652c]">qr_code_2</span>
                <span className="text-[9px] font-mono text-[#6f7a6e]">Scan at Dispatch Chute</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ebf7ee] border border-[#00652c]/20">
                <span className="text-xs text-[#4e5a53]">Handover OTP:</span>
                <span className="text-lg font-extrabold text-[#00652c] tracking-widest font-mono">
                  {generatedTicket?.otp}
                </span>
              </div>
            </div>

            {/* Ticket Metadata Breakdown */}
            <div className="space-y-2 text-xs bg-[#f1f3ff] rounded-2xl p-3.5 text-[#141b2b]">
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Batch:</span>
                <span className="font-bold text-[#141b2b]">{generatedTicket?.batchTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Origin Kitchen:</span>
                <span className="font-semibold text-[#141b2b]">{generatedTicket?.fromKitchen}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Designated Receiver:</span>
                <span className="font-bold text-[#00652c]">{generatedTicket?.toOrg}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Pickup Chute / Bay:</span>
                <span className="font-semibold text-[#141b2b]">{generatedTicket?.pickupBay}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Assigned EV Driver:</span>
                <span className="font-semibold text-[#141b2b]">
                  {generatedTicket?.driverName} ({generatedTicket?.vehicleNumber})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6f7a6e]">Estimated Arrival:</span>
                <span className="font-bold text-[#855300]">{generatedTicket?.etaMinutes} mins</span>
              </div>
            </div>
          </div>

          {/* Confirmation Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsTicketGenerated(false)}
              className="flex-1 py-3 rounded-2xl bg-white border border-[#becabc] text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff]"
            >
              Back to Organizations
            </button>
            <button
              onClick={handleFinalConfirm}
              className="flex-1 py-3 rounded-2xl bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Confirm & Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
