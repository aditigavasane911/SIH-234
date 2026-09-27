import React, { useState } from 'react';
import { FoodBatch, ScreenId } from '../types';

interface ListSurplusScreenProps {
  onBatchCreated: (newBatch: FoodBatch) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ListSurplusScreen: React.FC<ListSurplusScreenProps> = ({
  onBatchCreated,
  onNavigate,
}) => {
  const [torchActive, setTorchActive] = useState(false);
  const [gridActive, setGridActive] = useState(true);
  const [spectralMode, setSpectralMode] = useState<'Vis' | 'NIR' | 'Thermal'>('Vis');
  const [scanMode, setScanMode] = useState<'Single Tray' | 'Continuous Crates' | 'Cold Storage'>('Single Tray');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(88);

  // Selected item preset
  const PRESET_OPTIONS = [
    {
      title: 'Cooked Basmati Rice & Lentils',
      category: 'Cooked Meals' as const,
      volumeKg: 45,
      score: 94,
      shelfHours: 14,
      temp: 3.2,
      degradation: '0.08%',
      moisture: '92.4%',
      hold: '12-16h',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxrmg1n_1BdPUulYQrcBYE9DrUl5AWJDi5pII1atAS_HoFMfShQtcKgo_NcY287fq0feaMGBXNqbfNe0wSwMEMB5xdwupFz3w_gR0YPvGUVGRorxrPrIfZ9Wt9fBkihCUf06qw8Iy67xGgV9R45ODMIiNb46pJVdCfwDCiqsA0p_mYVxOR1onFgo15h_i7Cp0F6SWXlSc688tPiwRhKhHApogq3bzHYyj5GGw2IJnSyECyrSYT6_pg'
    },
    {
      title: 'Diced Bell Peppers & Crisp Greens',
      category: 'Fresh Produce' as const,
      volumeKg: 32,
      score: 96,
      shelfHours: 28,
      temp: 3.4,
      degradation: '0.12%',
      moisture: '94.2%',
      hold: '24-36h',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDraaTgT0oI2qF400FiouwxK8glQs-k_yIV4iVbi2belky3SmjAFL8tTCS9z2MYDvgNq1H9F58JEmvCE6BbMDhcp7gEpcpS68yAS2Jcw0UZ9azyl45cJI9-b6E9i0Cfg-kfEomCj7M3Xd8gJyNBLZypIQmfwGIRIahW1oqr-bMXLwNIiI02tiktPKzV8HRC3gVT2nBN0ScL3wWek_RDvwZ_41Zft8MTu0YMengl8ahvhvn2rDjJHi3p'
    },
    {
      title: 'Vegetable Trimmings & Tops',
      category: 'Biomass / Trimmings' as const,
      volumeKg: 28,
      score: 88,
      shelfHours: 22,
      temp: 6.8,
      degradation: '0.24%',
      moisture: '89.1%',
      hold: '18-24h',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZS-MhxhRwNueZGPhRUT-SFH7Cu4JdPrxEaJ9MTlue8PKpKIqi2zAMZ9xnwNu6eqIZkFZwQ_OeyGH5GWNqkJWq9ktE_fMiDDtsgljg4bhjXUMTQDcliE3Xn22SUFq3X_Yc-XBdkgQryqs1HmibVDHiUrFR7LZAa9s7Iie4e_21LYTp1LLbVnDP8zb3seJ9Rm-jrQj09N47-rn_HlEE5h9aziwfuwv8ztWtMZ3rzFE9W7AatZngGy97'
    }
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const currentItem = PRESET_OPTIONS[selectedPresetIndex];

  // Editable form fields
  const [customTitle, setCustomTitle] = useState(currentItem.title);
  const [customKg, setCustomKg] = useState(currentItem.volumeKg);
  const [customCategory, setCustomCategory] = useState(currentItem.category);

  const handlePresetChange = (idx: number) => {
    setSelectedPresetIndex(idx);
    const item = PRESET_OPTIONS[idx];
    setCustomTitle(item.title);
    setCustomKg(item.volumeKg);
    setCustomCategory(item.category);
  };

  const handleCaptureAndAnalyze = () => {
    setIsScanning(true);
    setScanProgress(30);

    setTimeout(() => setScanProgress(75), 350);
    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);

      // Create new batch object
      const newBatch: FoodBatch = {
        id: `batch-${Date.now()}`,
        batchNumber: `NB-${Math.floor(100 + Math.random() * 900)}`,
        title: customTitle,
        category: customCategory,
        volumeKg: Number(customKg),
        aiFreshnessScore: currentItem.score,
        shelfLifeRemainingHours: currentItem.shelfHours,
        storageTempC: currentItem.temp,
        targetTempC: 4.0,
        preparationTime: 'Just now (AI Certified)',
        status: 'active',
        imageUrl: currentItem.image,
        triageDestination: 'Redistribution Queue',
        co2eAvertedKg: Math.round(Number(customKg) * 1.6)
      };

      onBatchCreated(newBatch);
      // Navigate to Matched Receiving Organizations as per prototype spec
      onNavigate('matched_orgs');
    }, 850);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-1 px-4 max-w-lg mx-auto select-none">
      {/* Viewfinder Header Banner */}
      <div className="flex items-center justify-between py-2 px-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf7ee] border border-[#00652c]/20">
          <span className="w-2 h-2 rounded-full bg-[#00652c] animate-pulse"></span>
          <span className="text-[11px] font-bold text-[#00652c] uppercase tracking-wide">
            Krishi AI Optic v0.1
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTorchActive(!torchActive)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              torchActive ? 'bg-[#ffddb8] text-[#855300]' : 'bg-[#f1f3ff] text-[#4e5a53]'
            }`}
            title="Toggle Torch"
          >
            <span className="material-symbols-outlined text-[18px]">flash_on</span>
          </button>
          <button
            onClick={() => handlePresetChange((selectedPresetIndex + 1) % PRESET_OPTIONS.length)}
            className="w-9 h-9 rounded-full bg-[#f1f3ff] text-[#4e5a53] flex items-center justify-center hover:bg-[#e1e8fd] transition-colors"
            title="Switch Sample Produce"
          >
            <span className="material-symbols-outlined text-[18px]">cached</span>
          </button>
        </div>
      </div>

      {/* Main Viewfinder Simulation (Matching Screenshot 7) */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-[#becabc] flex flex-col justify-between p-3.5 my-2">
        {/* Background Food Image Feed */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url('${currentItem.image}')` }}
        ></div>

        {/* Gradient Scrim for Reticle Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none"></div>

        {/* 3x3 Overlay Grid */}
        {gridActive && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/40"></div>
            ))}
          </div>
        )}

        {/* Scanning Laser Beam */}
        {isScanning && (
          <div className="absolute inset-x-4 top-4 h-1 bg-gradient-to-r from-transparent via-[#95f8a7] to-transparent shadow-[0_0_15px_#95f8a7] animate-pulse"></div>
        )}

        {/* Top Controls inside Viewfinder */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white">
            <span className="material-symbols-outlined text-[14px] text-[#95f8a7] animate-spin">
              radar
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Multi-Spectrum Optic
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-0.5 rounded-full">
            <button
              onClick={() => setGridActive(!gridActive)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                gridActive ? 'text-[#95f8a7] bg-white/20' : 'text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">grid_4x4</span>
            </button>
            <button
              onClick={() =>
                setSpectralMode(
                  spectralMode === 'Vis' ? 'NIR' : spectralMode === 'NIR' ? 'Thermal' : 'Vis'
                )
              }
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-white/20"
            >
              {spectralMode}
            </button>
          </div>
        </div>

        {/* Target Reticle Brackets (Matching Screenshot 7) */}
        <div className="relative z-10 w-full flex-1 my-2 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full rounded-2xl flex flex-col justify-between p-2">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#95f8a7] rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#95f8a7] rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#95f8a7] rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#95f8a7] rounded-br-lg"></div>

            {/* Center crosshair */}
            <div className="absolute inset-0 m-auto w-8 h-8 flex items-center justify-center opacity-70">
              <div className="w-full h-0.5 bg-[#95f8a7]"></div>
              <div className="h-full w-0.5 bg-[#95f8a7] absolute"></div>
            </div>

            {/* Live Floating AI Telemetry Markers */}
            <div className="self-start px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#95f8a7] animate-ping"></span>
              <span>ID #{customTitle.slice(0, 10)} Batch</span>
            </div>

            <div className="self-end flex flex-col items-end gap-1">
              <div className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-[#95f8a7]">verified</span>
                <span>Surface Texture: 98.4% Crisp</span>
              </div>
              <div className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-[#fea619]">device_thermostat</span>
                <span>Core Temp: {currentItem.temp}°C (Optimal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Viewfinder Bottom Label */}
        <div className="relative z-10 text-center">
          <span className="px-2.5 py-0.5 rounded-full bg-black/70 text-white/90 text-[10px] tracking-wider uppercase backdrop-blur-md font-semibold">
            Align Tray Edges Within Brackets
          </span>
        </div>
      </div>

      {/* HUD Telemetry Card (Matching Screenshot 7) */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ebf7ee] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#141b2b]">Freshness Index Scan</h3>
              <p className="text-[10px] text-[#6f7a6e]">Real-time spectral analysis running</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#ebf7ee] text-[#00652c] font-bold text-xs">
            {currentItem.score}% READY
          </span>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-full bg-[#f1f3ff] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#00652c] h-full rounded-full transition-all duration-500"
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>

        {/* Diagnostic 3-Column Chips */}
        <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
          <div className="bg-[#f1f3ff] rounded-xl p-2 flex flex-col">
            <span className="text-[10px] text-[#4e5a53]">Degradation</span>
            <span className="text-xs font-bold text-[#00652c] mt-0.5">{currentItem.degradation}</span>
            <span className="text-[9px] text-[#6f7a6e]">Negligible</span>
          </div>
          <div className="bg-[#f1f3ff] rounded-xl p-2 flex flex-col">
            <span className="text-[10px] text-[#4e5a53]">Moisture</span>
            <span className="text-xs font-bold text-[#141b2b] mt-0.5">{currentItem.moisture}</span>
            <span className="text-[9px] text-[#00652c]">Hydrated</span>
          </div>
          <div className="bg-[#f1f3ff] rounded-xl p-2 flex flex-col">
            <span className="text-[10px] text-[#4e5a53]">Hold Window</span>
            <span className="text-xs font-bold text-[#855300] mt-0.5">{currentItem.hold}</span>
            <span className="text-[9px] text-[#6f7a6e]">Refrigerated</span>
          </div>
        </div>
      </div>

      {/* Editable Surplus Batch Information Form */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)] border border-[#e5e7eb] space-y-3 mt-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#e5e7eb]">
          <span className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
            Batch Verification Details
          </span>
          <span className="text-[10px] text-[#00652c] font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            Auto-Detected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-semibold text-[#4e5a53] mb-1">
              Food Item Title
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#f1f3ff] border border-[#becabc] text-xs font-medium text-[#141b2b] focus:border-[#00652c] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-[#4e5a53] mb-1">
              Quantity / Weight (kg)
            </label>
            <input
              type="number"
              value={customKg}
              onChange={(e) => setCustomKg(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl bg-[#f1f3ff] border border-[#becabc] text-xs font-medium text-[#141b2b] focus:border-[#00652c] focus:outline-none"
            />
          </div>
        </div>

        {/* Scan Mode Segmented Control (Matching Screenshot 7) */}
        <div className="flex items-center justify-between p-1 bg-[#f1f3ff] rounded-xl">
          {(['Single Tray', 'Continuous Crates', 'Cold Storage'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setScanMode(mode)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                scanMode === mode
                  ? 'bg-[#00652c] text-white shadow-xs'
                  : 'text-[#4e5a53] hover:text-[#141b2b]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Hardware-Like Shutter Deck (Matching Screenshot 7) */}
        <div className="flex items-center justify-around pt-2">
          {/* Preset gallery selection button */}
          <button
            type="button"
            onClick={() => handlePresetChange((selectedPresetIndex + 1) % PRESET_OPTIONS.length)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#4e5a53] group-hover:text-[#00652c] transition-colors">
              <span className="material-symbols-outlined text-[20px]">photo_library</span>
            </div>
            <span className="text-[10px] text-[#6f7a6e]">Sample Log</span>
          </button>

          {/* Main Shutter Button */}
          <button
            type="button"
            disabled={isScanning}
            onClick={handleCaptureAndAnalyze}
            className="w-18 h-18 rounded-full bg-[#ebf7ee] flex items-center justify-center p-1.5 shadow-md active:scale-95 transition-all group"
          >
            <div className="w-full h-full rounded-full bg-[#00652c] hover:bg-[#15803d] flex items-center justify-center text-white shadow-inner">
              <span className="material-symbols-outlined text-[30px] group-hover:scale-110 transition-transform">
                qr_code_scanner
              </span>
            </div>
          </button>

          {/* Filter Visual Toggle */}
          <button
            type="button"
            onClick={() =>
              setSpectralMode(
                spectralMode === 'Vis' ? 'NIR' : spectralMode === 'NIR' ? 'Thermal' : 'Vis'
              )
            }
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#4e5a53] group-hover:text-[#00652c] transition-colors">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <span className="text-[10px] text-[#6f7a6e]">Filter ({spectralMode})</span>
          </button>
        </div>

        {/* Big Action Bar to Proceed directly to Matched Orgs */}
        <button
          type="button"
          onClick={handleCaptureAndAnalyze}
          className="w-full h-12 rounded-2xl bg-[#00652c] hover:bg-[#15803d] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
        >
          <span>Find Matched Receiving Orgs & Generate Ticket</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
