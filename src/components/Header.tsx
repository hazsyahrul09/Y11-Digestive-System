import React from 'react';
import { GameMode, Language } from '../types/biology';
import { sound } from '../utils/audio';
import { 
  Compass, 
  FlaskConical, 
  Stethoscope, 
  Activity, 
  GraduationCap, 
  Volume2, 
  VolumeX, 
  Languages, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Trophy
} from 'lucide-react';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  lang: Language;
  onToggleLang: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  totalScore: number;
  unlockedStars: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  lang,
  onToggleLang,
  audioEnabled,
  onToggleAudio,
  totalScore,
  unlockedStars
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    sound.click();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const navItems = [
    {
      id: 'journey' as GameMode,
      label: lang === 'en' ? 'Food Journey' : 'Petualangan Bolus',
      icon: Compass,
      color: 'from-amber-500 to-orange-500',
      badge: 'Game'
    },
    {
      id: 'lab' as GameMode,
      label: lang === 'en' ? 'Enzyme Lab' : 'Lab Enzim',
      icon: FlaskConical,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Sim'
    },
    {
      id: 'clinic' as GameMode,
      label: lang === 'en' ? 'Digestive Clinic' : 'Klinik Pasien',
      icon: Stethoscope,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Case'
    },
    {
      id: 'anatomy' as GameMode,
      label: lang === 'en' ? 'Anatomy & Race' : 'Anatomi & Lomba',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      badge: 'Interactive'
    },
    {
      id: 'quiz' as GameMode,
      label: lang === 'en' ? 'Classroom Exam' : 'Ujian Kelas',
      icon: GraduationCap,
      color: 'from-yellow-500 to-amber-600',
      badge: 'Cert'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Grade 11 Badge */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => onSelectMode('journey')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl">🧬</span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
                  DigestiQuest
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                  {lang === 'en' ? 'Grade 11 Biology' : 'Biologi Kelas 11'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                {lang === 'en' ? 'Human Alimentary Canal & Physiology Learning Studio' : 'Sistem Pencernaan & Fisiologi Tubuh Manusia'}
              </p>
            </div>
          </div>

          {/* Quick Score & Stars Badges */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-semibold text-amber-300 shadow-inner">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{totalScore}</span>
              <span className="text-[10px] text-slate-400 font-normal uppercase">XP</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-semibold text-yellow-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>{unlockedStars}</span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => {
                sound.click();
                onToggleLang();
              }}
              title={lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase font-bold">{lang}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
                if (!audioEnabled) sound.click();
              }}
              title={audioEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              className={`p-1.5 rounded-lg border transition-colors ${
                audioEnabled
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-800 text-slate-500 border-slate-800 hover:bg-slate-700'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Teacher Projector / Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={lang === 'en' ? 'Classroom Projector Mode' : 'Mode Proyektor Kelas'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.click();
                  onSelectMode(item.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r text-white shadow-lg shadow-black/30 ring-2 ring-white/20 ' + item.color
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider ${
                    isActive ? 'bg-black/25 text-white' : 'bg-slate-700/60 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
