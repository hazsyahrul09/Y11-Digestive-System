import React, { useState, useEffect } from 'react';
import { OrganInfo, Language } from '../../types/biology';
import { ORGANS_DATA } from '../../data/biologyData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Activity, 
  Layers, 
  Timer, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface AnatomyExplorerProps {
  lang: Language;
  onAddScore: (points: number, stars: number) => void;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({ lang, onAddScore }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'race'>('explore');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganInfo>(ORGANS_DATA[0]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'canal' | 'accessory'>('all');

  // Race Mode States
  const [isRaceActive, setIsRaceActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [targetOrganIndex, setTargetOrganIndex] = useState<number>(0);
  const [raceScore, setRaceScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [raceCompleted, setRaceCompleted] = useState<boolean>(false);
  const [raceFeedback, setRaceFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const filteredOrgans = ORGANS_DATA.filter(o => {
    if (categoryFilter === 'canal') return o.category === 'alimentary_canal';
    if (categoryFilter === 'accessory') return o.category === 'accessory_organ';
    return true;
  });

  // Race Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRaceActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRaceActive && timeLeft === 0) {
      setIsRaceActive(false);
      setRaceCompleted(true);
      sound.fanfare();
      confetti({ particleCount: 70, spread: 60 });
      onAddScore(raceScore, Math.min(3, Math.floor(raceScore / 200)));
    }
    return () => clearInterval(timer);
  }, [isRaceActive, timeLeft, raceScore, onAddScore]);

  const startRace = () => {
    sound.click();
    setTimeLeft(45);
    setRaceScore(0);
    setStreak(0);
    setRaceCompleted(false);
    setRaceFeedback(null);
    setTargetOrganIndex(Math.floor(Math.random() * ORGANS_DATA.length));
    setIsRaceActive(true);
  };

  const handleOrganPinClick = (organ: OrganInfo) => {
    if (activeTab === 'explore') {
      sound.click();
      setSelectedOrgan(organ);
    } else if (activeTab === 'race' && isRaceActive) {
      const targetOrgan = ORGANS_DATA[targetOrganIndex];
      if (organ.id === targetOrgan.id) {
        sound.success();
        const earnedPoints = 50 + streak * 10;
        setRaceScore(prev => prev + earnedPoints);
        setStreak(prev => prev + 1);
        setRaceFeedback({
          isCorrect: true,
          text: lang === 'en' ? `Correct! +${earnedPoints} pts!` : `Tepat! +${earnedPoints} poin!`
        });

        // Pick next random target
        let nextIdx = Math.floor(Math.random() * ORGANS_DATA.length);
        if (nextIdx === targetOrganIndex) {
          nextIdx = (nextIdx + 1) % ORGANS_DATA.length;
        }
        setTargetOrganIndex(nextIdx);
      } else {
        sound.error();
        setStreak(0);
        setRaceFeedback({
          isCorrect: false,
          text: lang === 'en' 
            ? `That was ${organ.name.en}! Find ${targetOrgan.name.en}` 
            : `Itu adalah ${organ.name.id}! Cari ${targetOrgan.name.id}`
        });
      }

      setTimeout(() => setRaceFeedback(null), 1200);
    }
  };

  const targetOrgan = ORGANS_DATA[targetOrganIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-white">
              {lang === 'en' ? 'Digestive Anatomy & Speed Pin Challenge' : 'Anatomi Sistem Cerna & Tantangan Pin Cepat'}
            </h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {lang === 'en'
              ? 'Explore 3D-inspired anatomical diagrams of the human digestive tract or test your recognition speed in the timed pin-point race!'
              : 'Jelajahi struktur organ saluran pencernaan atau uji kecepatan refleksmu dalam lomba tebak organ dengan waktu terbatas!'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('explore');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'explore'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Explore Anatomy' : 'Eksplorasi Anatomi'}
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('race');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'race'
                ? 'bg-amber-500 text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Speed Pin Race' : 'Lomba Pin Cepat'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Anatomical Body Silhouette and Interactive Pin Diagram */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 border border-slate-700 shadow-2xl flex flex-col items-center relative overflow-hidden">
          {/* Race Prompt Bar if Race Active */}
          {activeTab === 'race' && (
            <div className="w-full mb-4 bg-slate-800 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {lang === 'en' ? 'TARGET ORGAN TO PINPOINT:' : 'ORGAN TARGET YANG HARUS DIKLIK:'}
                </span>
                <span className="text-base font-bold text-white font-heading">
                  {targetOrgan.name[lang]}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                  <Timer className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                  {raceScore} pts
                </div>
              </div>
            </div>
          )}

          {/* Feedback Overlay */}
          {raceFeedback && (
            <div className={`absolute top-20 z-20 px-4 py-2 rounded-xl text-xs font-bold shadow-lg animate-bounce ${
              raceFeedback.isCorrect ? 'bg-emerald-500 text-slate-900' : 'bg-rose-500 text-white'
            }`}>
              {raceFeedback.text}
            </div>
          )}

          {/* Body SVG & Interactive Organ Nodes */}
          <div className="relative w-full max-w-[360px] h-[480px] bg-slate-950 rounded-2xl border border-slate-800/80 p-2 flex items-center justify-center">
            {/* SVG Anatomy Map */}
            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow">
              {/* Human Torso Silhouette */}
              <path
                d="M 130 50 C 130 20, 270 20, 270 50 C 270 70, 250 85, 250 100 C 290 120, 310 160, 310 240 C 310 320, 290 420, 270 480 C 260 500, 240 500, 220 500 L 180 500 C 160 500, 140 500, 130 480 C 110 420, 90 320, 90 240 C 90 160, 110 120, 150 100 C 150 85, 130 70, 130 50 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* Alimentary Canal Digestive Track SVG paths */}
              {/* Mouth & Esophagus */}
              <path
                d="M 200 65 L 200 180"
                fill="none"
                stroke={selectedOrgan.id === 'esophagus' || selectedOrgan.id === 'mouth' ? '#f59e0b' : '#64748b'}
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Stomach */}
              <path
                d="M 200 180 C 240 180, 260 210, 230 240 C 200 270, 190 240, 200 230 Z"
                fill={selectedOrgan.id === 'stomach' ? '#f43f5e' : '#be123c'}
                fillOpacity={selectedOrgan.id === 'stomach' ? '0.85' : '0.45'}
                stroke="#e11d48"
                strokeWidth="2.5"
              />

              {/* Liver */}
              <path
                d="M 135 175 C 190 170, 200 190, 185 220 C 170 240, 130 230, 135 175 Z"
                fill={selectedOrgan.id === 'liver' ? '#b45309' : '#78350f'}
                fillOpacity={selectedOrgan.id === 'liver' ? '0.85' : '0.45'}
                stroke="#d97706"
                strokeWidth="2.5"
              />

              {/* Gallbladder */}
              <circle
                cx="165"
                cy="235"
                r="10"
                fill={selectedOrgan.id === 'gallbladder' ? '#84cc16' : '#4d7c0f'}
                stroke="#a3e635"
                strokeWidth="2"
              />

              {/* Pancreas */}
              <path
                d="M 195 245 C 235 240, 245 255, 215 260 Z"
                fill={selectedOrgan.id === 'pancreas' ? '#fbbf24' : '#d97706'}
                fillOpacity={selectedOrgan.id === 'pancreas' ? '0.9' : '0.5'}
                stroke="#f59e0b"
                strokeWidth="2"
              />

              {/* Duodenum */}
              <path
                d="M 200 235 C 235 235, 240 270, 200 280"
                fill="none"
                stroke={selectedOrgan.id === 'duodenum' ? '#14b8a6' : '#0d9488'}
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Jejunum & Ileum (coiled small intestine) */}
              <circle
                cx="200"
                cy="325"
                r="40"
                fill={selectedOrgan.id === 'jejunum_ileum' ? '#ec4899' : '#9d174d'}
                fillOpacity={selectedOrgan.id === 'jejunum_ileum' ? '0.85' : '0.4'}
                stroke="#db2777"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />

              {/* Large Intestine (Colon frame) */}
              <path
                d="M 155 360 L 155 280 C 155 270, 245 270, 245 280 L 245 370 C 245 385, 210 390, 200 420"
                fill="none"
                stroke={selectedOrgan.id === 'colon' ? '#38bdf8' : '#0284c7'}
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={selectedOrgan.id === 'colon' ? '0.9' : '0.45'}
              />

              {/* Rectum & Anus */}
              <line
                x1="200"
                y1="420"
                x2="200"
                y2="450"
                stroke={selectedOrgan.id === 'rectum_anus' ? '#a855f7' : '#6b21a8'}
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Interactive Glowing Organ Targets / Pins */}
              {ORGANS_DATA.map((organ) => {
                const isSelected = selectedOrgan.id === organ.id;
                const isTarget = activeTab === 'race' && targetOrgan.id === organ.id;
                const { x, y } = organ.highlightCoordinates;
                return (
                  <g
                    key={organ.id}
                    onClick={() => handleOrganPinClick(organ)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring when active or targeted */}
                    {(isSelected || (activeTab === 'race' && isTarget)) && (
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        className="animate-ping opacity-75 origin-center"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill={isSelected ? '#f59e0b' : '#1e293b'}
                      stroke={isSelected ? '#ffffff' : '#64748b'}
                      strokeWidth="2.5"
                      className="group-hover:scale-125 transition-transform"
                    />
                    <text
                      x={x}
                      y={y + 3.5}
                      fontSize="9"
                      fontWeight="bold"
                      fill={isSelected ? '#0f172a' : '#ffffff'}
                      textAnchor="middle"
                    >
                      {organ.name.en.charAt(0)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Race Start / Restart Button */}
          {activeTab === 'race' && !isRaceActive && (
            <div className="w-full mt-4 text-center">
              <button
                onClick={startRace}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold text-sm shadow-xl transition-all"
              >
                {raceCompleted ? (lang === 'en' ? 'Play Again!' : 'Main Lagi!') : (lang === 'en' ? 'Start 45s Anatomy Race!' : 'Mulai Lomba Anatomi 45 Detik!')}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Organ List & Comprehensive Scientific Inspector */}
        <div className="lg:col-span-6 space-y-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setCategoryFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                categoryFilter === 'all'
                  ? 'bg-slate-700 text-white border-slate-600'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {lang === 'en' ? 'All Organs (10)' : 'Semua Organ (10)'}
            </button>
            <button
              onClick={() => {
                sound.click();
                setCategoryFilter('canal');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                categoryFilter === 'canal'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {lang === 'en' ? 'Alimentary Canal' : 'Saluran Utama'}
            </button>
            <button
              onClick={() => {
                sound.click();
                setCategoryFilter('accessory');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                categoryFilter === 'accessory'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {lang === 'en' ? 'Accessory Glands' : 'Kelenjar Aksesori'}
            </button>
          </div>

          {/* Organ Quick Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {filteredOrgans.map((organ) => {
              const isSelected = selectedOrgan.id === organ.id;
              return (
                <button
                  key={organ.id}
                  onClick={() => {
                    sound.click();
                    setSelectedOrgan(organ);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 border-amber-400 shadow-md scale-105'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {organ.name[lang]}
                </button>
              );
            })}
          </div>

          {/* Detailed Organ Inspector Card */}
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                  {selectedOrgan.category === 'alimentary_canal' 
                    ? (lang === 'en' ? 'Alimentary Tract' : 'Saluran Pencernaan') 
                    : (lang === 'en' ? 'Accessory Organ' : 'Organ Aksesori')}
                </span>
                <h2 className="text-xl font-bold font-heading text-white mt-1">
                  {selectedOrgan.name[lang]}
                </h2>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400">{lang === 'en' ? 'Working pH:' : 'pH Operasional:'}</span>
                <div className="text-sm font-mono font-bold text-emerald-400">{selectedOrgan.pH}</div>
              </div>
            </div>

            {/* Mechanical vs Chemical Digestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Mechanical Action:' : 'Aksi Mekanik:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedOrgan.mechanicalAction[lang]}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Chemical Action:' : 'Aksi Kimiawi:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedOrgan.chemicalAction[lang]}
                </p>
              </div>
            </div>

            {/* Secretions & Enzymes */}
            <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div>
                <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Biological Secretions:' : 'Sekresi Cairan:'}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedOrgan.secretions.map((sec, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-teal-300 border border-slate-700 text-[11px]">
                      {sec[lang]}
                    </span>
                  ))}
                </div>
              </div>

              {selectedOrgan.enzymes.length > 0 && (
                <div className="pt-1.5 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Secreted Enzymes:' : 'Enzim Dihasilkan:'}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedOrgan.enzymes.map((enz, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/60 text-[11px] font-mono">
                        ⚡ {enz}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Grade 11 High-Yield Facts */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Grade 11 High-Yield Facts:' : 'Fakta Kunci Ujian Biologi SMA:'}</span>
              </span>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                {selectedOrgan.keyFacts[lang].map((fact, idx) => (
                  <li key={idx} className="leading-relaxed">{fact}</li>
                ))}
              </ul>
            </div>

            {/* Disorders */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-slate-700/80">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Common Clinical Pathology:' : 'Kelainan & Penyakit Klinis:'}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedOrgan.disorders[lang].map((dis, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-800/40 text-[11px]">
                    {dis}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
