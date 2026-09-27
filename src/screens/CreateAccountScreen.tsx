import React, { useState } from 'react';
import { UserRole } from '../types';

interface CreateAccountScreenProps {
  onAccountCreated: (role: UserRole) => void;
  onBackToSignIn: () => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  onAccountCreated,
  onBackToSignIn,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('kitchen');
  const [orgName, setOrgName] = useState('');
  const [locationHub, setLocationHub] = useState('Nashik, Maharashtra');
  const [regNumber, setRegNumber] = useState('');
  const [capacity, setCapacity] = useState('150 kg/day');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAccountCreated(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col justify-between px-6 py-8 max-w-lg mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBackToSignIn}
          className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-[#141b2b] hover:bg-[#f1f3ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span className="text-xs font-bold text-[#00652c] uppercase tracking-wider">
          Step 1 of 1 • Role Select
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 my-auto py-2">
        <div>
          <h1 className="text-2xl font-bold text-[#141b2b] font-headline">Register Organization</h1>
          <p className="text-xs text-[#4e5a53] mt-1">
            Select your functional node in the circular food surplus redistribution ecosystem.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6f7a6e]">
            Choose Your Ecosystem Role:
          </label>

          {/* Role 1: Institutional Kitchen */}
          <div
            onClick={() => {
              setSelectedRole('kitchen');
              if (!orgName) setOrgName('Grand Horizon Central Kitchen');
              if (!regNumber) setRegNumber('FSSAI #11521045000213');
            }}
            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedRole === 'kitchen'
                ? 'border-[#00652c] bg-[#ebf7ee] shadow-sm'
                : 'border-[#e5e7eb] bg-white hover:border-[#becabc]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'kitchen' ? 'bg-[#00652c] text-white' : 'bg-[#f1f3ff] text-[#00652c]'
              }`}>
                <span className="material-symbols-outlined text-[22px]">restaurant</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#141b2b]">Kitchen / Processing Unit</h3>
                  {selectedRole === 'kitchen' && (
                    <span className="w-5 h-5 rounded-full bg-[#00652c] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#4e5a53] mt-0.5 leading-snug">
                  Hotels, corporate canteens, university messes & catering kitchens generating edible surplus.
                </p>
              </div>
            </div>
          </div>

          {/* Role 2: Receiving Organization */}
          <div
            onClick={() => {
              setSelectedRole('receiving');
              if (!orgName) setOrgName('Annapurna Seva Trust');
              if (!regNumber) setRegNumber('DARPAN NGO #MH/2021/02981');
            }}
            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedRole === 'receiving'
                ? 'border-[#855300] bg-[#ffddb8]/30 shadow-sm'
                : 'border-[#e5e7eb] bg-white hover:border-[#becabc]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'receiving' ? 'bg-[#855300] text-white' : 'bg-[#f1f3ff] text-[#855300]'
              }`}>
                <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#141b2b]">Receiving Organization</h3>
                  {selectedRole === 'receiving' && (
                    <span className="w-5 h-5 rounded-full bg-[#855300] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#4e5a53] mt-0.5 leading-snug">
                  Food banks, orphanages, community kitchens, animal shelters & circular biogas units.
                </p>
              </div>
            </div>
          </div>

          {/* Role 3: Logistics Partner */}
          <div
            onClick={() => {
              setSelectedRole('logistics');
              if (!orgName) setOrgName('GreenLine Eco Cold-Haul');
              if (!regNumber) setRegNumber('FLEET-EV #MH-15-EV-884');
            }}
            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedRole === 'logistics'
                ? 'border-[#00652c] bg-[#dce2f7]/40 shadow-sm'
                : 'border-[#e5e7eb] bg-white hover:border-[#becabc]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'logistics' ? 'bg-[#00652c] text-white' : 'bg-[#f1f3ff] text-[#00652c]'
              }`}>
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#141b2b]">Logistics Partner</h3>
                  {selectedRole === 'logistics' && (
                    <span className="w-5 h-5 rounded-full bg-[#00652c] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#4e5a53] mt-0.5 leading-snug">
                  Temp-controlled EV vans, tanker dispatchers, volunteer food runners & cold-chain drivers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Details Form */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#141b2b] mb-1">
              Organization / Facility Name
            </label>
            <input
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Indiranagar Central Facility"
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#becabc] text-xs text-[#141b2b] focus:outline-none focus:border-[#00652c]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#141b2b] mb-1">
                Regional Hub
              </label>
              <input
                type="text"
                value={locationHub}
                onChange={(e) => setLocationHub(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#becabc] text-xs text-[#141b2b] focus:outline-none focus:border-[#00652c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#141b2b] mb-1">
                Compliance ID
              </label>
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="FSSAI / Darpan ID"
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#becabc] text-xs text-[#141b2b] focus:outline-none focus:border-[#00652c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#141b2b] mb-1">
              Average Daily Capacity / Volume
            </label>
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#becabc] text-xs text-[#141b2b] focus:outline-none focus:border-[#00652c]"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-13 rounded-2xl bg-[#00652c] hover:bg-[#15803d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4"
        >
          <span>Complete Registration & Launch</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToSignIn}
          className="text-xs text-[#4e5a53] hover:text-[#00652c] font-medium"
        >
          Already registered? Sign in instead
        </button>
      </div>
    </div>
  );
};
