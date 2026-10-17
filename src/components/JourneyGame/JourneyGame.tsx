import React, { useState, useEffect } from 'react';
import { FoodMeal, Language } from '../../types/biology';
import { MEALS_DATA } from '../../data/biologyData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Heart, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Droplets,
  HelpCircle
} from 'lucide-react';

interface JourneyGameProps {
  lang: Language;
  onAddScore: (points: number, stars: number) => void;
}

export const JourneyGame: React.FC<JourneyGameProps> = ({ lang, onAddScore }) => {
  const [selectedMeal, setSelectedMeal] = useState<FoodMeal>(MEALS_DATA[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  // Game states per step
  // Step 0: Meal Selection
  // Step 1: Mouth - Chewing & Salivary Amylase
  const [chewCount, setChewCount] = useState<number>(0);
  const [amylaseApplied, setAmylaseApplied] = useState<boolean>(false);
  const [bolusFormed, setBolusFormed] = useState<boolean>(false);

  // Step 2: Esophagus - Epiglottis & Peristalsis
  const [epiglottisDown, setEpiglottisDown] = useState<boolean>(false);
  const [bolusY, setBolusY] = useState<number>(0);
  const [peristalsisSuccess, setPeristalsisSuccess] = useState<boolean>(false);
  const [chokingWarning, setChokingWarning] = useState<boolean>(false);

  // Step 3: Stomach - Acid & Pepsin
  const [stomachPH, setStomachPH] = useState<number>(6.5);
  const [pepsinActivated, setPepsinActivated] = useState<boolean>(false);
  const [mucusShield, setMucusShield] = useState<number>(100);
  const [churnProgress, setChurnProgress] = useState<number>(0);

  // Step 4: Duodenum - Pancreas & Bile Emulsification
  const [bicarbonateAdded, setBicarbonateAdded] = useState<boolean>(false);
  const [bileEmulsified, setBileEmulsified] = useState<boolean>(false);
  const [pancreaticEnzymesAdded, setPancreaticEnzymesAdded] = useState<boolean>(false);

  // Step 5: Villi Nutrient Absorption (Mini Arcade)
  const [absorbedNutrients, setAbsorbedNutrients] = useState<{
    glucose: number;
    aminoAcids: number;
    fattyAcids: number;
  }>({ glucose: 0, aminoAcids: 0, fattyAcids: 0 });
  const [absorbedFiberWarning, setAbsorbedFiberWarning] = useState<boolean>(false);

  // Step 6: Colon - Water Reabsorption & Microbiome
  const [waterReabsorbedPercent, setWaterReabsorbedPercent] = useState<number>(50);
  const [vitaminsSynthesized, setVitaminsSynthesized] = useState<boolean>(false);

  // Results
  const [stageScore, setStageScore] = useState<number>(0);

  // Text helpers
  const t = {
    title: lang === 'en' ? 'The Great Bolus Odyssey' : 'Petualangan Mengarungi Saluran Cerna',
    subtitle: lang === 'en' 
      ? 'Guide your meal through mechanical and chemical digestion across all 6 alimentary checkpoints!' 
      : 'Bimbing makananmu melewati pencernaan mekanik & kimiawi di 6 pos penting saluran pencernaan!',
    selectMealTitle: lang === 'en' ? '1. Select Your Test Meal:' : '1. Pilih Makanan Ujimu:',
    startJourney: lang === 'en' ? 'Start Alimentary Journey' : 'Mulai Petualangan Cerna',
    nextStage: lang === 'en' ? 'Proceed to Next Checkpoint' : 'Lanjut ke Pos Berikutnya',
    stepNames: [
      lang === 'en' ? 'Meal Selection' : 'Pilih Makanan',
      lang === 'en' ? 'Oral Cavity (Mouth)' : 'Rongga Mulut',
      lang === 'en' ? 'Pharynx & Esophagus' : 'Esofagus & Menelan',
      lang === 'en' ? 'Stomach Acid Vault' : 'Lambung & Kimus',
      lang === 'en' ? 'Duodenum Lab' : 'Duodenum & Empedu',
      lang === 'en' ? 'Intestinal Villi' : 'Penyerapan Vili Usus',
      lang === 'en' ? 'Colon & Microbiome' : 'Kolon & Mikrobiota',
      lang === 'en' ? 'Digestion Completed!' : 'Pencernaan Tuntas!'
    ]
  };

  // Step 1: Chewing action
  const handleChew = () => {
    sound.chew();
    setChewCount(prev => {
      const next = prev + 1;
      if (next >= 8 && amylaseApplied && !bolusFormed) {
        setBolusFormed(true);
        sound.success();
        setStageScore(s => s + 50);
      }
      return next;
    });
  };

  const handleApplyAmylase = () => {
    sound.squirt();
    setAmylaseApplied(true);
    if (chewCount >= 8 && !bolusFormed) {
      setBolusFormed(true);
      sound.success();
      setStageScore(s => s + 50);
    }
  };

  // Step 2: Peristalsis handler
  const handleToggleEpiglottis = () => {
    sound.click();
    setEpiglottisDown(prev => !prev);
    setChokingWarning(false);
  };

  const handlePushPeristalsis = () => {
    if (!epiglottisDown) {
      sound.error();
      setChokingWarning(true);
      return;
    }
    sound.peristalsis();
    setBolusY(prev => {
      const next = prev + 35;
      if (next >= 100) {
        setPeristalsisSuccess(true);
        sound.success();
        setStageScore(s => s + 60);
      }
      return next;
    });
  };

  // Step 3: Stomach handlers
  const handlePumpAcid = () => {
    sound.squirt();
    setStomachPH(prev => {
      const next = Math.max(1.8, Number((prev - 0.8).toFixed(1)));
      if (next <= 2.2 && !pepsinActivated) {
        setPepsinActivated(true);
        sound.success();
        setStageScore(s => s + 60);
      }
      return next;
    });
  };

  const handleChurnStomach = () => {
    sound.chew();
    setChurnProgress(prev => {
      const next = Math.min(100, prev + 25);
      if (next === 100) {
        sound.success();
        setStageScore(s => s + 60);
      }
      return next;
    });
  };

  // Step 4: Duodenum handlers
  const handleAddBicarbonate = () => {
    sound.squirt();
    setBicarbonateAdded(true);
    sound.success();
    setStageScore(s => s + 40);
  };

  const handleAddBile = () => {
    sound.squirt();
    setBileEmulsified(true);
    sound.success();
    setStageScore(s => s + 50);
  };

  const handleAddPancreaticEnzymes = () => {
    sound.squirt();
    setPancreaticEnzymesAdded(true);
    sound.success();
    setStageScore(s => s + 50);
  };

  // Step 5: Absorption game
  const handleAbsorb = (type: 'glucose' | 'aminoAcids' | 'fattyAcids') => {
    sound.click();
    setAbsorbedNutrients(prev => ({
      ...prev,
      [type]: Math.min(100, prev[type] + 25)
    }));
    sound.success();
    setStageScore(s => s + 25);
  };

  const handleAbsorbFiber = () => {
    sound.error();
    setAbsorbedFiberWarning(true);
    setTimeout(() => setAbsorbedFiberWarning(false), 2500);
  };

  // Step 6: Colon handlers
  const handleSynthesizeVitamins = () => {
    sound.success();
    setVitaminsSynthesized(true);
    setStageScore(s => s + 50);
  };

  // Complete game
  const handleFinishJourney = () => {
    sound.fanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onAddScore(stageScore + 100, 3);
  };

  const resetGame = () => {
    sound.click();
    setCurrentStep(0);
    setChewCount(0);
    setAmylaseApplied(false);
    setBolusFormed(false);
    setEpiglottisDown(false);
    setBolusY(0);
    setPeristalsisSuccess(false);
    setChokingWarning(false);
    setStomachPH(6.5);
    setPepsinActivated(false);
    setMucusShield(100);
    setChurnProgress(0);
    setBicarbonateAdded(false);
    setBileEmulsified(false);
    setPancreaticEnzymesAdded(false);
    setAbsorbedNutrients({ glucose: 0, aminoAcids: 0, fattyAcids: 0 });
    setWaterReabsorbedPercent(50);
    setVitaminsSynthesized(false);
    setStageScore(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Title & Progress Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍔 ➡️ 💩</span>
              <h1 className="text-xl md:text-2xl font-bold font-heading text-white">{t.title}</h1>
            </div>
            <p className="text-sm text-slate-300 mt-1">{t.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Journey XP:' : 'XP Petualangan:'} +{stageScore}</span>
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Restart' : 'Ulang'}</span>
            </button>
          </div>
        </div>

        {/* Alimentary Canal Progress Bar */}
        <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-1.5">
          {t.stepNames.map((name, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl text-center border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                    : isDone
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono font-bold">
                  {idx === 0 ? 'START' : idx === 7 ? 'FINISH' : `STAGE ${idx}`}
                </div>
                <div className="text-[11px] font-semibold truncate mt-0.5">{name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Game Stage Container */}
      <div className="bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden p-6 md:p-8">
        {/* STEP 0: MEAL SELECTION */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-5xl">🍽️</span>
              <h2 className="text-2xl font-bold font-heading text-white mt-3">{t.selectMealTitle}</h2>
              <p className="text-sm text-slate-300 mt-2">
                {lang === 'en'
                  ? 'Each food item contains different proportions of macromolecules (carbohydrates, proteins, lipids) and fibers that behave differently inside the digestive tract.'
                  : 'Setiap makanan memiliki komposisi makromolekul (karbohidrat, protein, lipid) dan serat berbeda yang akan diproses di setiap stasiun pencernaan.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
              {MEALS_DATA.map((meal) => {
                const isSelected = selectedMeal.id === meal.id;
                return (
                  <div
                    key={meal.id}
                    onClick={() => {
                      sound.click();
                      setSelectedMeal(meal);
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-4xl text-center mb-3">{meal.emoji}</div>
                    <h3 className="font-bold text-white text-base text-center">{meal.name[lang]}</h3>
                    <p className="text-xs text-slate-300 mt-2 text-center leading-relaxed">
                      {meal.description[lang]}
                    </p>

                    {/* Nutrient Composition Badges */}
                    <div className="mt-4 space-y-1.5 text-[11px] border-t border-slate-700/80 pt-3">
                      <div className="flex justify-between text-amber-300">
                        <span>{lang === 'en' ? 'Carbohydrate (Starch):' : 'Karbohidrat (Pati):'}</span>
                        <span className="font-mono font-bold">{meal.carbohydrates}%</span>
                      </div>
                      <div className="flex justify-between text-rose-300">
                        <span>{lang === 'en' ? 'Protein:' : 'Protein:'}</span>
                        <span className="font-mono font-bold">{meal.protein}%</span>
                      </div>
                      <div className="flex justify-between text-yellow-300">
                        <span>{lang === 'en' ? 'Lipids (Fats):' : 'Lemak / Lipid:'}</span>
                        <span className="font-mono font-bold">{meal.lipids}%</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span>{lang === 'en' ? 'Dietary Fiber:' : 'Serat Pangan:'}</span>
                        <span className="font-mono font-bold">{meal.fiber}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(1);
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold text-base shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02]"
              >
                <span>{t.startJourney} ({selectedMeal.name[lang]})</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: ORAL CAVITY */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 1 of 6' : 'Pos 1 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Oral Cavity: Mastication & Salivary Amylase' : 'Rongga Mulut: Mastikasi & Enzim Ptialin'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Local pH:' : 'pH Lokal:'}</span>
                <div className="text-sm font-mono font-bold text-emerald-400">6.8 (Neutral)</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl text-xs text-blue-200 leading-relaxed flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong>Grade 11 Key Concept:</strong> {lang === 'en' 
                  ? 'Digestion begins both mechanically (teeth crushing food to expand surface area) and chemically (Salivary Amylase / Ptyalin hydrolyzing alpha-1,4 glycosidic bonds in starch into maltose). Mucus lubricates the food into a round, swallowable mass called a Bolus.'
                  : 'Pencernaan dimulai secara mekanik (gigi mengunyah untuk memperluas area permukaan) dan kimiawi (enzim ptialin memecah amilum menjadi maltosa). Mukus merekatkan makanan menjadi gumpalan bulat licin bernama Bolus.'}
              </div>
            </div>

            {/* Interactive Mouth Chamber */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 text-center relative overflow-hidden">
              <div className="text-6xl mb-4 transition-transform duration-150 transform hover:scale-110 select-none">
                {bolusFormed ? '🟢 (Cohesive Bolus Formed!)' : amylaseApplied ? '🥣 💧' : '🦷 👄 🥖'}
              </div>

              <div className="max-w-md mx-auto space-y-3">
                {/* Chewing meter */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>{lang === 'en' ? 'Mechanical Mastication (Teeth):' : 'Penghancuran Gigi (Mekanik):'}</span>
                    <span className="font-mono text-amber-400">{chewCount} / 8 Chews</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-200" 
                      style={{ width: `${Math.min(100, (chewCount / 8) * 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Amylase status */}
                <div className="flex items-center justify-between text-xs bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-300">
                    {lang === 'en' ? 'Salivary Amylase (Ptyalin):' : 'Enzim Amilase (Ptialin):'}
                  </span>
                  <span className={`font-bold ${amylaseApplied ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {amylaseApplied ? (lang === 'en' ? '✓ Injected (Starch -> Maltose)' : '✓ Aktif (Pati -> Maltosa)') : (lang === 'en' ? 'Not Injected' : 'Belum Ditambahkan')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleChew}
                  disabled={chewCount >= 8}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  🦷 {lang === 'en' ? 'Chew with Teeth (Click)' : 'Kunyah dengan Gigi'}
                </button>

                <button
                  onClick={handleApplyAmylase}
                  disabled={amylaseApplied}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all"
                >
                  💧 {lang === 'en' ? 'Secrete Salivary Amylase' : 'Keluarkan Enzim Ptialin'}
                </button>
              </div>

              {bolusFormed && (
                <div className="mt-5 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-sm font-semibold animate-pulse">
                  🎉 {lang === 'en' ? 'Great job! Bolus is lubricated with mucin and ready to swallow!' : 'Hebat! Bolus telah terbentuk licin dan siap ditelan!'}
                </div>
              )}
            </div>

            {/* Next Stage Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(2);
                }}
                disabled={!bolusFormed}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm transition-all"
              >
                <span>{t.nextStage}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PHARYNX & ESOPHAGUS */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 2 of 6' : 'Pos 2 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Deglutition & Esophageal Peristalsis' : 'Menelan & Gerak Peristaltik Esofagus'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Transit Time:' : 'Waktu Tempuh:'}</span>
                <div className="text-sm font-mono font-bold text-purple-400">4 - 8 Seconds</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-purple-950/40 border border-purple-800/50 p-4 rounded-2xl text-xs text-purple-200 leading-relaxed flex gap-3">
              <span className="text-xl">🫁</span>
              <div>
                <strong>Grade 11 Key Concept:</strong> {lang === 'en'
                  ? 'Deglutition is a reflex action. The cartilaginous Epiglottis MUST flap over the larynx to prevent food from choking the trachea. Once inside the esophagus, involuntary waves of circular and longitudinal smooth muscle contractions (Peristalsis) squeeze the bolus down into the stomach!'
                  : 'Menelan adalah gerak refleks. Epiglotis WAJIB menutup laring agar makanan tidak masuk ke tenggorokan (trakea). Selanjutnya gelombang kontraksi otot polos sirkuler dan longitudinal (Peristaltik) memeras bolus turun ke lambung!'}
              </div>
            </div>

            {/* Interactive Esophagus Tube */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 relative">
              {chokingWarning && (
                <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>
                    {lang === 'en' 
                      ? 'DANGER! You must flip the EPIGLOTTIS DOWN first to protect the lungs before pushing the bolus!' 
                      : 'BAHAYA! Kamu harus MENUTUP EPIGLOTIS terlebih dahulu agar makanan tidak masuk ke paru-paru!'}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* SVG Visualizer of Esophagus & Epiglottis */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[220px] relative">
                  <div className="text-xs text-slate-400 font-mono mb-2">
                    {lang === 'en' ? 'ALIMENTARY CANAL CROSS-SECTION' : 'PENAMPANG KERONGKONGAN'}
                  </div>

                  {/* Epiglottis valve indicator */}
                  <div className="w-full flex justify-between items-center px-6 py-2 bg-slate-900 rounded-lg border border-slate-700 mb-3">
                    <span className="text-xs text-slate-300 font-semibold">
                      {lang === 'en' ? 'Epiglottis Gate:' : 'Katup Epiglotis:'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      epiglottisDown ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {epiglottisDown 
                        ? (lang === 'en' ? 'CLOSED (Trachea Protected)' : 'TERTUTUP (Trakea Aman)')
                        : (lang === 'en' ? 'OPEN (Airway Exposed)' : 'TERBUKA (Jalan Nafas Terbuka)')}
                    </span>
                  </div>

                  {/* Vertical Esophagus Tube with moving bolus */}
                  <div className="w-20 h-44 bg-gradient-to-b from-rose-950/40 via-rose-900/30 to-amber-950/40 border-2 border-rose-700/60 rounded-full relative overflow-hidden flex justify-center shadow-inner">
                    <div 
                      className="w-10 h-10 rounded-full bg-amber-500 border-2 border-amber-300 absolute transition-all duration-300 flex items-center justify-center text-xs shadow-lg shadow-amber-500/50"
                      style={{ top: `${Math.min(130, (bolusY / 100) * 125)}px` }}
                    >
                      🟢
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono mt-2">
                    {lang === 'en' ? 'Lower Esophageal Sphincter (LES) -> Stomach' : 'Sfingter Kardia -> Lambung'}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      {lang === 'en' ? 'Control Panel:' : 'Panel Kendali:'}
                    </h4>
                    
                    <button
                      onClick={handleToggleEpiglottis}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all mb-3 flex items-center justify-center gap-2 ${
                        epiglottisDown
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {epiglottisDown 
                          ? (lang === 'en' ? 'Epiglottis is Guarding Airway' : 'Epiglotis Mengunci Laring')
                          : (lang === 'en' ? 'Click to Flip Epiglottis Down' : 'Klik untuk Menutup Epiglotis')}
                      </span>
                    </button>

                    <button
                      onClick={handlePushPeristalsis}
                      disabled={peristalsisSuccess}
                      className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Droplets className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Trigger Peristaltic Wave' : 'Picu Gelombang Peristaltik'}</span>
                    </button>

                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                        <span>{lang === 'en' ? 'Descent Progress:' : 'Kemajuan Turun:'}</span>
                        <span className="font-mono text-purple-400">{bolusY}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full transition-all duration-200" 
                          style={{ width: `${bolusY}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {peristalsisSuccess && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold">
                      🎉 {lang === 'en' ? 'Bolus passed the cardiac sphincter and entered the stomach safely!' : 'Bolus berhasil melewati sfingter kardia dan memasuki lambung dengan selamat!'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Stage Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(3);
                }}
                disabled={!peristalsisSuccess}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm transition-all"
              >
                <span>{t.nextStage}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STOMACH ACID VAULT */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 3 of 6' : 'Pos 3 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Stomach Acid Vault: HCl & Pepsin Activation' : 'Bilik Lambung: Asam HCl & Aktivasi Pepsin'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Target pH:' : 'pH Target:'}</span>
                <div className="text-sm font-mono font-bold text-rose-400">1.8 - 2.0 (Extreme Acid)</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-rose-950/40 border border-rose-800/50 p-4 rounded-2xl text-xs text-rose-200 leading-relaxed flex gap-3">
              <span className="text-xl">🔥</span>
              <div>
                <strong>Grade 11 Key Concept:</strong> {lang === 'en'
                  ? 'Parietal cells secrete HCl (0.1M) which kills pathogens and drops pH to ~2.0. Chief cells secrete Pepsinogen. In low pH, pepsinogen autocatalyzes into active PEPSIN, cleaving dietary proteins into peptones. Meanwhile, thick alkaline mucus protects the stomach lining from self-digestion (ulcers)!'
                  : 'Sel parietal memompa asam klorida (HCl) untuk membunuh bakteri dan menurunkan pH ke ~2.0. Sel utama menghasilkan Pepsinogen inaktif. Pada pH asam, pepsinogen aktif menjadi PEPSIN untuk mencerna protein jadi pepton/polipeptida. Lapisan mukus tebal melindungi lambung dari tukak!'}
              </div>
            </div>

            {/* Stomach Simulator Controls */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* pH Meter Gauge */}
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                  <div className="text-xs text-slate-400 font-semibold mb-1">
                    {lang === 'en' ? 'Current Gastric pH' : 'pH Lambung Saat Ini'}
                  </div>
                  <div className={`text-3xl font-mono font-black ${
                    stomachPH <= 2.2 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                  }`}>
                    pH {stomachPH}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {stomachPH <= 2.2 
                      ? (lang === 'en' ? 'Optimal for Pepsin!' : 'Optimum untuk Pepsin!') 
                      : (lang === 'en' ? 'Too neutral; acidify!' : 'Terlalu netral; asamkan!')}
                  </div>
                </div>

                {/* Pepsin Status */}
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                  <div className="text-xs text-slate-400 font-semibold mb-1">
                    {lang === 'en' ? 'Enzyme Pepsin Status' : 'Status Enzim Pepsin'}
                  </div>
                  <div className={`text-sm font-bold mt-2 ${
                    pepsinActivated ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {pepsinActivated 
                      ? (lang === 'en' ? '⚡ ACTIVATED (Cleaving Proteins)' : '⚡ AKTIF (Memotong Protein)') 
                      : (lang === 'en' ? '💤 Inactive Pepsinogen' : '💤 Pepsinogen Inaktif')}
                  </div>
                </div>

                {/* Chyme consistency */}
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                  <div className="text-xs text-slate-400 font-semibold mb-1">
                    {lang === 'en' ? 'Mechanical Churning' : 'Pengocokan Kimus'}
                  </div>
                  <div className="text-2xl font-mono font-bold text-amber-400">
                    {churnProgress}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {churnProgress >= 100 
                      ? (lang === 'en' ? 'Chyme is ready!' : 'Kimus halus siap!') 
                      : (lang === 'en' ? 'Needs muscular churning' : 'Perlu dikocok lagi')}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handlePumpAcid}
                  disabled={stomachPH <= 1.8}
                  className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Parietal Pump: Secrete HCl Acid' : 'Pompa Asam HCl (Sel Parietal)'}</span>
                </button>

                <button
                  onClick={handleChurnStomach}
                  disabled={churnProgress >= 100 || !pepsinActivated}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Muscularis Churning (Make Chyme)' : 'Kocok Kimus (Otot Lambung)'}</span>
                </button>
              </div>

              {churnProgress >= 100 && pepsinActivated && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold text-center">
                  🎉 {lang === 'en' 
                    ? 'Proteins broken into peptones! Pyloric sphincter opens to meter acidic chyme into duodenum!' 
                    : 'Protein berhasil dicerna menjadi pepton! Sfingter pilorus siap melepas kimus asam ke usus 12 jari!'}
                </div>
              )}
            </div>

            {/* Next Stage Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(4);
                }}
                disabled={!(churnProgress >= 100 && pepsinActivated)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm transition-all"
              >
                <span>{t.nextStage}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DUODENUM & ACCESSORY ORGANS */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 4 of 6' : 'Pos 4 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Duodenum: Bile Emulsification & Pancreatic Juice' : 'Duodenum: Emulsifikasi Empedu & Enzim Pankreas'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Duodenal pH:' : 'pH Duodenum:'}</span>
                <div className="text-sm font-mono font-bold text-teal-400">7.8 - 8.2 (Alkaline)</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-teal-950/40 border border-teal-800/50 p-4 rounded-2xl text-xs text-teal-200 leading-relaxed flex gap-3">
              <span className="text-xl">🫀</span>
              <div>
                <strong>Grade 11 Key Concept:</strong> {lang === 'en'
                  ? 'Acidic chyme must be rapidly neutralized by Pancreatic Bicarbonate (NaHCO3). The Liver produces bile (stored in Gallbladder) which contains NO enzymes, but mechanically emulsifies fat globules into micelles. Pancreatic enzymes (Trypsin, Amylase, Lipase) then perform massive chemical digestion!'
                  : 'Kimus asam wajib dinetralkan oleh bikarbonat pankreas agar enzim usus tidak rusak. Empedu dari hati/kantung empedu TIDAK mengandung enzim, melainkan mengemulsikan lemak menjadi butiran halus (misel). Enzim pankreas (Tripsin, Amilase, Lipase) lalu menuntaskan pencernaan!'}
              </div>
            </div>

            {/* Duodenum Lab Chamber */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Bicarbonate check */}
                <div className={`p-4 rounded-xl border transition-all ${
                  bicarbonateAdded ? 'bg-teal-950/40 border-teal-500/50 text-teal-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}>
                  <div className="text-xs font-semibold mb-1">{lang === 'en' ? '1. Neutralization' : '1. Netralisasi Asam'}</div>
                  <div className="text-sm font-bold">
                    {bicarbonateAdded ? (lang === 'en' ? '✓ NaHCO3 Added (pH 8.0)' : '✓ Bikarbonat Netral (pH 8)') : (lang === 'en' ? 'Acidic pH 2.0 (Hazard!)' : 'Masih Asam (Bahaya!)')}
                  </div>
                </div>

                {/* Bile Emulsification check */}
                <div className={`p-4 rounded-xl border transition-all ${
                  bileEmulsified ? 'bg-yellow-950/40 border-yellow-500/50 text-yellow-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}>
                  <div className="text-xs font-semibold mb-1">{lang === 'en' ? '2. Lipid Emulsion' : '2. Emulsi Lemak'}</div>
                  <div className="text-sm font-bold">
                    {bileEmulsified ? (lang === 'en' ? '✓ Emulsified Micelles' : '✓ Lemak Terapung Misel') : (lang === 'en' ? 'Large Insoluble Fat Drops' : 'Gumpalan Lemak Besar')}
                  </div>
                </div>

                {/* Pancreatic enzymes check */}
                <div className={`p-4 rounded-xl border transition-all ${
                  pancreaticEnzymesAdded ? 'bg-blue-950/40 border-blue-500/50 text-blue-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}>
                  <div className="text-xs font-semibold mb-1">{lang === 'en' ? '3. Pancreatic Enzymes' : '3. Enzim Pankreas'}</div>
                  <div className="text-sm font-bold">
                    {pancreaticEnzymesAdded ? (lang === 'en' ? '✓ Amylase, Trypsin, Lipase' : '✓ Tripsin, Amilase, Lipase') : (lang === 'en' ? 'Awaiting Secretion' : 'Menunggu Sekresi')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleAddBicarbonate}
                  disabled={bicarbonateAdded}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all"
                >
                  🧪 {lang === 'en' ? 'Inject Pancreatic NaHCO3' : 'Suntikkan NaHCO3 Pankreas'}
                </button>

                <button
                  onClick={handleAddBile}
                  disabled={!bicarbonateAdded || bileEmulsified}
                  className="px-4 py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all"
                >
                  🟡 {lang === 'en' ? 'Contract Gallbladder (Bile Salts)' : 'Keluarkan Garam Empedu'}
                </button>

                <button
                  onClick={handleAddPancreaticEnzymes}
                  disabled={!bileEmulsified || pancreaticEnzymesAdded}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all"
                >
                  ⚡ {lang === 'en' ? 'Deploy Pancreatic Cocktail' : 'Lepaskan Enzim Pankreas'}
                </button>
              </div>

              {pancreaticEnzymesAdded && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold text-center">
                  🎉 {lang === 'en'
                    ? 'All nutrients broken down into monomers (monosaccharides, peptides, fatty acids) ready for absorption!'
                    : 'Semua makromolekul telah terurai menjadi monomer siap serap di jejunum & ileum!'}
                </div>
              )}
            </div>

            {/* Next Stage Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(5);
                }}
                disabled={!pancreaticEnzymesAdded}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm transition-all"
              >
                <span>{t.nextStage}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: JEJUNUM & ILEUM VILLI ABSORPTION */}
        {currentStep === 5 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 5 of 6' : 'Pos 5 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Intestinal Villi: Differential Nutrient Absorption' : 'Vili Usus Halus: Jalur Penyerapan Nutrisi'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Total Surface Area:' : 'Luas Permukaan:'}</span>
                <div className="text-sm font-mono font-bold text-emerald-400">~250 m² (Tennis Court)</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-2xl text-xs text-emerald-200 leading-relaxed flex gap-3">
              <span className="text-xl">🧬</span>
              <div>
                <strong>Grade 11 High-Yield Distinction:</strong> {lang === 'en'
                  ? 'Water-soluble nutrients (Glucose & Amino Acids) are absorbed into blood capillaries and travel straight to the Liver via the Hepatic Portal Vein. Lipids (Fatty Acids & Glycerol) are packaged into Chylomicrons and enter Central Lacteals (Lymphatic vessels)!'
                  : 'Nutrisi larut air (Glukosa & Asam Amino) diserap ke kapiler darah menuju Hati lewat Vena Porta Hepatika. Lemak (Asam Lemak & Gliserol) dikemas jadi Kilomikron dan diserap ke Pembuluh Kil / Lakteal (Sistem Getah Bening)!'}
              </div>
            </div>

            {/* Interactive Villi Absorption Panel */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 space-y-6">
              {absorbedFiberWarning && (
                <div className="p-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'en'
                      ? 'Insoluble Cellulose Fiber cannot be absorbed by human villi! It must pass on to feed the colon microbiota.'
                      : 'Serat selulosa tidak dapat diserap vili manusia! Serat harus terus mengalir ke usus besar untuk mikroba.'}
                  </span>
                </div>
              )}

              {/* Absorption meters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>{lang === 'en' ? 'Glucose (To Blood)' : 'Glukosa (Ke Darah)'}</span>
                    <span className="font-mono text-amber-400">{absorbedNutrients.glucose}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-amber-500 h-full transition-all" style={{ width: `${absorbedNutrients.glucose}%` }} />
                  </div>
                  <button
                    onClick={() => handleAbsorb('glucose')}
                    disabled={absorbedNutrients.glucose >= 100}
                    className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-xs font-bold text-white transition-colors"
                  >
                    + {lang === 'en' ? 'Absorb Glucose' : 'Serap Glukosa'}
                  </button>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>{lang === 'en' ? 'Amino Acids (To Blood)' : 'Asam Amino (Ke Darah)'}</span>
                    <span className="font-mono text-rose-400">{absorbedNutrients.aminoAcids}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-rose-500 h-full transition-all" style={{ width: `${absorbedNutrients.aminoAcids}%` }} />
                  </div>
                  <button
                    onClick={() => handleAbsorb('aminoAcids')}
                    disabled={absorbedNutrients.aminoAcids >= 100}
                    className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs font-bold text-white transition-colors"
                  >
                    + {lang === 'en' ? 'Absorb Amino Acids' : 'Serap Asam Amino'}
                  </button>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>{lang === 'en' ? 'Fatty Acids (To Lacteal)' : 'Asam Lemak (Ke Lakteal)'}</span>
                    <span className="font-mono text-yellow-400">{absorbedNutrients.fattyAcids}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-yellow-500 h-full transition-all" style={{ width: `${absorbedNutrients.fattyAcids}%` }} />
                  </div>
                  <button
                    onClick={() => handleAbsorb('fattyAcids')}
                    disabled={absorbedNutrients.fattyAcids >= 100}
                    className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 text-xs font-bold text-white transition-colors"
                  >
                    + {lang === 'en' ? 'Absorb to Lacteal' : 'Serap ke Pembuluh Kil'}
                  </button>
                </div>
              </div>

              {/* Trap: Fiber Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleAbsorbFiber}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-medium"
                >
                  🌿 {lang === 'en' ? 'Attempt to Absorb Cellulose Fiber?' : 'Coba Serap Serat Selulosa?'}
                </button>
              </div>

              {absorbedNutrients.glucose >= 100 && absorbedNutrients.aminoAcids >= 100 && absorbedNutrients.fattyAcids >= 100 && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold text-center">
                  🎉 {lang === 'en'
                    ? 'Maximum nutrient absorption achieved! Moving non-absorbable residue and water to Large Intestine.'
                    : 'Penyerapan nutrisi maksimal selesai! Sisa serat dan cairan dialirkan ke Usus Besar.'}
                </div>
              )}
            </div>

            {/* Next Stage Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentStep(6);
                }}
                disabled={!(absorbedNutrients.glucose >= 50 && absorbedNutrients.aminoAcids >= 50 && absorbedNutrients.fattyAcids >= 50)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-sm transition-all"
              >
                <span>{t.nextStage}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: LARGE INTESTINE / COLON */}
        {currentStep === 6 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Stage 6 of 6' : 'Pos 6 dari 6'}
                </span>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {lang === 'en' ? 'Colon: Water Reclamation & Gut Microbiota' : 'Usus Besar: Penyerapan Air & Mikrobiota Usus'}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Daily Water Reabsorbed:' : 'Air Diserap per Hari:'}</span>
                <div className="text-sm font-mono font-bold text-cyan-400">1.5 - 2.0 Liters</div>
              </div>
            </div>

            {/* Educational concept note */}
            <div className="bg-cyan-950/40 border border-cyan-800/50 p-4 rounded-2xl text-xs text-cyan-200 leading-relaxed flex gap-3">
              <span className="text-xl">💧</span>
              <div>
                <strong>Grade 11 Key Concept:</strong> {lang === 'en'
                  ? 'The colon reabsorbs water and electrolytes. If water absorption is balanced (85-92%), healthy formed feces are produced. Too little causes Diarrhea; too much causes Constipation! Trillions of symbiotic bacteria ferment fiber into Vitamin K (crucial for blood clotting) and Biotin.'
                  : 'Usus besar menyerap kembali air dan elektrolit. Jika seimbang (85-92%), terbentuk feses normal. Jika terlalu sedikit timbul Diare; jika terlalu banyak timbul Sembelit/Konstipasi! Bakteri usus juga memfermentasi sisa serat menjadi Vitamin K (pembekuan darah) dan Biotin.'}
              </div>
            </div>

            {/* Water Reabsorption Slider Game */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {lang === 'en' ? 'Water Reabsorption Rate (%):' : 'Persentase Penyerapan Air (%):'}
                  </span>
                  <span className={`text-base font-mono font-bold ${
                    waterReabsorbedPercent >= 80 && waterReabsorbedPercent <= 94
                      ? 'text-emerald-400'
                      : waterReabsorbedPercent < 80
                      ? 'text-blue-400'
                      : 'text-rose-400'
                  }`}>
                    {waterReabsorbedPercent}%
                  </span>
                </div>

                <input
                  type="range"
                  min="40"
                  max="99"
                  value={waterReabsorbedPercent}
                  onChange={(e) => setWaterReabsorbedPercent(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                {/* Stool consistency status feedback */}
                <div className="mt-3 p-3 rounded-xl border text-xs font-semibold flex items-center justify-between">
                  <span>{lang === 'en' ? 'Clinical Outcome:' : 'Hasil Klinis Feses:'}</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    waterReabsorbedPercent < 75
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : waterReabsorbedPercent > 94
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {waterReabsorbedPercent < 75
                      ? (lang === 'en' ? '💧 Watery Diarrhea (Transit Too Rapid!)' : '💧 Diare Encer (Gerak Terlalu Cepat!)')
                      : waterReabsorbedPercent > 94
                      ? (lang === 'en' ? '🪨 Hard Constipation (Excessive Water Loss)' : '🪨 Sembelit Kering (Air Terlalu Banyak Diserap)')
                      : (lang === 'en' ? '✨ Ideal Stool Consistency (Bristol Type 3-4)' : '✨ Konsistensi Feses Ideal')}
                  </span>
                </div>
              </div>

              {/* Microbiome Interaction */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Symbiotic Gut Microbiota' : 'Bakteri Simbiosis Mikrobiota'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'en'
                      ? 'Feed trillions of beneficial bacteria with non-digestible prebiotic fibers to synthesize Vitamin K and Biotin.'
                      : 'Beri makan bakteri baik dengan serat prebiotik untuk mensintesis Vitamin K dan Biotin.'}
                  </p>
                </div>

                <button
                  onClick={handleSynthesizeVitamins}
                  disabled={vitaminsSynthesized}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs whitespace-nowrap shadow-md transition-all"
                >
                  {vitaminsSynthesized 
                    ? (lang === 'en' ? '✓ Vitamin K Synthesized' : '✓ Vitamin K Terbentuk') 
                    : (lang === 'en' ? '🦠 Synthesize Vitamin K' : '🦠 Sintesis Vitamin K')}
                </button>
              </div>

              {waterReabsorbedPercent >= 80 && waterReabsorbedPercent <= 94 && vitaminsSynthesized && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold text-center">
                  🎉 {lang === 'en'
                    ? 'Digestive cycle 100% complete! Feces evacuated via rectum and anal sphincters!'
                    : 'Siklus pencernaan 100% tuntas! Sisa feses siap dievakuasi melalui rektum dan sfingter anus!'}
                </div>
              )}
            </div>

            {/* Finish Journey Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  sound.fanfare();
                  setCurrentStep(7);
                  handleFinishJourney();
                }}
                disabled={!(waterReabsorbedPercent >= 78 && waterReabsorbedPercent <= 95 && vitaminsSynthesized)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 disabled:opacity-40 text-slate-900 font-bold text-base shadow-xl transition-all"
              >
                <span>{lang === 'en' ? 'Complete Digestive Mission' : 'Selesaikan Misi Pencernaan'}</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: SUMMARY & SCORECARD */}
        {currentStep === 7 && (
          <div className="max-w-2xl mx-auto text-center space-y-6 py-4">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="text-3xl font-extrabold font-heading text-white">
              {lang === 'en' ? 'Digestion Successfully Completed!' : 'Pencernaan Berhasil Tuntas!'}
            </h2>
            <p className="text-sm text-slate-300">
              {lang === 'en'
                ? `You guided "${selectedMeal.name[lang]}" through the entire 9-meter human gastrointestinal tract!`
                : `Kamu telah memandu "${selectedMeal.name[lang]}" melewati seluruh 9 meter saluran pencernaan manusia!`}
            </p>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700 space-y-4 text-left">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider text-center">
                {lang === 'en' ? 'NUTRIENT ABSORPTION SUMMARY' : 'RINGKASAN PENYERAPAN NUTRISI'}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-slate-400">{lang === 'en' ? 'Carbohydrate Absorption:' : 'Penyerapan Karbohidrat:'}</div>
                  <div className="text-lg font-mono font-bold text-amber-400">100% (Glucose)</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-slate-400">{lang === 'en' ? 'Protein Absorption:' : 'Penyerapan Protein:'}</div>
                  <div className="text-lg font-mono font-bold text-rose-400">100% (Amino Acids)</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-slate-400">{lang === 'en' ? 'Lipid Absorption:' : 'Penyerapan Lipid:'}</div>
                  <div className="text-lg font-mono font-bold text-yellow-400">100% (Chylomicrons)</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-slate-400">{lang === 'en' ? 'Water Reclaimed:' : 'Air Terserap Kembali:'}</div>
                  <div className="text-lg font-mono font-bold text-cyan-400">{waterReabsorbedPercent}% (Balanced)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={resetGame}
                className="px-6 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'en' ? 'Try Another Meal' : 'Coba Makanan Lain'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
