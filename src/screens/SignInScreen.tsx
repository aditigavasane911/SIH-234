import React, { useState } from 'react';
import { UserRole } from '../types';

interface SignInScreenProps {
  onSignInSuccess: (role: UserRole) => void;
  onCreateAccountClick: () => void;
  onBackToSplash: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignInSuccess,
  onCreateAccountClick,
  onBackToSplash,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('kitchen.manager@freshofarm.org');
  const [selectedRole, setSelectedRole] = useState<UserRole>('kitchen');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (roleToLogin: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess(roleToLogin);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col justify-between px-6 py-8 max-w-lg mx-auto">
      {/* Top Nav Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSplash}
          className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-[#141b2b] hover:bg-[#f1f3ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span className="text-xs font-bold text-[#00652c] uppercase tracking-wider">
          FreshoFarm Auth
        </span>
      </div>

      <div className="my-auto py-6">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[26px]">lock</span>
          </div>
          <h1 className="text-2xl font-bold text-[#141b2b] font-headline">Welcome Back</h1>
          <p className="text-xs text-[#4e5a53] mt-1">
            Sign in to access your surplus redistribution node, cold-chain alerts, and ESG ledgers.
          </p>
        </div>

        {/* Demo Fast Login Buttons (For Seamless Reviewer Experience) */}
        <div className="bg-white rounded-2xl p-4 border border-[#dce2f7] shadow-xs mb-6">
          <span className="text-[11px] font-bold text-[#00652c] uppercase tracking-wider block mb-2">
            ⚡ Quick 1-Tap Role Sign-In:
          </span>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSignIn('kitchen')}
              className="w-full text-left p-3 rounded-xl bg-[#ebf7ee] hover:bg-[#d3ffd5] border border-[#00652c]/20 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px]">restaurant</span>
                <div>
                  <p className="text-xs font-bold text-[#141b2b]">Institutional Kitchen</p>
                  <p className="text-[10px] text-[#4e5a53]">Indiranagar Hub #04 • Central Dining</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#00652c] flex items-center">
                Launch <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </button>

            <button
              onClick={() => handleSignIn('receiving')}
              className="w-full text-left p-3 rounded-xl bg-[#ffddb8]/40 hover:bg-[#ffddb8]/70 border border-[#855300]/20 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#855300] text-[20px]">volunteer_activism</span>
                <div>
                  <p className="text-xs font-bold text-[#141b2b]">Receiving Organization</p>
                  <p className="text-[10px] text-[#4e5a53]">Annapurna Community Kitchen • NGO</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#855300] flex items-center">
                Launch <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </button>

            <button
              onClick={() => handleSignIn('logistics')}
              className="w-full text-left p-3 rounded-xl bg-[#dce2f7]/50 hover:bg-[#dce2f7] border border-[#00652c]/20 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px]">local_shipping</span>
                <div>
                  <p className="text-xs font-bold text-[#141b2b]">Logistics Partner</p>
                  <p className="text-[10px] text-[#4e5a53]">EcoFleet Nashik • Driver Ramesh EV #09</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#00652c] flex items-center">
                Launch <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </button>
          </div>
        </div>

        {/* Standard Manual Login Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#141b2b] mb-1">
              Registered Email or Mobile Number
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="e.g., manager@kitchenhub.com"
              className="w-full h-12 px-4 rounded-xl bg-white border border-[#becabc] text-sm text-[#141b2b] focus:outline-none focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#141b2b] mb-1">
              Confirm Role Profile
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['kitchen', 'receiving', 'logistics'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                    selectedRole === role
                      ? 'bg-[#00652c] text-white border-[#00652c] shadow-xs'
                      : 'bg-white text-[#4e5a53] border-[#e5e7eb] hover:bg-[#f1f3ff]'
                  }`}
                >
                  {role === 'kitchen' ? 'Kitchen' : role === 'receiving' ? 'Receiving Org' : 'Logistics'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSignIn(selectedRole)}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-[#00652c] hover:bg-[#15803d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-[18px]">login</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer link to Create Account */}
      <div className="text-center pt-4">
        <p className="text-xs text-[#4e5a53]">
          Don't have an organization registered yet?{' '}
          <button
            onClick={onCreateAccountClick}
            className="text-[#00652c] font-bold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
