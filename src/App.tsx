/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameMode, Language } from './types/biology';
import { Header } from './components/Header';
import { JourneyGame } from './components/JourneyGame/JourneyGame';
import { EnzymeLab } from './components/EnzymeLab/EnzymeLab';
import { DigestiveClinic } from './components/DigestiveClinic/DigestiveClinic';
import { AnatomyExplorer } from './components/AnatomyExplorer/AnatomyExplorer';
import { ClassroomQuiz } from './components/ClassroomQuiz/ClassroomQuiz';
import { sound } from './utils/audio';
import { Compass, FlaskConical, Stethoscope, Activity, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('journey');
  const [lang, setLang] = useState<Language>('en');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [totalScore, setTotalScore] = useState<number>(100);
  const [unlockedStars, setUnlockedStars] = useState<number>(3);

  const handleToggleLang = () => {
    setLang(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const handleToggleAudio = () => {
    const next = !audioEnabled;
    sound.enabled = next;
    setAudioEnabled(next);
  };

  const handleAddScore = (points: number, stars: number) => {
    setTotalScore(prev => prev + points);
    if (stars > 0) {
      setUnlockedStars(prev => prev + stars);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-900">
      {/* Top Navigation Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        lang={lang}
        onToggleLang={handleToggleLang}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        totalScore={totalScore}
        unlockedStars={unlockedStars}
      />

      {/* Main Learning & Gaming Canvas */}
      <main className="flex-1 pb-12">
        {currentMode === 'journey' && (
          <JourneyGame lang={lang} onAddScore={handleAddScore} />
        )}
        {currentMode === 'lab' && (
          <EnzymeLab lang={lang} onAddScore={handleAddScore} />
        )}
        {currentMode === 'clinic' && (
          <DigestiveClinic lang={lang} onAddScore={handleAddScore} />
        )}
        {currentMode === 'anatomy' && (
          <AnatomyExplorer lang={lang} onAddScore={handleAddScore} />
        )}
        {currentMode === 'quiz' && (
          <ClassroomQuiz lang={lang} onAddScore={handleAddScore} />
        )}
      </main>

      {/* Teacher & Classroom Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧬</span>
            <div>
              <span className="font-bold text-white">DigestiQuest</span>
              <span className="mx-2">•</span>
              <span>{lang === 'en' ? 'Grade 11 Biology Digestive Systems Learning Platform' : 'Platform Pembelajaran Biologi Sistem Pencernaan SMA'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-medium">
              {lang === 'en' ? 'Aligned to High School Biology Curriculum' : 'Sesuai Kurikulum Biologi SMA / High School'}
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => {
                sound.click();
                setTotalScore(100);
                setUnlockedStars(3);
              }}
              className="hover:text-slate-200 transition-colors"
            >
              {lang === 'en' ? 'Reset Progress' : 'Reset Nilai'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
