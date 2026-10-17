import React, { useState } from 'react';
import { PatientCase, Language } from '../../types/biology';
import { PATIENT_CASES } from '../../data/biologyData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Stethoscope, 
  FileText, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  User, 
  Calendar,
  AlertCircle,
  Pill,
  BookOpen
} from 'lucide-react';

interface DigestiveClinicProps {
  lang: Language;
  onAddScore: (points: number, stars: number) => void;
}

export const DigestiveClinic: React.FC<DigestiveClinicProps> = ({ lang, onAddScore }) => {
  const [selectedCase, setSelectedCase] = useState<PatientCase>(PATIENT_CASES[0]);
  const [orderededTestIds, setOrderedTestIds] = useState<string[]>([]);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [isCaseSubmitted, setIsCaseSubmitted] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);

  const handleOrderTest = (testId: string) => {
    if (!orderededTestIds.includes(testId)) {
      sound.squirt();
      setOrderedTestIds(prev => [...prev, testId]);
    }
  };

  const handleSelectCase = (c: PatientCase) => {
    sound.click();
    setSelectedCase(c);
    setOrderedTestIds([]);
    setSelectedDiagnosisId(null);
    setSelectedTreatmentId(null);
    setIsCaseSubmitted(false);
  };

  const handleSubmitDiagnosis = () => {
    if (!selectedDiagnosisId || !selectedTreatmentId) return;

    const chosenDiag = selectedCase.diagnosesOptions.find(d => d.id === selectedDiagnosisId);
    const chosenTreat = selectedCase.treatmentsOptions.find(t => t.id === selectedTreatmentId);

    setIsCaseSubmitted(true);

    if (chosenDiag?.isCorrect && chosenTreat?.isCorrect) {
      sound.fanfare();
      confetti({ particleCount: 70, spread: 65 });
      if (!solvedCases.includes(selectedCase.id)) {
        setSolvedCases(prev => [...prev, selectedCase.id]);
        onAddScore(150, 2);
      }
    } else {
      sound.error();
    }
  };

  const isDiagnosisCorrect = selectedCase.diagnosesOptions.find(d => d.id === selectedDiagnosisId)?.isCorrect;
  const isTreatmentCorrect = selectedCase.treatmentsOptions.find(t => t.id === selectedTreatmentId)?.isCorrect;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/70 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🩺</span>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-white">
              {lang === 'en' ? 'Digestive Pathology Clinic' : 'Klinik Patologi & Diagnosis Sistem Cerna'}
            </h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {lang === 'en'
              ? 'Analyze clinical patient symptoms, order targeted lab tests, diagnose digestive disorders, and recommend physiology-grounded treatments.'
              : 'Analisis gejala klinis pasien, periksa hasil uji lab, tegakkan diagnosis kelainan pencernaan, dan berikan terapi berbasis biologi.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'en' ? 'Cases Solved:' : 'Kasus Terpecahkan:'} {solvedCases.length} / {PATIENT_CASES.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient Case List */}
        <div className="space-y-4">
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'en' ? 'Patient Medical Charts:' : 'Daftar Pasien Konsultasi:'}
            </h3>

            <div className="space-y-2.5">
              {PATIENT_CASES.map((c) => {
                const isSelected = selectedCase.id === c.id;
                const isSolved = solvedCases.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCase(c)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.patientName}</span>
                      </span>
                      {isSolved && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                          ✓ {lang === 'en' ? 'SOLVED' : 'SELESAI'}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {c.age} yrs • {c.gender[lang]} • {c.occupation[lang]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vitals & Triage Note */}
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              <Activity className="w-4 h-4" />
              <span>{lang === 'en' ? 'Triage & Vital Signs' : 'Tanda Vital & Triase Pasien'}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/80">
                <div className="text-slate-400 text-[10px]">{lang === 'en' ? 'Body Temp' : 'Suhu'}</div>
                <div className="font-mono font-bold text-white mt-0.5">{selectedCase.vitals.temp}</div>
              </div>
              <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/80">
                <div className="text-slate-400 text-[10px]">{lang === 'en' ? 'Blood Press.' : 'Tensi'}</div>
                <div className="font-mono font-bold text-white mt-0.5">{selectedCase.vitals.bp}</div>
              </div>
              <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-700/80">
                <div className="text-slate-400 text-[10px]">{lang === 'en' ? 'Heart Rate' : 'Nadi'}</div>
                <div className="font-mono font-bold text-white mt-0.5">{selectedCase.vitals.hr}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Column: Case Details, Lab Tests, and Diagnosis Decision */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
            {/* Patient Header & Chief Complaint */}
            <div className="border-b border-slate-700 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Patient Case File' : 'Berkas Rekam Medis Pasien'}
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    {selectedCase.patientName} ({selectedCase.age} y/o)
                  </h2>
                </div>
              </div>

              {/* Chief complaint box */}
              <div className="mt-4 p-4 bg-rose-950/30 border border-rose-800/40 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Chief Complaint:' : 'Keluhan Utama Pasien:'}</span>
                </div>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  "{selectedCase.chiefComplaint[lang]}"
                </p>
              </div>

              {/* Patient history */}
              <div className="mt-3 p-4 bg-slate-900/80 border border-slate-700/70 rounded-2xl text-xs text-slate-300 leading-relaxed">
                <strong>{lang === 'en' ? 'Clinical History:' : 'Riwayat Penyakit:'}</strong> {selectedCase.history[lang]}
              </div>
            </div>

            {/* Stage 1: Diagnostic Laboratory & Imaging Tests */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Step 1: Order Diagnostic Tests' : 'Langkah 1: Periksa Uji Klinis & Laboratorium'}</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Click to examine test result' : 'Klik untuk melihat hasil pemeriksaan'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCase.availableTests.map((test) => {
                  const isOrdered = orderededTestIds.includes(test.id);
                  return (
                    <div
                      key={test.id}
                      onClick={() => handleOrderTest(test.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isOrdered
                          ? 'bg-slate-900 border-cyan-500/60 shadow-md'
                          : 'bg-slate-900/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-white">
                          {test.name[lang]}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          isOrdered ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isOrdered ? (lang === 'en' ? 'Revealed' : 'Terungkap') : (lang === 'en' ? 'Click to Order' : 'Klik Buka')}
                        </span>
                      </div>

                      {isOrdered && (
                        <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-cyan-200/90 leading-relaxed">
                          🔬 <strong>{lang === 'en' ? 'Result:' : 'Hasil:'}</strong> {test.result[lang]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 2: Formulate Differential Diagnosis */}
            <div className="space-y-3 pt-3 border-t border-slate-700/80">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" />
                <span>{lang === 'en' ? 'Step 2: Select Differential Diagnosis' : 'Langkah 2: Tentukan Diagnosis Klinis'}</span>
              </h3>

              <div className="space-y-2">
                {selectedCase.diagnosesOptions.map((diag) => {
                  const isSelected = selectedDiagnosisId === diag.id;
                  return (
                    <div
                      key={diag.id}
                      onClick={() => {
                        sound.click();
                        setSelectedDiagnosisId(diag.id);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-600/20 border-emerald-400 text-white ring-1 ring-emerald-400/50'
                          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs">{diag.name[lang]}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {diag.organInvolved}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 3: Prescribe Biology-Grounded Treatment */}
            <div className="space-y-3 pt-3 border-t border-slate-700/80">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-4 h-4" />
                <span>{lang === 'en' ? 'Step 3: Prescribe Physiological Treatment' : 'Langkah 3: Tentukan Rencana Pengobatan'}</span>
              </h3>

              <div className="space-y-2">
                {selectedCase.treatmentsOptions.map((treat) => {
                  const isSelected = selectedTreatmentId === treat.id;
                  return (
                    <div
                      key={treat.id}
                      onClick={() => {
                        sound.click();
                        setSelectedTreatmentId(treat.id);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-400 text-white ring-1 ring-blue-400/50'
                          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="text-xs leading-relaxed">{treat.text[lang]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Case Button */}
            <div className="pt-2">
              <button
                onClick={handleSubmitDiagnosis}
                disabled={!selectedDiagnosisId || !selectedTreatmentId}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-slate-900 font-bold text-sm shadow-xl transition-all"
              >
                {lang === 'en' ? 'Submit Clinical Verdict' : 'Kirim Putusan Diagnosis Medis'}
              </button>
            </div>

            {/* Feedback & Biological Debrief */}
            {isCaseSubmitted && (
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDiagnosisCorrect && isTreatmentCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isDiagnosisCorrect && isTreatmentCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{lang === 'en' ? 'Accurate Diagnosis & Treatment Plan!' : 'Diagnosis & Rencana Pengobatan Tepat!'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>{lang === 'en' ? 'Incorrect Diagnosis or Treatment' : 'Diagnosis atau Terapi Kurang Tepat'}</span>
                    </>
                  )}
                </div>

                <div className="text-xs leading-relaxed text-slate-200">
                  {selectedCase.diagnosesOptions.find(d => d.id === selectedDiagnosisId)?.explanation[lang]}
                </div>

                {/* Deep Biological Debrief */}
                <div className="mt-3 p-4 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                    <BookOpen className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Biologist Debrief (Grade 11 Core Knowledge):' : 'Pembahasan Konsep Biologi Kelas 11:'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {selectedCase.biologyConcept[lang]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
