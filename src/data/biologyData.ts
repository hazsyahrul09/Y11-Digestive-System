import { OrganInfo, EnzymeInfo, FoodMeal, PatientCase, QuizQuestion } from '../types/biology';

export const MEALS_DATA: FoodMeal[] = [
  {
    id: 'burger',
    name: {
      en: 'Cheeseburger & Crispy Fries',
      id: 'Burger Keju & Kentang Goreng'
    },
    emoji: '🍔🍟',
    description: {
      en: 'Rich in bun starch (carbohydrates), beef patty (protein & saturated fats), cheese, and fried potato lipids.',
      id: 'Kaya akan pati roti (karbohidrat), daging sapi (protein & lemak jenuh), keju, dan lemak kentang goreng.'
    },
    carbohydrates: 45,
    protein: 25,
    lipids: 20,
    fiber: 5,
    water: 5
  },
  {
    id: 'nasigoreng',
    name: {
      en: 'Nasi Goreng & Chicken Satay',
      id: 'Nasi Goreng & Sate Ayam'
    },
    emoji: '🍛🍢',
    description: {
      en: 'Delicious rice complex carbohydrates, grilled chicken breast proteins, and rich peanut sauce lipids.',
      id: 'Karbohidrat kompleks dari nasi, protein daging ayam panggang, dan lipid gurih dari saus kacang.'
    },
    carbohydrates: 50,
    protein: 24,
    lipids: 18,
    fiber: 4,
    water: 4
  },
  {
    id: 'healthy_bowl',
    name: {
      en: 'Avocado, Quinoa & Egg Salad',
      id: 'Salad Alpukat, Quinoa & Telur Rebus'
    },
    emoji: '🥑🥗🥚',
    description: {
      en: 'Nutrient-dense meal with fiber-rich quinoa, egg albumin protein, and monounsaturated healthy fats from avocado.',
      id: 'Kaya nutrisi dengan quinoa tinggi serat, protein albumin telur, dan lemak tak jenuh sehat dari alpukat.'
    },
    carbohydrates: 35,
    protein: 25,
    lipids: 22,
    fiber: 12,
    water: 6
  }
];

export const ORGANS_DATA: OrganInfo[] = [
  {
    id: 'mouth',
    name: { en: 'Oral Cavity (Mouth)', id: 'Rongga Mulut' },
    category: 'alimentary_canal',
    location: 'Head / Cephalic',
    pH: '6.7 - 7.3 (Neutral)',
    mechanicalAction: {
      en: 'Mastication (chewing) by teeth (incisors cut, canines tear, premolars & molars grind); tongue rolls food into a cohesive bolus.',
      id: 'Mastikasi (mengunyah) oleh gigi (seri memotong, taring merobek, geraham menggilas); lidah membentuk bolus makanan.'
    },
    chemicalAction: {
      en: 'Salivary amylase (ptyalin) begins hydrolyzing cooked starches into maltose & dextrins; lysozyme destroys bacterial cell walls.',
      id: 'Amilase saliva (ptialin) menghidrolisis pati matang menjadi maltosa & dekstrin; lisozim memecah dinding sel bakteri.'
    },
    secretions: [
      { en: 'Saliva (99.5% water, salivary amylase, mucin, lysozyme, HCO3- buffer)', id: 'Air liur (99.5% air, ptialin, musin pelumas, lisozim, bikarbonat)' }
    ],
    enzymes: ['Salivary Amylase (Ptyalin)', 'Lingual Lipase'],
    keyFacts: {
      en: [
        'Produces 1 to 1.5 liters of saliva daily.',
        'Taste buds on papillae detect sweet, salty, sour, bitter, and umami.',
        'Mouth digestion is short (15-30s), so only about 5% of starch is broken down here.'
      ],
      id: [
        'Menghasilkan 1 hingga 1.5 liter saliva setiap hari.',
        'Papila lidah mendeteksi rasa manis, asin, asam, pahit, dan umami.',
        'Hanya sekitar 5% pati yang terhidrolisis di mulut karena waktu kunyah yang singkat.'
      ]
    },
    disorders: {
      en: ['Dental caries (cavities caused by Streptococcus mutans acid)', 'Xerostomia (dry mouth)', 'Gingivitis'],
      id: ['Karies gigi (kerusakan enamel oleh bakteri asam)', 'Xerostomia (mulut kering)', 'Gingivitis (radang gusi)']
    },
    svgPathId: 'path-mouth',
    highlightCoordinates: { x: 200, y: 70 }
  },
  {
    id: 'esophagus',
    name: { en: 'Esophagus & Epiglottis', id: 'Esofagus & Epiglotis' },
    category: 'alimentary_canal',
    location: 'Cervical to Thoracic cavity (~25 cm tube)',
    pH: '7.0',
    mechanicalAction: {
      en: 'Epiglottis flaps down over the larynx during swallowing; peristalsis (alternating contraction of circular and longitudinal smooth muscles) propels the bolus downward.',
      id: 'Epiglotis menutup laring saat menelan agar tidak tersedak; gerak peristaltik (otot melingkar & memanjang) mendorong bolus ke bawah.'
    },
    chemicalAction: {
      en: 'No enzymes secreted; salivary amylase continues working inside the bolus core until reaching gastric acid.',
      id: 'Tidak ada sekresi enzim pencernaan baru; ptialin masih bekerja di dalam inti bolus.'
    },
    secretions: [
      { en: 'Mucus from esophageal submucosal glands for lubrication', id: 'Lendir (musin) untuk melumasi jalannya bolus' }
    ],
    enzymes: [],
    keyFacts: {
      en: [
        'Transit time is only 4 to 8 seconds for solid food, 1 second for liquids.',
        'Lower Esophageal Sphincter (LES) acts as a one-way physiological valve preventing gastric acid reflux.',
        'Peristalsis is involuntary and controlled by the vagus nerve and enteric nervous system.'
      ],
      id: [
        'Waktu tempuh hanya 4-8 detik untuk makanan padat, 1 detik untuk cairan.',
        'Sfingter kardia / LES mencegah asam lambung naik kembali ke kerongkongan.',
        'Gerakan peristaltik terjadi secara involunter (tanpa disadari) diatur saraf vagus.'
      ]
    },
    disorders: {
      en: ['GERD (Gastroesophageal Reflux Disease / Heartburn)', 'Achalasia', 'Esophagitis'],
      id: ['GERD (Refluks asam lambung / Heartburn)', 'Akalasia', 'Esofagitis']
    },
    svgPathId: 'path-esophagus',
    highlightCoordinates: { x: 200, y: 140 }
  },
  {
    id: 'stomach',
    name: { en: 'Stomach (Ventrikulus)', id: 'Lambung (Ventrikulus)' },
    category: 'alimentary_canal',
    location: 'Upper Left Quadrant of Abdomen',
    pH: '1.5 - 2.5 (Extremely Acidic)',
    mechanicalAction: {
      en: 'Triple-layer muscularis (oblique, circular, longitudinal) churns and grinds bolus into a semi-liquid acidic slush called Chyme.',
      id: 'Tiga lapisan otot (oblik, sirkular, longitudinal) mengocok dan menggilas bolus menjadi bubur kimus (chyme).'
    },
    chemicalAction: {
      en: 'Parietal cells secrete HCl (kills microbes, denatures proteins, activates pepsinogen to pepsin). Chief cells secrete Pepsinogen. Pepsin breaks internal peptide bonds of proteins into polypeptides.',
      id: 'Sel parietal mensekresi HCl (membunuh kuman, denaturasi protein, mengubah pepsinogen menjadi pepsin aktif). Pepsin memecah protein menjadi pepton/polipeptida.'
    },
    secretions: [
      { en: 'Hydrochloric Acid (HCl, 0.1M)', id: 'Asam Klorida (HCl, pH ~2)' },
      { en: 'Pepsinogen (inactive zymogen)', id: 'Pepsinogen (zimogen inaktif)' },
      { en: 'Gastric Lipase & Rennin (in infants for milk curdling)', id: 'Lipase lambung & Renin (pada bayi menggumpalkan kasein susu)' },
      { en: 'Bicarbonate-rich Mucus coating & Intrinsic Factor (for B12)', id: 'Mukus pelindung & Faktor Intrinsik (penyerap B12)' }
    ],
    enzymes: ['Pepsin (activated from Pepsinogen)', 'Gastric Lipase', 'Renin (in infants)'],
    keyFacts: {
      en: [
        'Internal rugae folds expand stomach volume from 50 mL empty to over 2 Liters after a feast!',
        'A thick bicarbonate-rich mucus layer protects the stomach wall from digesting itself.',
        'Pyloric sphincter meters chyme release into duodenum in 3 mL squirts.'
      ],
      id: [
        'Lipatan rugae memungkinkan lambung mengembang dari 50 mL hingga lebih dari 2 Liter!',
        'Lapisan mukus tebal beralkali melindungi mukosa lambung dari asam dan enzim.',
        'Sfingter pilorus melepas kimus secara bertahap sedikit demi sedikit ke duodenum.'
      ]
    },
    disorders: {
      en: ['Gastric Peptic Ulcers (often H. pylori infection)', 'Gastritis', 'Pernicious Anemia (lack of intrinsic factor)'],
      id: ['Tukak Lambung (infeksi H. pylori atau erosi mukosa)', 'Gastritis (Maag)', 'Anemia Pernisiosa']
    },
    svgPathId: 'path-stomach',
    highlightCoordinates: { x: 220, y: 220 }
  },
  {
    id: 'liver',
    name: { en: 'Liver (Hepar)', id: 'Hati (Hepar)' },
    category: 'accessory_organ',
    location: 'Upper Right Abdomen beneath diaphragm',
    pH: 'Produces alkaline Bile (pH 7.6 - 8.6)',
    mechanicalAction: {
      en: 'Synthesizes Bile salts that mechanically emulsify large insoluble lipid droplets into microscopic micelles, expanding surface area for lipase by 1000x.',
      id: 'Memproduksi garam empedu yang mengemulsikan tetesan lemak besar menjadi misel mikroskopis, memperluas area permukaan lipase.'
    },
    chemicalAction: {
      en: 'Deaminates excess amino acids into urea, detoxifies toxins/alcohol, stores glycogen, iron, vitamins A, D, E, K.',
      id: 'Deaminasi kelebihan asam amino menjadi urea, detoksifikasi racun, menyimpan glikogen, zat besi, vitamin larut lemak.'
    },
    secretions: [
      { en: 'Bile (Bile salts, bilirubin from RBC breakdown, cholesterol, water, HCO3-)', id: 'Cairan Empedu (garam empedu, pigmen bilirubin, kolesterol, bikarbonat)' }
    ],
    enzymes: [],
    keyFacts: {
      en: [
        'Largest internal organ (~1.5 kg) performing over 500 vital biological functions.',
        'Bile contains NO digestive enzymes! Its action on fats is purely physical/mechanical emulsification.',
        'Receives nutrient-rich blood directly from intestines via the Hepatic Portal Vein.'
      ],
      id: [
        'Organ internal terbesar (~1.5 kg) dengan lebih dari 500 fungsi vital.',
        'Empedu TIDAK mengandung enzim pencernaan! Perannya pada lemak murni emulsifikasi fisik.',
        'Menerima darah kaya nutrisi dari usus melalui Vena Porta Hepatika.'
      ]
    },
    disorders: {
      en: ['Hepatitis (A, B, C)', 'Cirrhosis', 'Fatty Liver Disease', 'Jaundice (excess bilirubin)'],
      id: ['Hepatitis', 'Sirosis hati', 'Penyakit perlemakan hati', 'Penyakit kuning (ikterus)']
    },
    svgPathId: 'path-liver',
    highlightCoordinates: { x: 155, y: 205 }
  },
  {
    id: 'gallbladder',
    name: { en: 'Gallbladder (Vesica Fellea)', id: 'Kantung Empedu' },
    category: 'accessory_organ',
    location: 'Underneath the right lobe of the liver',
    pH: 'Stores alkaline Bile (pH ~8.0)',
    mechanicalAction: {
      en: 'Stores and concentrates bile up to 10-fold by reabsorbing water; contracts when stimulated by the hormone CCK (cholecystokinin).',
      id: 'Menyimpan dan mengentalkan empedu hingga 10 kali lipat; berkontraksi saat distimulasi hormon CCK (Kolesistokinin).'
    },
    chemicalAction: {
      en: 'Releases concentrated bile through cystic duct and common bile duct into the duodenum.',
      id: 'Menyalurkan empedu pekat ke duodenum melalui saluran empedu.'
    },
    secretions: [
      { en: 'Concentrated Bile', id: 'Empedu terkonsentrasi' }
    ],
    enzymes: [],
    keyFacts: {
      en: [
        'Holds approximately 30-50 mL of concentrated bile.',
        'Triggered to contract when fatty chyme enters the duodenum.',
        'Humans can survive without a gallbladder (cholecystectomy); bile trickles continuously from the liver.'
      ],
      id: [
        'Kapasitas sekitar 30-50 mL cairan empedu pekat.',
        'Berkontraksi kuat saat kimus berlemak merangsang pelepasan kolesistokinin.',
        'Manusia dapat hidup tanpa kantung empedu (setelah operasi kolesistektomi).'
      ]
    },
    disorders: {
      en: ['Gallstones (Cholelithiasis)', 'Cholecystitis (inflammation)', 'Biliary colic'],
      id: ['Batu empedu (Kolelitiasis)', 'Kolesistitis (radang kantung empedu)', 'Kolik bilier']
    },
    svgPathId: 'path-gallbladder',
    highlightCoordinates: { x: 165, y: 235 }
  },
  {
    id: 'pancreas',
    name: { en: 'Pancreas', id: 'Pankreas' },
    category: 'accessory_organ',
    location: 'Retroperitoneal, nestled in C-loop of duodenum',
    pH: 'Secretes alkaline Pancreatic Juice (pH 7.8 - 8.3)',
    mechanicalAction: {
      en: 'None (glandular organ).',
      id: 'Tidak ada (organ kelenjar sekresi).'
    },
    chemicalAction: {
      en: 'Secretes broad-spectrum cocktail: Pancreatic Amylase, Trypsinogen (activated by enterokinase to Trypsin), Chymotrypsin, Pancreatic Lipase, Nucleases, and rich NaHCO3 to neutralize acidic stomach chyme.',
      id: 'Mensekresi enzim lengkap: Amilase pankreas, Tripsinogen (diaktifkan enterokinase jadi tripsin), Kimotripsin, Lipase pankreas, Nuklease, serta NaHCO3 penetral asam.'
    },
    secretions: [
      { en: 'Sodium Bicarbonate (NaHCO3) neutralizing HCl', id: 'Natrium bikarbonat (menetralkan keasaman kimus lambung)' },
      { en: 'Pancreatic Amylase, Trypsinogen, Pancreatic Lipase', id: 'Amilase pankreas, Tripsinogen, Lipase pankreas' },
      { en: 'Endocrine: Insulin (beta cells) and Glucagon (alpha cells)', id: 'Endokrin: Insulin (sel beta) & Glukagon (sel alfa)' }
    ],
    enzymes: ['Pancreatic Amylase', 'Trypsin', 'Chymotrypsin', 'Pancreatic Lipase', 'Nucleases'],
    keyFacts: {
      en: [
        'Dual gland: 99% exocrine (digestive enzymes) and 1% endocrine (Islets of Langerhans regulating blood glucose).',
        'Secretes digestive enzymes as inactive zymogens to prevent autolysis (self-digestion).',
        'Without pancreatic lipase, over 80% of dietary fat passes unabsorbed (steatorrhea).'
      ],
      id: [
        'Kelenjar ganda: 99% eksokrin (enzim pencernaan) dan 1% endokrin (Pulau Langerhans pengatur glukosa darah).',
        'Mensekresi protease dalam bentuk zimogen inaktif untuk mencegah kerusakan jaringan pankreas.',
        'Tanpa lipase pankreas, penyerapan lemak gagal menyebabkan steatorea (tinja berlemak).'
      ]
    },
    disorders: {
      en: ['Acute & Chronic Pancreatitis', 'Type 1 Diabetes Mellitus', 'Exocrine Pancreatic Insufficiency'],
      id: ['Pankreatitis akut/kronis', 'Diabetes Melitus', 'Insufisiensi Pankreas Eksokrin']
    },
    svgPathId: 'path-pancreas',
    highlightCoordinates: { x: 215, y: 255 }
  },
  {
    id: 'duodenum',
    name: { en: 'Small Intestine - Duodenum', id: 'Usus Halus - Duodenum (Usus 12 Jari)' },
    category: 'alimentary_canal',
    location: 'First 25 cm of Small Intestine (C-shaped loop)',
    pH: '7.4 - 8.2 (Alkaline)',
    mechanicalAction: {
      en: 'Segmentation (rhythmic local contractions that mix chyme with digestive secretions); weak peristalsis waves.',
      id: 'Segmentasi (kontraksi ritmis membolak-balik kimus agar tercampur rata dengan sekresi empedu & pankreas).'
    },
    chemicalAction: {
      en: 'Major site of chemical digestion! Acidic chyme is neutralized by pancreatic HCO3-; bile emulsifies fats; pancreatic & intestinal brush border enzymes hydrolyze carbs, proteins, and lipids.',
      id: 'Pusat pencernaan kimiawi terbesar! Kimus dinetralkan oleh bikarbonat; lemak diemulsikan empedu; enzim memecah karbohidrat, protein, lipid.'
    },
    secretions: [
      { en: 'Intestinal juice (Succus Entericus: maltase, lactase, sucrase, peptidases, enterokinase)', id: 'Getah usus (Sukus enterikus: maltase, laktase, sukrase, peptidase)' },
      { en: 'Brunner glands alkaline mucus protecting duodenal wall', id: 'Lendir basa kelenjar Brunner' }
    ],
    enzymes: ['Enterokinase', 'Maltase', 'Sucrase', 'Lactase', 'Aminopeptidase', 'Dipeptidase'],
    keyFacts: {
      en: [
        'Name comes from Latin "duodecim" meaning 12 finger-breadths (~25 cm) long.',
        'Hormones Secretin (triggered by acid) and CCK (triggered by fats/amino acids) coordinate liver and pancreas secretions.',
        'Enterokinase (enteropeptidase) in duodenal mucosa activates trypsinogen to trypsin.'
      ],
      id: [
        'Berasal dari bahasa Latin yang berarti "12 jari" (~25 cm panjangnya).',
        'Hormon Sekretin (dipicu asam) dan CCK (dipicu lemak/protein) mengontrol kerja hati dan pankreas.',
        'Enterokinase pada dinding duodenum memicu aktifnya tripsinogen menjadi tripsin.'
      ]
    },
    disorders: {
      en: ['Duodenal Ulcer', 'Duodenitis', 'Celiac Disease damage'],
      id: ['Ulkus duodenum', 'Duodenitis', 'Kerusakan vili akibat Penyakit Celiac']
    },
    svgPathId: 'path-duodenum',
    highlightCoordinates: { x: 235, y: 265 }
  },
  {
    id: 'jejunum_ileum',
    name: { en: 'Small Intestine - Jejunum & Ileum', id: 'Usus Halus - Jejunum & Ileum' },
    category: 'alimentary_canal',
    location: 'Mid to lower abdomen (~6 meters length)',
    pH: '7.5 - 8.0',
    mechanicalAction: {
      en: 'Segmentation contractions continuously slosh chyme against the absorptive mucosal surface; peristaltic waves sweep unabsorbed residue towards ileocecal valve.',
      id: 'Gerak segmentasi dan peristaltik mengalirkan kimus menyentuh jutaan mikrovili untuk penyerapan nutrisi maksimal.'
    },
    chemicalAction: {
      en: 'Brush border membrane enzymes complete terminal digestion: Disaccharides into Monosaccharides (glucose, galactose, fructose); Peptides into Amino Acids.',
      id: 'Enzim tepi sikat menuntaskan pencernaan: Disakarida dipecah menjadi Monosakarida; Peptida menjadi Asam Amino.'
    },
    secretions: [
      { en: 'Intestinal mucus and protective immunoglobulin A (IgA)', id: 'Mukus pelindung dan IgA (kekebalan mukosa)' }
    ],
    enzymes: ['Maltase', 'Sucrase', 'Lactase', 'Peptidases', 'Nucleosidases'],
    keyFacts: {
      en: [
        'Circular folds (plicae circulares) + villi + microvilli increase inner surface area to ~250-300 m² (size of a tennis court!).',
        'Water-soluble nutrients (glucose, amino acids, minerals, water-soluble vitamins) enter blood capillaries -> Hepatic Portal Vein to liver.',
        'Lipid digestion products (fatty acids, monoglycerides) are resynthesized into chylomicrons and enter central lacteals (lymphatic system)!'
      ],
      id: [
        'Lipatan sirkuler + vili + mikrovili memperluas permukaan serap hingga ~250-300 m² (seluas lapangan tenis!).',
        'Nutrisi larut air (glukosa, asam amino) diserap ke kapiler darah menuju Vena Porta Hepatika ke hati.',
        'Asam lemak & gliserol dibungkus jadi kilomikron dan diserap ke pembuluh kil (lakteal/getah bening)!'
      ]
    },
    disorders: {
      en: ['Celiac Disease (autoimmune atrophy of villi)', 'Crohn Disease', 'Lactose Intolerance (hypolactasia)'],
      id: ['Penyakit Celiac (kerusakan vili oleh gluten)', 'Penyakit Crohn', 'Intoleransi Laktosa']
    },
    svgPathId: 'path-jejunum-ileum',
    highlightCoordinates: { x: 200, y: 310 }
  },
  {
    id: 'colon',
    name: { en: 'Large Intestine (Colon)', id: 'Usus Besar (Kolon)' },
    category: 'alimentary_canal',
    location: 'Surrounds small intestine frame (~1.5 meters)',
    pH: '6.0 - 7.0',
    mechanicalAction: {
      en: 'Haustral churning (slow segmenting movement in pouches), mass peristalsis (gastrocolic reflex moving contents 1-3 times daily).',
      id: 'Kontraksi haustra lambat mengaduk ampas makanan, dan gerak peristaltik massal mendorong tinja menuju rektum.'
    },
    chemicalAction: {
      en: 'NO human digestive enzymes. Trillions of symbiotic gut bacteria ferment undigested fiber, producing short-chain fatty acids (SCFAs), vitamin K, biotin, and gases (methane, H2).',
      id: 'TIDAK ADA enzim dari tubuh manusia. Triliunan bakteri mikrobiota memfermentasi sisa serat, menghasilkan vitamin K, biotin, dan gas flatus.'
    },
    secretions: [
      { en: 'Alkaline mucus rich in HCO3- to lubricate feces passage and protect against bacterial acids', id: 'Mukus pelumas feses dan penahan keasaman bakteri' }
    ],
    enzymes: [],
    keyFacts: {
      en: [
        'Reabsorbs ~1.5 to 2.0 Liters of water daily; unabsorbed matter condenses into semi-solid stool.',
        'If chyme travels too fast: Diarrhea (insufficient water absorption). If too slow: Constipation (excessive water removal).',
        'Houses 100 trillion gut microbiota organisms essential for immunity and metabolism.'
      ],
      id: [
        'Menyerap kembali ~1.5 - 2.0 Liter air setiap hari hingga tinja memadat.',
        'Jika gerak terlalu cepat: Diare (kurang serap air). Jika terlalu lambat: Sembelit/Konstipasi (terlalu banyak air terserap).',
        'Dihuni 100 triliun mikrobiota usus yang penting bagi imunitas dan sintesis vitamin.'
      ]
    },
    disorders: {
      en: ['Appendicitis (infection of appendix)', 'Constipation', 'Diarrhea', 'Irritable Bowel Syndrome (IBS)', 'Ulcerative Colitis'],
      id: ['Apendisitis (usus buntu)', 'Konstipasi (sembelit)', 'Diare', 'IBS (Irritable Bowel Syndrome)', 'Kanker Kolon']
    },
    svgPathId: 'path-colon',
    highlightCoordinates: { x: 190, y: 340 }
  },
  {
    id: 'rectum_anus',
    name: { en: 'Rectum & Anus', id: 'Rektum & Anus' },
    category: 'alimentary_canal',
    location: 'Pelvic terminal tract (~15 cm)',
    pH: '6.8',
    mechanicalAction: {
      en: 'Storage of feces in rectum distends rectal wall, triggering stretch receptors (defecation reflex). Internal anal sphincter relaxes involuntarily; external sphincter under voluntary somatic control relaxes to evacuate.',
      id: 'Rektum menampung feses sementara hingga memicu refleks defekasi. Sfingter ani internal berelaksasi otomatis; sfingter eksterna dikendalikan sadar.'
    },
    chemicalAction: {
      en: 'None.',
      id: 'Tidak ada.'
    },
    secretions: [
      { en: 'Mucus to ease bowel evacuation', id: 'Mukus pelicin buang air besar' }
    ],
    enzymes: [],
    keyFacts: {
      en: [
        'Stretch receptors in rectal wall alert brain when stool reaches threshold volume.',
        'Valsalva maneuver (contracting abdominal muscles while holding breath) aids defecation.',
        'External anal sphincter is skeletal muscle, allowing voluntary control of excretion.'
      ],
      id: [
        'Reseptor regang pada dinding rektum mengirim sinyal ke otak saat feses siap dikeluarkan.',
        'Sfingter ani eksterna tersusun atas otot lurik yang dapat dikendalikan secara sadar.',
        'Feses terdiri dari 75% air, sel epitel mati, bakteri, dan serat tak tercerna.'
      ]
    },
    disorders: {
      en: ['Hemorrhoids (swollen veins)', 'Anal Fissures', 'Fecal Incontinence'],
      id: ['Hemoroid / Wasir (pelebaran vena)', 'Fisura ani', 'Inkontinensia fekal']
    },
    svgPathId: 'path-rectum',
    highlightCoordinates: { x: 200, y: 400 }
  }
];

export const ENZYMES_DATA: EnzymeInfo[] = [
  {
    id: 'salivary_amylase',
    name: 'Salivary Amylase',
    indonesianName: 'Amilase Saliva (Ptialin)',
    producedBy: { en: 'Salivary Glands (Parotid, Submandibular)', id: 'Kelenjar Saliva (Parotis, Submandibularis)' },
    siteOfAction: { en: 'Oral Cavity (Mouth)', id: 'Rongga Mulut' },
    substrate: { en: 'Cooked Starch (Amylose, Amylopectin)', id: 'Pati / Amilum Matang' },
    product: { en: 'Maltose (disaccharide), Isomaltose & Dextrins', id: 'Maltosa & Dekstrin' },
    optimalPH: { min: 6.2, max: 7.4, optimal: 6.8 },
    optimalTemp: { min: 35, max: 40, optimal: 37 },
    activator: { en: 'Chloride ions (Cl-)', id: 'Ion Klorida (Cl-)' },
    indicatorTest: {
      reagent: 'Lugol Iodine Solution',
      positiveColor: '#1e3a8a', // dark blue-black for intact starch
      negativeColor: '#d97706', // amber/brown when starch is digested away
      testName: 'Iodine Starch Test',
      description: {
        en: 'Blue-black color disappears as salivary amylase hydrolyzes starch into maltose!',
        id: 'Warna biru-kehitaman menghilang menjadi kecokelatan saat amilase berhasil mencerna pati menjadi maltosa!'
      }
    },
    funFact: {
      en: 'Chewing plain white bread for 60 seconds makes it taste distinctly sweet because ptyalin breaks bland starch into sweet maltose sugars.',
      id: 'Mengunyah nasi atau roti tawar tanpa selai selama 1 menit membuatnya terasa manis karena ptialin mengubah pati tawar menjadi gula maltosa.'
    }
  },
  {
    id: 'pepsin',
    name: 'Pepsin',
    indonesianName: 'Pepsin',
    producedBy: { en: 'Chief Cells of Gastric Glands (as Pepsinogen)', id: 'Sel Utama (Chief cells) Kelenjar Lambung' },
    siteOfAction: { en: 'Stomach Cavity', id: 'Lambung' },
    substrate: { en: 'Proteins (Albumin, Casein, Collagen)', id: 'Protein Alami' },
    product: { en: 'Peptones & Short Polypeptides', id: 'Pepton & Polipeptida Pendek' },
    optimalPH: { min: 1.5, max: 2.5, optimal: 2.0 },
    optimalTemp: { min: 36, max: 40, optimal: 37 },
    activator: { en: 'Hydrochloric Acid (HCl) & autocatalysis', id: 'Asam Klorida (HCl)' },
    indicatorTest: {
      reagent: 'Biuret Reagent (CuSO4 + NaOH)',
      positiveColor: '#7e22ce', // violet/purple for proteins
      negativeColor: '#38bdf8', // light blue when fully digested or absent
      testName: 'Biuret Protein Hydrolysis Test',
      description: {
        en: 'Deep violet indicates large peptide chains; lightens as pepsin cleaves proteins into smaller fragments.',
        id: 'Warna ungu pekat menandakan rantai protein utuh; memudar saat pepsin memotong protein menjadi peptida pendek.'
      }
    },
    funFact: {
      en: 'Pepsin is one of the few enzymes in the human body capable of thriving in battery-acid strength acidity (pH ~1.8)! In neutral pH, it permanently denatures.',
      id: 'Pepsin adalah enzim unik tubuh yang membutuhkan keasaman ekstrim (pH 1.8-2.0)! Pada pH netral usus, pepsin langsung rusak / inaktif.'
    }
  },
  {
    id: 'pancreatic_amylase',
    name: 'Pancreatic Amylase',
    indonesianName: 'Amilase Pankreas (Amilopsin)',
    producedBy: { en: 'Pancreatic Acinar Cells', id: 'Sel Asinar Pankreas' },
    siteOfAction: { en: 'Duodenum (Small Intestine)', id: 'Usus Halus (Duodenum)' },
    substrate: { en: 'Remaining Undigested Starches & Glycogen', id: 'Sisa Pati & Glikogen' },
    product: { en: 'Maltose & Maltotriose', id: 'Maltosa & Maltotriosa' },
    optimalPH: { min: 7.2, max: 8.2, optimal: 7.8 },
    optimalTemp: { min: 36, max: 39, optimal: 37 },
    indicatorTest: {
      reagent: 'Benedict Reagent (heated)',
      positiveColor: '#ea580c', // brick red precipitate for reducing sugars
      negativeColor: '#2563eb', // blue
      testName: "Benedict's Reducing Sugar Test",
      description: {
        en: 'Turns from clear blue to cloudy green, yellow, and brick-red precipitate as maltose sugars are generated.',
        id: 'Berubah dari biru jernih menjadi endapan merah bata saat terbentuk gula pereduksi maltosa.'
      }
    },
    funFact: {
      en: 'Pancreatic amylase is much more potent than salivary amylase and completes starch digestion in just a few minutes in the duodenum.',
      id: 'Amilase pankreas jauh lebih kuat daripada enzim saliva dan menuntaskan hampir seluruh sisa pati di usus halus.'
    }
  },
  {
    id: 'trypsin',
    name: 'Trypsin',
    indonesianName: 'Tripsin',
    producedBy: { en: 'Pancreas (as Trypsinogen)', id: 'Pankreas (sebagai Tripsinogen)' },
    siteOfAction: { en: 'Duodenum & Jejunum', id: 'Usus Halus (Duodenum & Jejunum)' },
    substrate: { en: 'Polypeptides & Denatured Proteins', id: 'Polipeptida & Protein' },
    product: { en: 'Small Peptides & Oligopeptides', id: 'Peptida Kecil & Asam Amino' },
    optimalPH: { min: 7.5, max: 8.5, optimal: 8.0 },
    optimalTemp: { min: 36, max: 40, optimal: 37 },
    activator: { en: 'Enterokinase (enteropeptidase) on brush border', id: 'Enterokinase pada vili usus' },
    indicatorTest: {
      reagent: 'Biuret Reagent / Ninhydrin Test',
      positiveColor: '#9333ea',
      negativeColor: '#60a5fa',
      testName: 'Protease Activity Assay',
      description: {
        en: 'Cleaves peptide chains at carboxyl side of lysine and arginine residues.',
        id: 'Memotong ikatan peptida spesifik pada residu lisin dan arginin.'
      }
    },
    funFact: {
      en: 'Once enterokinase activates a tiny amount of trypsin, trypsin autocatalyzes and activates all other pancreatic enzymes (chymotrypsin, procarboxypeptidase, proelastase)!',
      id: 'Setelah enterokinase mengaktifkan sedikit tripsin, tripsin mengaktifkan semua zimogen pankreas lainnya secara serentak!'
    }
  },
  {
    id: 'pancreatic_lipase',
    name: 'Pancreatic Lipase',
    indonesianName: 'Lipase Pankreas (Steapsin)',
    producedBy: { en: 'Pancreatic Acinar Cells', id: 'Sel Asinar Pankreas' },
    siteOfAction: { en: 'Duodenum & Small Intestine', id: 'Usus Halus (Duodenum)' },
    substrate: { en: 'Bile-Emulsified Triglycerides (Fats & Oils)', id: 'Trigliserida yang diemulsikan Empedu' },
    product: { en: 'Free Fatty Acids & 2-Monoglycerides', id: 'Asam Lemak Bebas & Monogliserida' },
    optimalPH: { min: 7.5, max: 8.5, optimal: 8.0 },
    optimalTemp: { min: 36, max: 40, optimal: 37 },
    activator: { en: 'Colipase & Bile Salts', id: 'Kolipase & Garam Empedu' },
    indicatorTest: {
      reagent: 'Phenolphthalein / pH indicator in lipid-milk emulsion',
      positiveColor: '#f43f5e', // pink at alkali, decolorizes to clear yellow/white as fatty acids lower pH
      negativeColor: '#ec4899',
      testName: 'Lipase Acidification Assay',
      description: {
        en: 'Solution turns acidic and changes indicator color as fatty acids are liberated from triglycerides.',
        id: 'Pelepasan asam lemak bebas menurunkan pH larutan, memudarkan warna indikator alkali.'
      }
    },
    funFact: {
      en: 'Without bile salts from the liver, lipase can only work on the outside crust of oil drops. Emulsification speeds up fat digestion by over 1,000 times!',
      id: 'Tanpa garam empedu, lipase hanya bisa mencerna permukaan luar tetes minyak. Emulsi mempercepat kerja lipase hingga 1.000 kali lipat!'
    }
  },
  {
    id: 'maltase_lactase',
    name: 'Brush Border Disaccharidases (Maltase, Lactase, Sucrase)',
    indonesianName: 'Enzim Tepi Sikat (Maltase, Laktase, Sukrase)',
    producedBy: { en: 'Microvilli of Small Intestine Epithelial Cells', id: 'Mikrovili Sel Epitel Usus Halus' },
    siteOfAction: { en: 'Brush Border Surface of Enterocytes', id: 'Permukaan Tepi Sikat Enterosit' },
    substrate: { en: 'Maltose (from starch), Lactose (milk sugar), Sucrose (table sugar)', id: 'Maltosa, Laktosa (gula susu), Sukrosa (gula tebu)' },
    product: { en: 'Glucose, Galactose, and Fructose (absorbable monosaccharides)', id: 'Glukosa, Galaktosa, Fruktosa (monosakarida)' },
    optimalPH: { min: 7.0, max: 8.0, optimal: 7.5 },
    optimalTemp: { min: 36, max: 39, optimal: 37 },
    indicatorTest: {
      reagent: 'Glucose Oxidase Strip / Benedict Test',
      positiveColor: '#16a34a', // green/brown on strip for glucose
      negativeColor: '#e2e8f0',
      testName: 'Monosaccharide Detection Assay',
      description: {
        en: 'Detects single hexose sugars ready for sodium-glucose cotransporter (SGLT1) absorption into enterocytes.',
        id: 'Mendeteksi glukosa bebas yang siap diserap oleh transporter membran SGLT1 ke dalam sel vili.'
      }
    },
    funFact: {
      en: 'In most mammals and about 65% of adult humans, lactase production sharply declines after childhood, resulting in adult lactose intolerance.',
      id: 'Pada sekitar 65% manusia dewasa, produksi laktase menurun secara alami setelah masa kanak-kanak, memicu intoleransi laktosa.'
    }
  }
];

export const PATIENT_CASES: PatientCase[] = [
  {
    id: 'case_1',
    patientName: 'Sarah Jenkins',
    age: 42,
    gender: { en: 'Female', id: 'Wanita' },
    occupation: { en: 'Culinary Chef', id: 'Koki Restoran' },
    chiefComplaint: {
      en: 'Sudden intense pain in the upper right quadrant of the abdomen, radiating to the right shoulder after eating deep-fried chicken and gravy.',
      id: 'Nyeri hebat mendadak di perut kanan atas yang menjalar ke pundak kanan setelah makan ayam goreng krispi berlemak.'
    },
    history: {
      en: 'Episodes began 3 months ago after fatty meals. Stool appears unusually pale/clay-colored, and urine is tea-colored. Sclera of eyes show mild yellowing (jaundice).',
      id: 'Keluhan muncul 3 bulan terakhir usai makan berlemak. Tinja tampak pucat seperti dempul tanah liat, urin berwarna gelap seperti teh. Bagian putih mata (sklera) agak kekuningan.'
    },
    vitals: {
      temp: '37.8 °C',
      bp: '128/82 mmHg',
      hr: '88 bpm'
    },
    availableTests: [
      {
        id: 'ultrasound',
        name: { en: 'Abdominal Ultrasound (RUQ)', id: 'USG Abdomen Kanan Atas' },
        cost: 150,
        result: {
          en: 'Multiple echogenic stones detected within gallbladder lumen. Common bile duct is dilated (9 mm) with an acoustic shadowing stone lodged in the distal duct.',
          id: 'Tampak beberapa batu berdensitas tinggi di kantung empedu. Saluran empedu utama melebar (9 mm) dengan batu menyumbat saluran distalis.'
        },
        isKeyIndicator: true
      },
      {
        id: 'stool_fat',
        name: { en: 'Fecal Fat Analysis', id: 'Analisis Lemak Feses' },
        cost: 60,
        result: {
          en: 'Markedly elevated unabsorbed fecal lipid content (Steatorrhea, 18g/day; normal < 7g).',
          id: 'Kadar lemak tinja sangat tinggi (Steatorea 18g/hari; normal < 7g) karena lemak tidak teremulsi.'
        },
        isKeyIndicator: true
      },
      {
        id: 'bilirubin_blood',
        name: { en: 'Total & Direct Serum Bilirubin', id: 'Bilirubin Total & Direk' },
        cost: 50,
        result: {
          en: 'Total bilirubin elevated at 4.2 mg/dL (direct conjugated bilirubin 3.6 mg/dL) indicating obstructive cholestasis.',
          id: 'Bilirubin total melonjak 4.2 mg/dL dengan dominasi bilirubin terkonjugasi (ikterus obstruktif).'
        },
        isKeyIndicator: true
      },
      {
        id: 'ecg',
        name: { en: '12-Lead Electrocardiogram', id: 'EKG Jantung' },
        cost: 80,
        result: {
          en: 'Normal sinus rhythm. No acute cardiac ischemia.',
          id: 'Irama sinus normal, tidak ada kelainan jantung.'
        },
        isKeyIndicator: false
      }
    ],
    diagnosesOptions: [
      {
        id: 'cholelithiasis',
        name: { en: 'Choledocholithiasis / Obstructive Gallstones', id: 'Batu Empedu (Koledokolitiasis) Menyumbat Saluran' },
        organInvolved: 'Gallbladder & Common Bile Duct',
        explanation: {
          en: 'Correct! Gallstones obstruct bile flow. Without bile salts entering the duodenum, fat cannot be emulsified for lipase digestion, leading to steatorrhea (pale fatty stool) and back-up of bilirubin causing jaundice.',
          id: 'Tepat sekali! Batu empedu menyumbat saluran empedu utama. Akibatnya getah empedu tidak bisa mengemulsikan lemak di duodenum, menyebabkan tinja pucat berlemak dan bilirubin menumpuk di darah (ikterus).'
        },
        isCorrect: true
      },
      {
        id: 'gerd',
        name: { en: 'Severe GERD / Acid Reflux', id: 'Penyakit Refluks Asam Lambung (GERD)' },
        organInvolved: 'Esophagus',
        explanation: {
          en: 'Incorrect. GERD causes retrosternal burning behind the sternum, not right-upper quadrant jaundice and clay-colored stools.',
          id: 'Kurang tepat. GERD menimbulkan rasa terbakar di dada, bukan tinja pucat, mata kuning, dan sumbatan saluran empedu.'
        },
        isCorrect: false
      },
      {
        id: 'celiac',
        name: { en: 'Celiac Disease', id: 'Penyakit Celiac' },
        organInvolved: 'Small Intestine',
        explanation: {
          en: 'Incorrect. Celiac disease is an autoimmune reaction to gluten causing villous atrophy, not acute biliary colic with stones.',
          id: 'Salah. Penyakit Celiac dipicu gluten dan merusak mikrovili, tidak menimbulkan batu empedu dan ikterus akut.'
        },
        isCorrect: false
      }
    ],
    treatmentsOptions: [
      {
        id: 'laparoscopic',
        text: {
          en: 'Laparoscopic cholecystectomy / ERCP stone extraction and low-fat dietary modification.',
          id: 'Operasi laparoskopi pengangkatan batu empedu / kolesistektomi serta pembatasan asupan makanan berlemak tinggi.'
        },
        isCorrect: true
      },
      {
        id: 'antacid_only',
        text: {
          en: 'Prescribe high-dose proton pump inhibitors and continue regular fried meals.',
          id: 'Berikan obat maag lambung saja dan tetap makan makanan gorengan berlemak.'
        },
        isCorrect: false
      }
    ],
    biologyConcept: {
      en: 'Bile is synthesized by hepatocytes in the liver and stored/concentrated in the gallbladder. Bile salts are amphipathic molecules that mechanically emulsify dietary fat droplets into micro-micelles, providing a massive surface area for pancreatic lipase to digest triglycerides into absorbable fatty acids. Bile also excretes bilirubin (heme breakdown pigment) which gives normal feces its brown stercobilin color.',
      id: 'Empedu dibuat di hati dan disimpan di kantung empedu. Garam empedu bersifat amfifatik yang mengemulsikan lemak besar menjadi misel mikroskopis agar lipase pankreas dapat bekerja cepat. Empedu juga membuang bilirubin yang memberi warna cokelat alami pada tinja lewat sterkobilin.'
    }
  },
  {
    id: 'case_2',
    patientName: 'Maya Thorne',
    age: 18,
    gender: { en: 'Female', id: 'Wanita' },
    occupation: { en: 'High School Student', id: 'Siswi SMA' },
    chiefComplaint: {
      en: 'Excessive abdominal cramping, loud intestinal gurgling (borborygmi), bloating, and watery osmotic diarrhea 30 to 60 minutes after having milkshakes or cereal with cow milk.',
      id: 'Perut kembung berbunyi keras, kram melilit, dan diare encer 30-60 menit setelah minum susu sapi atau es krim.'
    },
    history: {
      en: 'Symptoms never occur when eating rice, meat, or black coffee. No fever, no blood in stool. Weight is stable.',
      id: 'Keluhan tidak pernah timbul jika makan nasi, ayam, atau buah. Tidak ada demam, tidak ada darah dalam tinja.'
    },
    vitals: {
      temp: '36.7 °C',
      bp: '114/72 mmHg',
      hr: '72 bpm'
    },
    availableTests: [
      {
        id: 'hydrogen_breath',
        name: { en: 'Hydrogen Breath Test (after 25g oral lactose)', id: 'Uji Nafas Hidrogen (setelah minum laktosa)' },
        cost: 75,
        result: {
          en: 'Exhaled hydrogen gas spiked to 48 ppm at 90 minutes (normal baseline < 20 ppm). Confirms colonic bacterial fermentation of unabsorbed sugar.',
          id: 'Gas hidrogen dalam nafas melonjak 48 ppm (normal < 20 ppm), membuktikan gula tidak terserap dan difermentasi bakteri usus besar.'
        },
        isKeyIndicator: true
      },
      {
        id: 'stool_ph',
        name: { en: 'Stool pH & Reducing Substances', id: 'Uji pH & Zat Pereduksi Feses' },
        cost: 40,
        result: {
          en: 'Stool pH is acidic (pH 5.2; normal 6.5-7.5) and positive for reducing sugars due to lactic acid and SCFAs produced by bacteria.',
          id: 'pH feses asam (pH 5.2) dan positif gula pereduksi akibat produksi asam laktat oleh bakteri kolon.'
        },
        isKeyIndicator: true
      },
      {
        id: 'colonoscopy',
        name: { en: 'Full Colonoscopy', id: 'Kolonoskopi Lengkap' },
        cost: 450,
        result: {
          en: 'Normal colonic mucosa. No polyps, inflammation, or ulcerations.',
          id: 'Mukosa dinding usus besar normal tanpa radang atau polip.'
        },
        isKeyIndicator: false
      }
    ],
    diagnosesOptions: [
      {
        id: 'lactose_intolerance',
        name: { en: 'Primary Adult-Type Lactose Intolerance (Hypolactasia)', id: 'Intoleransi Laktosa (Defisiensi Enzim Laktase)' },
        organInvolved: 'Small Intestine Brush Border',
        explanation: {
          en: 'Correct! Deficiency of lactase on the microvilli means lactose disaccharide cannot be hydrolyzed into glucose and galactose. Unabsorbed lactose acts as an osmotic agent drawing water into the lumen, and colonic bacteria ferment it into hydrogen gas, methane, and irritant organic acids.',
          id: 'Tepat sekali! Berkurangnya enzim laktase di mikrovili usus membuat laktosa tidak dapat dipecah menjadi glukosa & galaktosa. Laktosa utuh menarik air ke dalam lumen (efek osmotik) dan difermentasi bakteri menjadi gas H2 dan asam.'
        },
        isCorrect: true
      },
      {
        id: 'appendicitis',
        name: { en: 'Acute Appendicitis', id: 'Apendisitis Akut' },
        organInvolved: 'Appendix / Caecum',
        explanation: {
          en: 'Incorrect. Appendicitis presents with acute fever, right lower quadrant tenderness, leukocytosis, and is not tied directly to dairy consumption.',
          id: 'Salah. Usus buntu menyebabkan demam tinggi dan nyeri terlokalisir di perut kanan bawah, bukan kram setelah minum susu.'
        },
        isCorrect: false
      }
    ],
    treatmentsOptions: [
      {
        id: 'lactase_diet',
        text: {
          en: 'Switch to lactose-free dairy alternatives or take oral lactase enzyme supplements before consuming dairy products.',
          id: 'Beralih ke susu bebas laktosa (plant-based milk) atau minum suplemen enzim laktase sebelum mengonsumsi olahan susu.'
        },
        isCorrect: true
      },
      {
        id: 'antibiotics',
        text: {
          en: 'Prescribe broad-spectrum antibiotics to kill all gut microbiota.',
          id: 'Beri antibiotik keras untuk membasmi seluruh bakteri usus.'
        },
        isCorrect: false
      }
    ],
    biologyConcept: {
      en: 'Lactose is a disaccharide consisting of glucose and galactose bonded by a beta-1,4-glycosidic linkage. It must be hydrolyzed by lactase on the enterocyte brush border to be absorbed via SGLT1 and GLUT5. When deficient, lactose remains in the intestinal lumen, drawing water by osmosis (causing diarrhea) and providing fuel for anaerobic bacteria in the colon, which generate hydrogen gas, methane, and cramping.',
      id: 'Laktosa adalah disakarida (glukosa + galaktosa) yang harus dihidrolisis enzim laktase di tepi sikat enterosit. Jika laktase kurang, laktosa menumpuk di lumen usus, menarik air secara osmotik (memicu diare) dan difermentasi bakteri usus besar menjadi gas hidrogen dan kram perut.'
    }
  },
  {
    id: 'case_3',
    patientName: 'David Vance',
    age: 38,
    gender: { en: 'Male', id: 'Pria' },
    occupation: { en: 'High School Principal', id: 'Kepala Sekolah' },
    chiefComplaint: {
      en: 'Gnawing, burning epigastric stomach pain that wakes him up at 2 AM. Pain is temporarily relieved by eating bread or drinking milk, but returns 2-3 hours later.',
      id: 'Nyeri perih membakar di ulu hati yang sering membangunkannya jam 2 dini hari. Nyeri mereda sesaat setelah makan biskuit atau minum obat antasida, lalu kambuh lagi.'
    },
    history: {
      en: 'Frequent high-stress work schedule, drinks 4 cups of black coffee daily, takes ibuprofen frequently for tension headaches. Occasional dark black tarry stools (melena).',
      id: 'Beban kerja stres tinggi, minum kopi hitam pekat 4 cangkir sehari, sering minum ibuprofen untuk sakit kepala. Sesekali buang air besar berwarna hitam pekat (melena).'
    },
    vitals: {
      temp: '37.0 °C',
      bp: '118/76 mmHg',
      hr: '80 bpm'
    },
    availableTests: [
      {
        id: 'endoscopy',
        name: { en: 'Upper GI Endoscopy (Esophagogastroduodenoscopy)', id: 'Endoskopi Saluran Cerna Atas (EGD)' },
        cost: 350,
        result: {
          en: 'A punched-out 1.2 cm circular mucosal ulceration in the gastric antrum and first part of duodenum with a visible clot; biopsy taken.',
          id: 'Ditemukan luka kawah tukak berdiameter 1.2 cm pada antrum lambung dan dinding duodenum proksimal dengan tanda erosi mukosa.'
        },
        isKeyIndicator: true
      },
      {
        id: 'urea_breath',
        name: { en: 'Rapid Urea Breath Test (UBT)', id: 'Uji Napas Urea (Helicobacter pylori)' },
        cost: 65,
        result: {
          en: 'Positive! Exhaled 13C-labeled CO2 confirms active urease activity of Helicobacter pylori bacteria inhabiting gastric mucosa.',
          id: 'Positif kuat! Ditemukan aktivitas enzim urease dari bakteri Helicobacter pylori yang mengikis pelindung mukosa lambung.'
        },
        isKeyIndicator: true
      },
      {
        id: 'chest_xray',
        name: { en: 'Chest X-Ray', id: 'Rontgen Toraks' },
        cost: 90,
        result: {
          en: 'Lungs clear, cardiac silhouette normal. No subdiaphragmatic free air (no perforated bowel).',
          id: 'Paru dan jantung normal, tidak ada perforasi dinding lambung.'
        },
        isKeyIndicator: false
      }
    ],
    diagnosesOptions: [
      {
        id: 'peptic_ulcer',
        name: { en: 'Peptic Ulcer Disease (H. pylori infection & NSAID erosions)', id: 'Tukak Lambung / Ulkus Peptikum (Infeksi H. pylori)' },
        organInvolved: 'Stomach & Duodenal Mucosa',
        explanation: {
          en: 'Correct! Helicobacter pylori secretes urease, neutralizing acid around itself and releasing cytotoxins that break down the protective gastric mucosal barrier. Unshielded epithelial cells are digested by pepsin and HCl, forming painful ulcers.',
          id: 'Tepat sekali! Bakteri Helicobacter pylori menghasilkan urease yang merusak lapisan mukus pelindung lambung. Asam lambung (HCl) dan pepsin langsung mengikis dinding sel epitel, menyebabkan luka tukak lambung dan perdarahan melena.'
        },
        isCorrect: true
      },
      {
        id: 'pancreatitis',
        name: { en: 'Acute Pancreatitis', id: 'Pankreatitis Akut' },
        organInvolved: 'Pancreas',
        explanation: {
          en: 'Incorrect. Pancreatitis causes agonizing continuous pain radiating through to the spine and does not improve with bread or antacids.',
          id: 'Kurang tepat. Pankreatitis menimbulkan nyeri tembus ke punggung dan tidak membaik dengan makanan.'
        },
        isCorrect: false
      }
    ],
    treatmentsOptions: [
      {
        id: 'triple_therapy',
        text: {
          en: 'Triple Therapy: Proton Pump Inhibitor (e.g. Omeprazole to suppress acid) + 2 Antibiotics (Clarithromycin & Amoxicillin to eradicate H. pylori), stop NSAIDs.',
          id: 'Terapi Tripel: Penghambat Pompa Proton (Omeprazole penekan asam) + 2 Antibiotik (Klaritromisin & Amoksisilin pembasmi H. pylori), serta hentikan obat anti-nyeri NSAID.'
        },
        isCorrect: true
      },
      {
        id: 'increase_acid',
        text: {
          en: 'Drink lemon juice and increase spicy pepper intake to kill the bacteria.',
          id: 'Minum jus lemon asam pekat dan makan cabai pedas untuk membunuh kuman.'
        },
        isCorrect: false
      }
    ],
    biologyConcept: {
      en: 'The stomach epithelium is normally shielded from its own 0.1 M HCl and pepsin by a thick mucus-bicarbonate barrier maintained by prostaglandins. H. pylori and NSAIDs (like ibuprofen) destroy this protective layer. In the absence of protection, pepsin digests the stomach wall proteins (autolysis), creating ulcers. Eating food transiently buffers luminal acid, explaining temporary relief.',
      id: 'Dinding lambung dilindungi dari asam HCl dan pepsin oleh lapisan lendir bikarbonat tebal. Bakteri H. pylori dan konsumsi obat NSAID merusak pelindung ini sehingga pepsin mencerna dinding lambung sendiri (autolisis). Makanan bertindak sebagai penyangga asam sesaat, meredakan nyeri sementara.'
    }
  },
  {
    id: 'case_4',
    patientName: 'Liam Carter',
    age: 16,
    gender: { en: 'Male', id: 'Pria' },
    occupation: { en: 'Track & Field Athlete', id: 'Atlet Lari Siswa' },
    chiefComplaint: {
      en: 'Chronic fatigue, poor athletic stamina, unexplainable weight loss (lost 6 kg over 4 months), pale skin, recurrent diarrhea, and abdominal bloating.',
      id: 'Tubuh sangat lemas, penurunan berat badan 6 kg tanpa sebab yang jelas, kulit pucat, perut kembung, dan sering diare kronis.'
    },
    history: {
      en: 'Blood tests at routine school checkup showed microcytic hypochromic anemia (hemoglobin 8.8 g/dL). Iron supplements caused gastrointestinal distress and did not improve his anemia.',
      id: 'Hasil cek darah menunjukkan anemia defisiensi besi berat (Hb 8.8 g/dL). Suplemen tablet besi yang diminum tidak kunjung menaikkan hemoglobin.'
    },
    vitals: {
      temp: '36.9 °C',
      bp: '105/65 mmHg',
      hr: '84 bpm'
    },
    availableTests: [
      {
        id: 'serology_tTG',
        name: { en: 'Anti-Tissue Transglutaminase (anti-tTG-IgA) Antibody', id: 'Antibodi Anti-tTG IgA' },
        cost: 95,
        result: {
          en: 'Significantly elevated at > 100 U/mL (normal < 10 U/mL), highly suggestive of autoimmune response to gluten.',
          id: 'Sangat tinggi (> 100 U/mL, normal < 10 U/mL), menunjukkan respon imun abnormal terhadap gluten.'
        },
        isKeyIndicator: true
      },
      {
        id: 'duodenal_biopsy',
        name: { en: 'Upper Endoscopy with Duodenal Mucosal Biopsy', id: 'Biopsi Mukosa Vili Duodenum' },
        cost: 380,
        result: {
          en: 'Microscopy demonstrates severe blunting and total atrophy of intestinal villi (Marsh IIIc lesion) with intraepithelial lymphocytosis and crypt hyperplasia.',
          id: 'Secara mikroskopis tampak atrofi total vili usus (vili menjadi datar/gundul) disertai radang limfosit, permukaan serap hilang.'
        },
        isKeyIndicator: true
      },
      {
        id: 'sweat_test',
        name: { en: 'Sweat Chloride Test', id: 'Uji Klorida Keringat' },
        cost: 110,
        result: {
          en: 'Chloride 22 mmol/L (Normal < 30). Rules out cystic fibrosis.',
          id: 'Kadar klorida keringat normal, menyingkirkan fibrosis kistik.'
        },
        isKeyIndicator: false
      }
    ],
    diagnosesOptions: [
      {
        id: 'celiac_disease',
        name: { en: 'Celiac Disease (Gluten-Induced Enteropathy)', id: 'Penyakit Celiac (Kerusakan Vili Akibat Gluten)' },
        organInvolved: 'Small Intestine (Villi & Microvilli)',
        explanation: {
          en: 'Correct! In celiac disease, gluten peptide (gliadin) triggers an autoimmune attack on the small intestinal mucosa. This flattens and destroys the villi and microvilli, shrinking absorption surface area from 250 m² to a fraction. Iron, vitamins, and calories pass unabsorbed, leading to severe anemia and weight loss!',
          id: 'Tepat sekali! Protein gluten (gliadin) dari gandum memicu respon autoimun yang merusak dan meratakan mikrovili usus halus. Hilangnya vili melumpuhkan penyerapan zat besi, kalsium, protein, dan glukosa, memicu malnutrisi dan anemia berat.'
        },
        isCorrect: true
      },
      {
        id: 'gerd',
        name: { en: 'GERD Reflux', id: 'Penyakit Refluks Lambung' },
        organInvolved: 'Esophagus',
        explanation: {
          en: 'Incorrect. GERD does not affect intestinal villi or produce severe iron malabsorption and villous flattening.',
          id: 'Salah. Penyakit GERD tidak merusak vili usus halus dan tidak menyebabkan atrofi permukaan serap.'
        },
        isCorrect: false
      }
    ],
    treatmentsOptions: [
      {
        id: 'strict_gluten_free',
        text: {
          en: 'Strict lifelong gluten-free diet (eliminate wheat, barley, rye) and nutritional repletion; allows villi to regenerate within months.',
          id: 'Diet bebas gluten (Gluten-Free Diet) ketat seumur hidup dengan menghindari gandum/roti/mi; memberi kesempatan vili usus tumbuh kembali.'
        },
        isCorrect: true
      },
      {
        id: 'eat_more_wheat',
        text: {
          en: 'Eat 5 slices of whole wheat bread daily to strengthen the gut wall.',
          id: 'Perbanyak makan roti gandum utuh untuk melatih dinding usus.'
        },
        isCorrect: false
      }
    ],
    biologyConcept: {
      en: 'The small intestine achieves its incredible absorptive capacity (over 250 m²) thanks to anatomical hierarchy: circular folds, microscopic villi, and ultramicroscopic microvilli (brush border). When villi are flattened (villous atrophy), the body suffers Generalized Malabsorption Syndrome. Iron is normally absorbed specifically in the duodenum, explaining why oral iron supplements fail if the duodenal brush border is obliterated.',
      id: 'Usus halus memiliki luas permukaan 250 m² berkat lipatan vili dan mikrovili (tepi sikat). Jika vili terkelupas atau rata (atrofi vili), tubuh mengalami sindrom malabsorpsi total. Zat besi diserap terutama di duodenum, itulah alasan mengapa obat tablet besi tidak mempan saat vili duodenum rusak.'
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'enzymes',
    difficulty: 'Grade 11 Standard',
    question: {
      en: 'Which enzyme is responsible for initiating the chemical breakdown of carbohydrates in the human mouth, and what is its optimal pH?',
      id: 'Enzim apakah yang memulai pencernaan kimiawi karbohidrat di rongga mulut manusia, dan berapa pH optimumnya?'
    },
    options: {
      en: [
        'Pepsin at pH 2.0',
        'Salivary Amylase (Ptyalin) at pH 6.8',
        'Pancreatic Lipase at pH 8.0',
        'Trypsin at pH 8.0'
      ],
      id: [
        'Pepsin pada pH 2.0',
        'Amilase Saliva (Ptialin) pada pH 6.8',
        'Lipase Pankreas pada pH 8.0',
        'Tripsin pada pH 8.0'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'Salivary amylase (also known as ptyalin) is secreted by salivary glands and hydrolyzes starch into maltose disaccharides at an optimal near-neutral pH of ~6.8.',
      id: 'Amilase saliva (ptialin) disekresikan kelenjar ludah untuk menghidrolisis amilum menjadi maltosa pada pH netral sekitar 6.8.'
    }
  },
  {
    id: 2,
    topic: 'anatomy',
    difficulty: 'Grade 11 Standard',
    question: {
      en: 'What vital physiological role does the Epiglottis perform during deglutition (swallowing)?',
      id: 'Apa fungsi vital lempeng tulang rawan Epiglotis saat proses menelan makanan (deglutisi)?'
    },
    options: {
      en: [
        'It produces gastric acid to sterilize food',
        'It folds down over the glottis/larynx to prevent food bolus from entering the respiratory trachea',
        'It absorbs fatty acids directly into the bloodstream',
        'It stimulates salivary secretion via the vagus nerve'
      ],
      id: [
        'Menghasilkan asam lambung untuk membunuh kuman',
        'Menutup laring/saluran pernapasan agar bolus makanan tidak masuk ke tenggorokan (trakea)',
        'Menyerap asam lemak secara langsung ke pembuluh darah',
        'Merangsang kelenjar ludah berkontraksi'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'The epiglottis folds downward over the entrance to the larynx and trachea during swallowing, directing the food bolus safely into the esophagus and preventing choking.',
      id: 'Epiglotis menutup pita suara dan saluran pernapasan (laring/trakea) saat menelan agar makanan masuk ke kerongkongan (esofagus) dan tidak tersedak.'
    }
  },
  {
    id: 3,
    topic: 'enzymes',
    difficulty: 'Grade 11 Standard',
    question: {
      en: 'Why is Pepsin synthesized and secreted as an inactive zymogen (Pepsinogen) by the chief cells of the stomach?',
      id: 'Mengapa enzim Pepsin disintesis dan disekresikan oleh sel utama lambung dalam bentuk zimogen inaktif (Pepsinogen)?'
    },
    options: {
      en: [
        'To prevent the active enzyme from autolyzing (digesting) the cellular proteins of the gastric gland cells themselves',
        'Because pepsin cannot fold correctly without oxygen',
        'To allow salivary amylase to digest carbohydrates inside the stomach',
        'Because pepsinogen is needed to neutralize stomach acid'
      ],
      id: [
        'Untuk mencegah enzim aktif mencerna protein sel penghasilnya sendiri (mencegah autolisis)',
        'Karena pepsin tidak dapat terlipat tanpa bantuan oksigen',
        'Agar ptialin dari mulut dapat terus bekerja di lambung',
        'Karena pepsinogen bertugas menetralkan keasaman asam lambung'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Secreting proteases as inactive zymogens protects the cells of the gastric glands from being destroyed by their own proteolytic enzymes. Pepsinogen is only activated into pepsin once it enters the acidic lumen (pH < 2.0).',
      id: 'Sekresi protease dalam bentuk inaktif (zimogen) melindungi sel lambung dari pencernaan protein internalnya sendiri. Begitu tiba di lumen ber-HCl asam, barulah pepsinogen aktif menjadi pepsin.'
    }
  },
  {
    id: 4,
    topic: 'anatomy',
    difficulty: 'Grade 11 Standard',
    question: {
      en: 'Does bile produced by the liver contain digestive enzymes? What is its actual biochemical mechanism?',
      id: 'Apakah cairan empedu yang diproduksi oleh hati mengandung enzim pencernaan? Apa mekanisme kerjanya yang sebenarnya?'
    },
    options: {
      en: [
        'Yes, it contains bile lipase that breaks triglycerides into glycerol',
        'No, it contains bile salts that mechanically emulsify large lipid droplets into micro-micelles to increase surface area',
        'Yes, it contains alkaline trypsin to break protein',
        'No, it only serves to kill intestinal parasites'
      ],
      id: [
        'Ya, mengandung enzim lipase empedu yang memecah lemak menjadi gliserol',
        'Tidak, empedu mengandung garam empedu yang mengemulsikan tetes lemak besar menjadi misel mikroskopis untuk memperluas area kerja lipase',
        'Ya, mengandung tripsin basa untuk mencerna protein',
        'Tidak, fungsinya hanya membunuh cacing parasit usus'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'Bile contains NO enzymes! It contains bile salts, phospholipids, and bilirubin. Bile salts are amphipathic detergents that mechanically emulsify fats into tiny micelles, dramatically increasing surface area for pancreatic lipase.',
      id: 'Empedu TIDAK mengandung enzim pencernaan! Peran utamanya adalah emulsifikasi mekanik: garam empedu memecah gumpalan lemak menjadi butiran halus sehingga enzim lipase pankreas dapat bekerja cepat.'
    }
  },
  {
    id: 5,
    topic: 'absorption',
    difficulty: 'Grade 11 Advanced',
    question: {
      en: 'After digestion in the small intestine, through which pathway are long-chain fatty acids and fat-soluble vitamins absorbed into the circulatory system?',
      id: 'Setelah dicerna di usus halus, melalui jalur manakah asam lemak rantai panjang dan vitamin larut lemak diserap ke dalam sistem sirkulasi tubuh?'
    },
    options: {
      en: [
        'Directly into blood capillaries -> Hepatic Portal Vein -> Liver',
        'Into central lacteals (lymphatic vessels) as chylomicrons -> Thoracic duct -> Subclavian vein',
        'Directly through renal arteries into kidneys for filtration',
        'Through the bile duct directly into the gallbladder for storage'
      ],
      id: [
        'Langsung ke kapiler darah -> Vena Porta Hepatika -> Hati',
        'Ke pembuluh kil / lakteal (sistem limfatik) dalam bentuk kilomikron -> Duktus torasikus -> Vena subklavia',
        'Langsung menembus arteri ginjal untuk filtrasi urin',
        'Masuk kembali ke saluran empedu menuju kantung empedu'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'Unlike amino acids and glucose which enter blood capillaries directly, long-chain fatty acids are reassembled into triglycerides, coated with proteins into chylomicrons, and absorbed into the lymphatic lacteals, eventually entering the blood circulation at the thoracic duct.',
      id: 'Berbeda dengan glukosa dan asam amino yang masuk ke kapiler darah, asam lemak disintesis ulang menjadi trigliserida, dikemas menjadi partikel kilomikron, lalu diserap ke pembuluh kil (lakteal getah bening) menuju peredaran darah besar.'
    }
  },
  {
    id: 6,
    topic: 'regulation',
    difficulty: 'Grade 11 Advanced',
    question: {
      en: 'When acidic chyme from the stomach enters the duodenum, which hormone is triggered to stimulate the pancreas to release sodium bicarbonate (NaHCO3)?',
      id: 'Ketika kimus yang sangat asam dari lambung memasuki duodenum, hormon apakah yang dipicu untuk merangsang pankreas melepaskan natrium bikarbonat (NaHCO3)?'
    },
    options: {
      en: [
        'Secretin',
        'Cholecystokinin (CCK)',
        'Insulin',
        'Gastrin'
      ],
      id: [
        'Sekretin',
        'Kolesistokinin (CCK)',
        'Insulin',
        'Gastrin'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Secretin is released by S cells in the duodenal mucosa in response to low pH (< 4.5). It stimulates pancreatic ductal cells to secrete abundant alkaline sodium bicarbonate, neutralizing stomach acid.',
      id: 'Hormon Sekretin dilepaskan oleh sel usus saat mendeteksi keasaman kimus lambung, merangsang pankreas menyemburkan larutan bikarbonat alkalis untuk menetralkan asam.'
    }
  },
  {
    id: 7,
    topic: 'anatomy',
    difficulty: 'Grade 11 Standard',
    question: {
      en: 'What are the three structural levels that increase the internal absorptive surface area of the small intestine to over 250 square meters?',
      id: 'Tiga tingkatan struktur anatomis apakah yang memperluas permukaan serap usus halus manusia hingga lebih dari 250 meter persegi?'
    },
    options: {
      en: [
        'Rugae folds, gastric pits, and chief cells',
        'Plicae circulares (circular folds), villi, and microvilli (brush border)',
        'Haustra, taeniae coli, and epiploic appendages',
        'Incisors, premolars, and molars'
      ],
      id: [
        'Lipatan rugae, foveola gastrika, dan sel utama',
        'Plika sirkularis (lipatan melingkar), vili (jonjot usus), dan mikrovili (tepi sikat)',
        'Haustra, taenia koli, dan apendiks epiploika',
        'Gigi seri, gigi taring, dan gigi geraham'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'The mucosal folds (plicae circulares) increase surface area ~3x; finger-like villi increase it another 10x; microscopic microvilli on enterocytes increase it another 20x, yielding a total surface area comparable to a singles tennis court (~250-300 m²).',
      id: 'Plika sirkularis melipatgandakan luas permukaan 3x, vili menjulur melipatgandakan 10x lagi, dan mikrovili mikroskopis melipatgandakan 20x lagi hingga mencapai luas sekitar lapangan tenis (~250 m²).'
    }
  },
  {
    id: 8,
    topic: 'pathology',
    difficulty: 'Grade 11 Advanced',
    question: {
      en: 'What occurs physiologically in the large intestine when peristaltic transit is abnormally rapid versus abnormally slow?',
      id: 'Apa yang terjadi secara fisiologis di usus besar ketika gerakan peristaltik ampas makanan berlangsung terlalu cepat vs terlalu lambat?'
    },
    options: {
      en: [
        'Too rapid causes Constipation; too slow causes Diarrhea',
        'Too rapid causes Diarrhea (insufficient water reabsorbed); too slow causes Constipation (excessive water reabsorbed, hard stool)',
        'Both conditions cause hypervitaminosis K',
        'Neither affects water balance'
      ],
      id: [
        'Terlalu cepat menyebabkan konstipasi; terlalu lambat menyebabkan diare',
        'Terlalu cepat memicu Diare (air kurang terserap); terlalu lambat memicu Konstipasi/Sembelit (air terserap berlebihan sehingga feses keras)',
        'Kedua kondisi memicu keracunan vitamin K',
        'Tidak ada dampak pada penyerapan cairan'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'The colon reabsorbs 1.5 - 2 Liters of water daily. If motility is too high, water cannot be reabsorbed, causing watery diarrhea. If motility is delayed, excessive water is drawn out, hardening stool and causing constipation.',
      id: 'Usus besar menyerap kembali 1.5-2 Liter air per hari. Jika gerak terlalu cepat, air tidak sempat diserap sehingga timbul diare encer. Jika terlalu lambat, terlalu banyak air yang diserap sehingga tinja kering dan membatu (konstipasi).'
    }
  }
];
