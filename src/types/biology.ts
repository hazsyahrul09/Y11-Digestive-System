export type Language = 'en' | 'id';

export type GameMode = 'journey' | 'lab' | 'clinic' | 'anatomy' | 'quiz';

export interface OrganInfo {
  id: string;
  name: { en: string; id: string };
  category: 'alimentary_canal' | 'accessory_organ';
  location: string;
  pH: string;
  mechanicalAction: { en: string; id: string };
  chemicalAction: { en: string; id: string };
  secretions: { en: string; id: string }[];
  enzymes: string[];
  keyFacts: { en: string[]; id: string[] };
  disorders: { en: string[]; id: string[] };
  svgPathId: string;
  highlightCoordinates: { x: number; y: number };
}

export interface EnzymeInfo {
  id: string;
  name: string;
  indonesianName: string;
  producedBy: { en: string; id: string };
  siteOfAction: { en: string; id: string };
  substrate: { en: string; id: string };
  product: { en: string; id: string };
  optimalPH: { min: number; max: number; optimal: number };
  optimalTemp: { min: number; max: number; optimal: number };
  activator?: { en: string; id: string };
  indicatorTest: {
    reagent: string;
    positiveColor: string;
    negativeColor: string;
    testName: string;
    description: { en: string; id: string };
  };
  funFact: { en: string; id: string };
}

export interface FoodMeal {
  id: string;
  name: { en: string; id: string };
  emoji: string;
  description: { en: string; id: string };
  carbohydrates: number; // percentage
  protein: number;
  lipids: number;
  fiber: number;
  water: number;
}

export interface PatientCase {
  id: string;
  patientName: string;
  age: number;
  gender: { en: string; id: string };
  occupation: { en: string; id: string };
  chiefComplaint: { en: string; id: string };
  history: { en: string; id: string };
  vitals: {
    temp: string;
    bp: string;
    hr: string;
  };
  availableTests: {
    id: string;
    name: { en: string; id: string };
    cost: number;
    result: { en: string; id: string };
    isKeyIndicator: boolean;
  }[];
  diagnosesOptions: {
    id: string;
    name: { en: string; id: string };
    organInvolved: string;
    explanation: { en: string; id: string };
    isCorrect: boolean;
  }[];
  treatmentsOptions: {
    id: string;
    text: { en: string; id: string };
    isCorrect: boolean;
  }[];
  biologyConcept: { en: string; id: string };
}

export interface QuizQuestion {
  id: number;
  topic: 'anatomy' | 'enzymes' | 'absorption' | 'pathology' | 'regulation';
  question: { en: string; id: string };
  options: { en: string[]; id: string[] };
  correctIndex: number;
  explanation: { en: string; id: string };
  difficulty: 'Grade 11 Standard' | 'Grade 11 Advanced';
}
