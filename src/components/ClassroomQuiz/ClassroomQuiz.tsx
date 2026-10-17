import React, { useState } from 'react';
import { QuizQuestion, Language } from '../../types/biology';
import { QUIZ_QUESTIONS } from '../../data/biologyData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Printer, 
  Share2, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Trophy
} from 'lucide-react';

interface ClassroomQuizProps {
  lang: Language;
  onAddScore: (points: number, stars: number) => void;
}

export const ClassroomQuiz: React.FC<ClassroomQuizProps> = ({ lang, onAddScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Biologist Explorer');
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');

  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.click();
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOptionIndex }));

    const isCorrect = selectedOptionIndex === question.correctIndex;
    if (isCorrect) {
      sound.success();
      setScore(prev => prev + 1);
      onAddScore(50, 0);
    } else {
      sound.error();
    }
  };

  const handleNextQuestion = () => {
    sound.click();
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      sound.fanfare();
      confetti({ particleCount: 100, spread: 70 });
      onAddScore(100, 3);
    }
  };

  const resetQuiz = () => {
    sound.click();
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setScore(0);
    setQuizCompleted(false);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const grade = percentage >= 85 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 50 ? 'B' : 'Review Needed';

  // Flashcards dataset
  const flashcards = [
    {
      front: lang === 'en' ? 'Where are Lipids absorbed?' : 'Ke mana Lemak diserap di usus halus?',
      back: lang === 'en' 
        ? 'Into Central Lacteals (Lymphatic vessels) as Chylomicrons, NOT directly into blood capillaries!' 
        : 'Ke Pembuluh Kil (Lakteal Getah Bening) dalam bentuk Kilomikron, BUKAN langsung ke kapiler darah!'
    },
    {
      front: lang === 'en' ? 'Does Bile contain enzymes?' : 'Apakah Cairan Empedu mengandung enzim?',
      back: lang === 'en' 
        ? 'NO! Bile salts perform purely mechanical emulsification to break fat droplets into micro-micelles.' 
        : 'TIDAK! Garam empedu hanya melakukan emulsifikasi mekanik untuk memecah tetes lemak jadi misel.'
    },
    {
      front: lang === 'en' ? 'Why is Pepsinogen inactive?' : 'Mengapa Pepsin disekresi sebagai Pepsinogen?',
      back: lang === 'en' 
        ? 'To prevent the protease from autodigesting the chief cells that synthesize it! It activates at pH ~2.0 in the lumen.' 
        : 'Untuk mencegah enzim mencerna protein sel penghasilnya (autolisis)! Aktif pada pH ~2.0 di rongga lambung.'
    },
    {
      front: lang === 'en' ? 'What triggers Secretin?' : 'Apa pemicu hormon Sekretin?',
      back: lang === 'en' 
        ? 'Acidic chyme (low pH) entering the duodenum triggers Secretin, which stimulates pancreatic NaHCO3 release.' 
        : 'Kimus asam lambung ber-pH rendah memicu Sekretin untuk merangsang pankreas melepas NaHCO3 basa.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-white">
              {lang === 'en' ? 'Classroom Exam & Certification Hub' : 'Ujian Kelas & Sertifikasi Kompetensi Biologi'}
            </h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {lang === 'en'
              ? 'Test Grade 11 curriculum comprehension with standardized exam questions and generate your Biology Mastery Certificate.'
              : 'Uji pemahaman kurikulum Biologi Kelas 11 dengan soal standar dan cetak Sertifikat Keahlianmu.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('quiz');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-amber-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Exam Mode' : 'Mode Ujian'}
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('flashcards');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'flashcards' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Flashcards' : 'Kartu Pintar'}
          </button>
        </div>
      </div>

      {/* FLASHCARDS VIEW */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                    CARD {idx + 1}
                  </span>
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div className="font-bold text-white text-sm">{card.front}</div>
                <div className="pt-2 border-t border-slate-700/80 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl">
                  {card.back}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                sound.click();
                setActiveTab('quiz');
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs"
            >
              {lang === 'en' ? 'Start Exam Now' : 'Mulai Ujian Sekarang'}
            </button>
          </div>
        </div>
      )}

      {/* QUIZ VIEW */}
      {activeTab === 'quiz' && !quizCompleted && (
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
          {/* Question progress */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                {lang === 'en' ? `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}` : `Pertanyaan ${currentQuestionIndex + 1} dari ${QUIZ_QUESTIONS.length}`}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-300 text-[10px] font-semibold uppercase">
                  {question.topic}
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">
                  {question.difficulty}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">{lang === 'en' ? 'Current Score:' : 'Skor Anda:'}</span>
              <div className="text-sm font-mono font-bold text-emerald-400">{score} / {currentQuestionIndex}</div>
            </div>
          </div>

          {/* Question text */}
          <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {question.question[lang]}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options[lang].map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === question.correctIndex;
              let btnStyle = 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-900 hover:border-slate-600';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
                } else {
                  btnStyle = 'bg-slate-900/30 border-slate-800 text-slate-600';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400/50';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Submit or Next Question */}
          <div className="flex justify-between items-center pt-2">
            <div>
              {isAnswerSubmitted && (
                <span className={`text-xs font-bold flex items-center gap-1.5 ${
                  selectedOptionIndex === question.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedOptionIndex === question.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Correct!' : 'Benar!'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Incorrect' : 'Kurang tepat'}</span>
                    </>
                  )}
                </span>
              )}
            </div>

            <div>
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIndex === null}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold text-xs shadow-md transition-all"
                >
                  {lang === 'en' ? 'Confirm Answer' : 'Kunci Jawaban'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? (lang === 'en' ? 'View Certificate' : 'Lihat Sertifikat') : (lang === 'en' ? 'Next Question' : 'Soal Berikutnya')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Explanation reveal */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
              <strong className="text-amber-400">{lang === 'en' ? 'Curriculum Explanation:' : 'Penjelasan Konsep:'}</strong>
              <p>{question.explanation[lang]}</p>
            </div>
          )}
        </div>
      )}

      {/* QUIZ COMPLETED & CERTIFICATE */}
      {activeTab === 'quiz' && quizCompleted && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-5xl">🎖️</span>
            <h2 className="text-2xl font-bold font-heading text-white">
              {lang === 'en' ? 'Examination Completed!' : 'Ujian Telah Selesai!'}
            </h2>
            <p className="text-sm text-slate-300">
              {lang === 'en'
                ? `You scored ${score} out of ${QUIZ_QUESTIONS.length} (${percentage}%) - Grade ${grade}`
                : `Nilai Anda: ${score} dari ${QUIZ_QUESTIONS.length} (${percentage}%) - Predikat ${grade}`}
            </p>
          </div>

          {/* Student Name Input for Certificate */}
          <div className="max-w-md mx-auto bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
            <span className="text-xs text-slate-300 whitespace-nowrap font-semibold">
              {lang === 'en' ? 'Student Full Name:' : 'Nama Lengkap Siswa:'}
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Printable Formal Certificate */}
          <div 
            id="master-certificate" 
            className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border-4 border-amber-400/80 shadow-2xl relative overflow-hidden text-center space-y-4"
          >
            {/* Watermark badge */}
            <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl select-none pointer-events-none">
              🧬
            </div>

            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl">
                🏆
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                {lang === 'en' ? 'CERTIFICATE OF BIOLOGICAL MASTERY' : 'SERTIFIKAT KELULUSAN SISTEM PENCERNAAN'}
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Grade 11 Human Digestive Physiology
              </h3>
            </div>

            <p className="text-xs text-slate-400 italic">
              {lang === 'en' ? 'This honors certificate certifies that' : 'Dengan ini menerangkan bahwa'}
            </p>

            <div className="text-2xl font-bold font-heading text-amber-300 border-b-2 border-amber-400/40 pb-2 inline-block px-8">
              {studentName || 'Student Biologist'}
            </div>

            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              {lang === 'en'
                ? `has demonstrated outstanding biological proficiency in Human Alimentary Canal Anatomy, Enzymatic Hydrolysis, Peristaltic Dynamics, and Clinical Pathology with a score of ${percentage}% (${grade}).`
                : `telah menunjukkan pemahaman biologi yang luar biasa pada Anatomi Saluran Pencernaan Manusia, Hidrolisis Enzimatik, Dinamika Peristaltik, dan Patologi Klinis dengan nilai ${percentage}% (${grade}).`}
            </p>

            <div className="pt-4 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-700/80 font-mono">
              <div>{lang === 'en' ? 'Curriculum: Grade 11 Biology' : 'Kurikulum: Biologi SMA Kelas 11'}</div>
              <div>{lang === 'en' ? 'Verified DigestiQuest' : 'Terverifikasi DigestiQuest'}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'en' ? 'Print Certificate' : 'Cetak Sertifikat'}</span>
            </button>

            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'en' ? 'Retake Exam' : 'Ulangi Ujian'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
