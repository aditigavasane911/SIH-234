import React, { useState } from 'react';
import { ScreenId } from '../types';

interface KrishiVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  activeLanguage?: string;
}

export const KrishiVoiceModal: React.FC<KrishiVoiceModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  activeLanguage = 'English'
}) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('Listening... Speak now or tap a quick command below');
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickCommands = [
    { text: 'List 45kg cooked rice surplus', screen: 'list_surplus' as ScreenId, reply: 'Opening Krishi AI Optic to scan Cooked Basmati Rice batch...' },
    { text: 'Check Cold Storage #04 status', screen: 'kitchen_dashboard' as ScreenId, reply: 'Cold Storage #04 is at 3.8°C with 85% humidity. All parameters optimal.' },
    { text: 'Show matched NGOs & drivers', screen: 'matched_orgs' as ScreenId, reply: 'Navigating to Matched Organizations. Annapurna Kitchen is 2.8km away.' },
    { text: 'View monthly ESG certificate', screen: 'sustainability_dashboard' as ScreenId, reply: 'Loading your Zero-Waste ESG certificate and CO2e offset statistics.' }
  ];

  const handleCommand = (cmd: { text: string; screen: ScreenId; reply: string }) => {
    setIsListening(false);
    setTranscript(`"${cmd.text}"`);
    setResponseMsg(cmd.reply);
    setTimeout(() => {
      onNavigate(cmd.screen);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-[#dce2f7] animate-in slide-in-from-bottom-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141b2b]">Krishi AI Voice Assistant</h3>
              <p className="text-[10px] text-[#4e5a53]">Powered by FreshoFarm Optic • {activeLanguage}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f3ff] text-[#6f7a6e] hover:bg-[#e1e8fd] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Live Audio Visualizer */}
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => {
              setIsListening(!isListening);
              if (!isListening) {
                setTranscript('Listening... Speak now');
                setResponseMsg(null);
              }
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-[#00652c] text-white shadow-[0_0_25px_rgba(0,101,44,0.4)] scale-105'
                : 'bg-[#f1f3ff] text-[#00652c] hover:bg-[#e1e8fd]'
            }`}
          >
            <span className="material-symbols-outlined text-[36px]">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>

          {/* Sound waves animation */}
          {isListening && (
            <div className="flex items-center gap-1.5 mt-4 h-6">
              {[40, 75, 95, 60, 85, 50, 90, 65, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#00652c] rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                ></div>
              ))}
            </div>
          )}

          <p className="text-xs font-medium text-[#141b2b] mt-3 max-w-xs">{transcript}</p>
          {responseMsg && (
            <div className="mt-3 px-3 py-2 rounded-xl bg-[#ebf7ee] border border-[#00652c]/20 text-[#00652c] text-xs font-semibold animate-in fade-in">
              {responseMsg}
            </div>
          )}
        </div>

        {/* Quick Voice Suggestions */}
        <div className="mt-2 pt-3 border-t border-[#e5e7eb]">
          <p className="text-[11px] font-semibold text-[#6f7a6e] mb-2 uppercase tracking-wider">
            Or try asking:
          </p>
          <div className="flex flex-col gap-1.5">
            {quickCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleCommand(cmd)}
                className="text-left px-3 py-2 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8fd] text-xs text-[#141b2b] flex items-center justify-between group transition-colors"
              >
                <span>"{cmd.text}"</span>
                <span className="material-symbols-outlined text-[16px] text-[#6f7a6e] group-hover:text-[#00652c] group-hover:translate-x-0.5 transition-all">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
