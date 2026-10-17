import React, { useState } from 'react';
import { EnzymeInfo, Language } from '../../types/biology';
import { ENZYMES_DATA } from '../../data/biologyData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  FlaskConical, 
  Thermometer, 
  Droplet, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  Info
} from 'lucide-react';

interface EnzymeLabProps {
  lang: Language;
  onAddScore: (points: number, stars: number) => void;
}

export const EnzymeLab: React.FC<EnzymeLabProps> = ({ lang, onAddScore }) => {
  const [selectedEnzyme, setSelectedEnzyme] = useState<EnzymeInfo>(ENZYMES_DATA[0]);
  const [temperature, setTemperature] = useState<number>(37);
  const [pH, setPH] = useState<number>(7.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasRunTest, setHasRunTest] = useState<boolean>(false);

  // Quest challenge states
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  // Calculate enzymatic reaction velocity based on Michaelis-Menten & Denaturation kinetics
  const calculateActivity = (temp: number, currPH: number, enzyme: EnzymeInfo): {
    rate: number; // 0 to 100%
    status: 'optimal' | 'suboptimal' | 'denatured' | 'inactivated';
    message: { en: string; id: string };
  } => {
    // Thermal factor:
    // Cold (< 10°C): low kinetic energy, deactivated but reversible
    // Hot (> 50°C): irreversible heat denaturation (hydrogen bonds break)
    let tempFactor = 1.0;
    if (temp > 50) {
      tempFactor = Math.max(0, 1 - Math.pow((temp - 50) / 15, 2));
    } else if (temp < enzyme.optimalTemp.optimal) {
      tempFactor = Math.max(0.1, 1 - (enzyme.optimalTemp.optimal - temp) * 0.025);
    } else {
      // 37 - 50°C
      tempFactor = Math.max(0.2, 1 - (temp - enzyme.optimalTemp.optimal) * 0.04);
    }

    // pH factor: bell curve centered on optimal pH
    const phDiff = Math.abs(currPH - enzyme.optimalPH.optimal);
    const phFactor = Math.max(0, 1 - Math.pow(phDiff / 2.2, 2));

    const totalRate = Math.round(Math.max(0, Math.min(100, tempFactor * phFactor * 100)));

    let status: 'optimal' | 'suboptimal' | 'denatured' | 'inactivated' = 'suboptimal';
    let message = {
      en: 'Moderate enzyme activity. Substrate is slowly being hydrolyzed.',
      id: 'Aktivitas sedang. Substrat perlahan terhidrolisis.'
    };

    if (temp >= 55) {
      status = 'denatured';
      message = {
        en: 'DENATURED! High thermal energy disrupted tertiary structure & active site geometry.',
        id: 'TERDENATURASI! Suhu tinggi merusak struktur tersier dan sisi aktif enzim.'
      };
    } else if (phDiff > 2.8) {
      status = 'denatured';
      message = {
        en: 'EXTREME pH DENATURATION! Altered ionic charges ruined active site substrate binding.',
        id: 'DENATURASI pH EKSTRIM! Muatan ionik merusak sisi aktif dan pengikatan substrat.'
      };
    } else if (temp <= 10) {
      status = 'inactivated';
      message = {
        en: 'Inactivated by low kinetic energy. Molecular collisions are too slow.',
        id: 'Inaktif karena energi kinetik rendah. Tumbukan molekul terlalu jarang.'
      };
    } else if (totalRate >= 80) {
      status = 'optimal';
      message = {
        en: 'Vmax PEAK VELOCITY! Optimal temperature and pH maximize enzyme-substrate complexes.',
        id: 'KECEPATAN PUNCAK (Vmax)! Suhu dan pH ideal memaksimalkan kompleks enzim-substrat.'
      };
    }

    return { rate: totalRate, status, message };
  };

  const currentResult = calculateActivity(temperature, pH, selectedEnzyme);

  // Determine reagent test color based on rate and enzyme
  const getReagentVisual = () => {
    const rate = currentResult.rate;
    if (selectedEnzyme.id === 'salivary_amylase' || selectedEnzyme.id === 'pancreatic_amylase') {
      // Lugol Iodine: High digestion = amber/yellow (#d97706); No digestion = dark blue (#1e3a8a)
      return {
        test: 'Lugol Iodine Test',
        color: rate > 70 ? '#d97706' : rate > 30 ? '#4338ca' : '#1e3a8a',
        label: rate > 70 
          ? (lang === 'en' ? 'Amber/Yellow (Starch Fully Digested!)' : 'Kuning Amber (Pati Habis Dicerna!)')
          : (lang === 'en' ? 'Blue-Black (Starch Intact)' : 'Biru-Kehitaman (Pati Masih Utuh)')
      };
    } else if (selectedEnzyme.id === 'pepsin' || selectedEnzyme.id === 'trypsin') {
      // Biuret Test: Intact protein = deep purple (#7e22ce); Digested = faint lavender/blue (#60a5fa)
      return {
        test: 'Biuret Reagent Test',
        color: rate > 70 ? '#60a5fa' : rate > 30 ? '#9333ea' : '#581c87',
        label: rate > 70
          ? (lang === 'en' ? 'Light Blue/Clear (Proteins Cleaved into Peptides)' : 'Biru Muda (Protein Terurai Jadi Peptida)')
          : (lang === 'en' ? 'Deep Violet (Intact Polypeptides Present)' : 'Ungu Pekat (Protein Masih Utuh)')
      };
    } else {
      // Lipase / Disaccharidases
      return {
        test: selectedEnzyme.indicatorTest.testName,
        color: rate > 60 ? '#16a34a' : '#e11d48',
        label: rate > 60
          ? (lang === 'en' ? 'Positive Hydrolysis (Free Fatty Acids/Glucose)' : 'Hidrolisis Positif (Asam Lemak/Glukosa Bebas)')
          : (lang === 'en' ? 'Negative / Minimal Hydrolysis' : 'Negatif / Minim Terhidrolisis')
      };
    }
  };

  const reagentVisual = getReagentVisual();

  const runSimulation = () => {
    sound.squirt();
    setIsSimulating(true);
    setHasRunTest(false);

    setTimeout(() => {
      setIsSimulating(false);
      setHasRunTest(true);
      if (currentResult.status === 'optimal') {
        sound.success();
      } else if (currentResult.status === 'denatured') {
        sound.error();
      }

      // Check Quests
      checkQuests();
    }, 600);
  };

  const checkQuests = () => {
    const newQuests = [...completedQuests];
    // Quest 1: Pepsin at pH 2.0 and 37°C
    if (selectedEnzyme.id === 'pepsin' && pH <= 2.2 && temperature >= 35 && temperature <= 40) {
      if (!newQuests.includes('quest_pepsin')) {
        newQuests.push('quest_pepsin');
        sound.fanfare();
        confetti({ particleCount: 50, spread: 60 });
        onAddScore(80, 1);
      }
    }
    // Quest 2: Denature Amylase with boiling water (> 65°C)
    if (selectedEnzyme.id === 'salivary_amylase' && temperature >= 65) {
      if (!newQuests.includes('quest_boil_amylase')) {
        newQuests.push('quest_boil_amylase');
        sound.fanfare();
        onAddScore(80, 1);
      }
    }
    // Quest 3: Amylase in stomach acid (pH 2.0)
    if (selectedEnzyme.id === 'salivary_amylase' && pH <= 2.5) {
      if (!newQuests.includes('quest_swallowed_amylase')) {
        newQuests.push('quest_swallowed_amylase');
        sound.fanfare();
        onAddScore(80, 1);
      }
    }
    setCompletedQuests(newQuests);
  };

  const quests = [
    {
      id: 'quest_pepsin',
      title: { en: 'Stomach Acid Spark', id: 'Aktivasi Lambung' },
      desc: {
        en: 'Achieve Vmax (>80% rate) with PEPSIN at body temperature (37°C) and gastric acidity (pH ~2.0).',
        id: 'Capai kecepatan puncak (>80%) dengan PEPSIN pada suhu tubuh (37°C) dan keasaman lambung (pH ~2.0).'
      }
    },
    {
      id: 'quest_boil_amylase',
      title: { en: 'Thermal Denaturation', id: 'Denaturasi Panas' },
      desc: {
        en: 'Boil Salivary Amylase above 65°C to witness irreversible active site protein denaturation.',
        id: 'Panaskan Amilase Saliva di atas 65°C untuk membuktikan denaturasi termal permanen sisi aktif enzim.'
      }
    },
    {
      id: 'quest_swallowed_amylase',
      title: { en: 'Swallowed into the Stomach', id: 'Tertelan ke Lambung' },
      desc: {
        en: 'Test what happens to Salivary Amylase when it enters gastric juice at pH 2.0.',
        id: 'Uji apa yang terjadi pada enzim ptialin saat mencapai getah lambung ber-pH 2.0.'
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-white">
              {lang === 'en' ? 'Enzyme Kinetics & Biochemistry Lab' : 'Laboratorium Kinetika & Biokimia Enzim'}
            </h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {lang === 'en'
              ? 'Test temperature curves, pH optima, thermal denaturation, and chemical reagent assays in real time.'
              : 'Uji kurva suhu, pH optimum, denaturasi panas, dan uji reagen indikator secara langsung.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === 'en' ? 'Quests Cleared:' : 'Misi Selesai:'} {completedQuests.length} / {quests.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Enzyme Selection & Info Card */}
        <div className="space-y-4">
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'en' ? 'Select Digestive Enzyme:' : 'Pilih Enzim Pencernaan:'}
            </h3>

            <div className="space-y-2">
              {ENZYMES_DATA.map((enzyme) => {
                const isSelected = selectedEnzyme.id === enzyme.id;
                return (
                  <button
                    key={enzyme.id}
                    onClick={() => {
                      sound.click();
                      setSelectedEnzyme(enzyme);
                      setHasRunTest(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-400 text-blue-200 ring-1 ring-blue-400/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white">
                        {lang === 'en' ? enzyme.name : enzyme.indonesianName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                        Opt. pH {enzyme.optimalPH.optimal}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 truncate">
                      {lang === 'en' ? `Substrate: ${enzyme.substrate.en}` : `Substrat: ${enzyme.substrate.id}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enzyme Profile Card */}
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <Info className="w-4 h-4" />
              <span>{lang === 'en' ? 'Biochemical Profile' : 'Profil Biokimia'}</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-700/70 pb-1.5">
                <span className="text-slate-400">{lang === 'en' ? 'Secreted By:' : 'Dihasilkan Oleh:'}</span>
                <span className="font-semibold text-white text-right">{selectedEnzyme.producedBy[lang]}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/70 pb-1.5">
                <span className="text-slate-400">{lang === 'en' ? 'Active Site:' : 'Lokasi Kerja:'}</span>
                <span className="font-semibold text-white text-right">{selectedEnzyme.siteOfAction[lang]}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/70 pb-1.5">
                <span className="text-slate-400">{lang === 'en' ? 'Product:' : 'Hasil Produk:'}</span>
                <span className="font-semibold text-white text-right">{selectedEnzyme.product[lang]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'en' ? 'Biological Range:' : 'Rentang Hidup:'}</span>
                <span className="font-mono text-cyan-300">
                  pH {selectedEnzyme.optimalPH.min} - {selectedEnzyme.optimalPH.max}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-slate-300 text-[11px] leading-relaxed">
              💡 <strong>{lang === 'en' ? 'Curiosity Fact:' : 'Fakta Unik:'}</strong> {selectedEnzyme.funFact[lang]}
            </div>
          </div>
        </div>

        {/* Center & Right Column: Virtual Lab Controls, Beaker & Spectrophotometer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Virtual Reaction Chamber' : 'Bilik Reaksi Virtual'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en' ? 'Adjust environmental variables and run indicator assay.' : 'Atur variabel lingkungan dan lakukan uji indikator.'}
                </p>
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isSimulating ? (lang === 'en' ? 'Simulating...' : 'Menguji...') : (lang === 'en' ? 'Run Test Reaction' : 'Uji Reaksi')}</span>
              </button>
            </div>

            {/* Environment Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Temperature Slider */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-rose-400" />
                    <span>{lang === 'en' ? 'Temperature (°C):' : 'Suhu Reaksi (°C):'}</span>
                  </span>
                  <span className={`text-sm font-mono font-bold ${
                    temperature >= 60 ? 'text-rose-400' : temperature === 37 ? 'text-emerald-400' : 'text-amber-300'
                  }`}>
                    {temperature} °C
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="80"
                  step="1"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(Number(e.target.value));
                    setHasRunTest(false);
                  }}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0°C (Ice)</span>
                  <span className="text-emerald-400">37°C (Body)</span>
                  <span className="text-rose-400">80°C (Boiling)</span>
                </div>
              </div>

              {/* pH Slider */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'en' ? 'Solution pH Value:' : 'Nilai Keasaman (pH):'}</span>
                  </span>
                  <span className={`text-sm font-mono font-bold ${
                    pH <= 3 ? 'text-rose-400' : pH >= 8 ? 'text-teal-400' : 'text-emerald-400'
                  }`}>
                    pH {pH}
                  </span>
                </div>

                <input
                  type="range"
                  min="1.0"
                  max="12.0"
                  step="0.1"
                  value={pH}
                  onChange={(e) => {
                    setPH(Number(e.target.value));
                    setHasRunTest(false);
                  }}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span className="text-rose-400">1.0 (Stomach Acid)</span>
                  <span className="text-emerald-400">7.0 (Neutral)</span>
                  <span className="text-purple-400">12.0 (Strong Alkali)</span>
                </div>
              </div>
            </div>

            {/* Virtual Laboratory Beaker & Spectrophotometer Display */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Visual Beaker */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">
                    {lang === 'en' ? 'CHEMICAL REACTION VESSEL' : 'TABUNG REAKSI UJI'}
                  </div>

                  <div className="w-28 h-36 border-4 border-slate-600 border-t-0 rounded-b-3xl relative overflow-hidden flex items-end justify-center shadow-2xl bg-slate-900/60">
                    {/* Liquid fill */}
                    <div 
                      className="w-full transition-all duration-700 relative flex items-center justify-center"
                      style={{ 
                        height: '75%', 
                        backgroundColor: hasRunTest ? reagentVisual.color : '#334155',
                        boxShadow: `inset 0 0 20px rgba(0,0,0,0.5)`
                      }}
                    >
                      {/* Animated bubbles if reacting */}
                      {isSimulating && (
                        <div className="absolute inset-0 flex items-center justify-around animate-pulse">
                          <span className="text-xs">🫧</span>
                          <span className="text-xs">🫧</span>
                        </div>
                      )}
                      <span className="text-xs font-mono font-bold text-white drop-shadow">
                        {hasRunTest ? `${currentResult.rate}%` : 'Ready'}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-300 mt-3 text-center">
                    {reagentVisual.test}
                  </div>
                  <div className="text-[11px] text-slate-400 text-center">
                    {hasRunTest ? reagentVisual.label : (lang === 'en' ? 'Awaiting test trigger' : 'Menunggu uji')}
                  </div>
                </div>

                {/* Velocity Gauge & Kinetics Readout */}
                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400 font-semibold">
                        {lang === 'en' ? 'Reaction Velocity (V / Vmax):' : 'Kecepatan Reaksi (V / Vmax):'}
                      </span>
                      <span className="text-lg font-mono font-bold text-amber-400">
                        {currentResult.rate}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          currentResult.rate >= 80 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                            : currentResult.rate >= 40 
                            ? 'bg-amber-500' 
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${currentResult.rate}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        currentResult.status === 'optimal'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : currentResult.status === 'denatured'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {currentResult.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong>{lang === 'en' ? 'Biochemical Explanation:' : 'Penjelasan Biokimia:'}</strong>{' '}
                    {currentResult.message[lang]}
                  </div>
                </div>
              </div>
            </div>

            {/* Quests Section */}
            <div className="pt-2 border-t border-slate-700/80">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Enzyme Laboratory Investigations:' : 'Misi Penyelidikan Laboratorium:'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quests.map((quest) => {
                  const isDone = completedQuests.includes(quest.id);
                  return (
                    <div
                      key={quest.id}
                      className={`p-3.5 rounded-xl border text-xs transition-all ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-700/80 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{quest.title[lang]}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500">TODO</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300 mt-1">{quest.desc[lang]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
