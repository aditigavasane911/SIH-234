import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface SettingsScreenProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeLanguage: string;
  setActiveLanguage: (lang: string) => void;
  voiceGuidanceEnabled: boolean;
  setVoiceGuidanceEnabled: (enabled: boolean) => void;
  onSignOut: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userRole,
  setUserRole,
  activeLanguage,
  setActiveLanguage,
  voiceGuidanceEnabled,
  setVoiceGuidanceEnabled,
  onSignOut,
  onNavigate,
}) => {
  const [iotStatus, setIotStatus] = useState(true);
  const [esgStandard, setEsgStandard] = useState('SEBI BRSR (Core)');
  const [saveToast, setSaveToast] = useState(false);

  const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' }
  ];

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-16 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in">
          <div className="bg-[#293040] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">check_circle</span>
            <span>Preferences saved successfully</span>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#ebf7ee] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#141b2b] truncate font-headline">
              Aditi Gavsane
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-[10px] font-bold">
              Admin
            </span>
          </div>
          <p className="text-xs text-[#4e5a53] truncate mt-0.5">
            Facility Manager • Indiranagar Central Hub
          </p>
          <p className="text-[10px] text-[#6f7a6e] mt-1 font-mono">FSSAI ID: #11521045000213</p>
        </div>
      </div>

      {/* Role Switcher Sandbox (Key feature for prototype reviewing) */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#141b2b] font-headline">Active Persona View</h3>
            <p className="text-xs text-[#4e5a53]">Switch your role to explore prototype workflows</p>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#00652c]">swap_calls</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'kitchen', label: 'Kitchen Hub', icon: 'restaurant' },
              { id: 'receiving', label: 'NGO Receiver', icon: 'volunteer_activism' },
              { id: 'logistics', label: 'Logistics EV', icon: 'local_shipping' }
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setUserRole(item.id);
                handleSave();
              }}
              className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                userRole === item.id
                  ? 'border-[#00652c] bg-[#ebf7ee] text-[#00652c] font-bold shadow-xs'
                  : 'border-[#e5e7eb] bg-white text-[#4e5a53] hover:bg-[#f1f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-1">{item.icon}</span>
              <span className="text-[11px] leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Multilingual Selector (Specification requirement) */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00652c]">translate</span>
            <div>
              <h3 className="text-sm font-bold text-[#141b2b] font-headline">
                Language / भाषा / भाषा
              </h3>
              <p className="text-xs text-[#4e5a53]">Select regional dialect for UI & reports</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#00652c]">{activeLanguage}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setActiveLanguage(lang.name);
                handleSave();
              }}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                activeLanguage === lang.name
                  ? 'border-[#00652c] bg-[#00652c] text-white font-bold shadow-xs'
                  : 'border-[#e5e7eb] bg-white text-[#141b2b] hover:bg-[#f1f3ff]'
              }`}
            >
              <span className="text-xs font-bold block">{lang.native}</span>
              <span className="text-[10px] opacity-80 block">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Assistant Guidance Toggle (Specification requirement) */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141b2b] font-headline">
                Krishi AI Voice Guidance
              </h3>
              <p className="text-xs text-[#4e5a53]">
                Spoken audio prompts for noisy kitchen & loading bay prep
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setVoiceGuidanceEnabled(!voiceGuidanceEnabled);
              handleSave();
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              voiceGuidanceEnabled ? 'bg-[#00652c]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                voiceGuidanceEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* IoT Cold Storage Sensor Status */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00652c]">sensors</span>
            <div>
              <h3 className="text-sm font-bold text-[#141b2b] font-headline">IoT Telemetry Node</h3>
              <p className="text-xs text-[#4e5a53]">Indiranagar Hub Bay Sensors</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ebf7ee] text-[#00652c] text-[10px] font-bold">
            Online • BLE v5.2
          </span>
        </div>

        <div className="bg-[#f1f3ff] rounded-2xl p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#6f7a6e]">Compressor Sensor CS-04:</span>
            <span className="font-semibold text-[#00652c]">Connected (3.8°C)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6f7a6e]">Humidity Sensor HD-209:</span>
            <span className="font-semibold text-[#00652c]">Connected (85%)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6f7a6e]">Telemetry Ping:</span>
            <span className="font-semibold text-[#141b2b]">Every 30 seconds</span>
          </div>
        </div>
      </div>

      {/* ESG Regulatory Framework */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-2">
        <h3 className="text-sm font-bold text-[#141b2b] font-headline">ESG Export Standard</h3>
        <p className="text-xs text-[#4e5a53]">Format for municipal and corporate audit exports</p>

        <select
          value={esgStandard}
          onChange={(e) => {
            setEsgStandard(e.target.value);
            handleSave();
          }}
          className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] border border-[#becabc] text-xs font-semibold text-[#141b2b] focus:border-[#00652c] focus:outline-none mt-1"
        >
          <option value="SEBI BRSR (Core)">SEBI BRSR (Business Responsibility & Sustainability)</option>
          <option value="GHG Protocol Scope 3">GHG Protocol Scope 3 Category 5</option>
          <option value="ISO 14064-1">ISO 14064-1 Carbon Offset Standard</option>
          <option value="FSSAI Surplus Clean Food">FSSAI Surplus Clean Food Protocol</option>
        </select>
      </div>

      {/* Sign Out CTA */}
      <button
        onClick={onSignOut}
        className="w-full py-3.5 rounded-2xl bg-white border border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ffdad6]/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Sign Out of Facility Account</span>
      </button>

      <div className="text-center text-[10px] text-[#6f7a6e] pt-1">
        FreshoFarm Circular Grid Engine v2.4 • Made for Nashik Agricultural Community
      </div>
    </div>
  );
};
