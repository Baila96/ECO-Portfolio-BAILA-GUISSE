// ─────────────────────────────────────────────────────────────
// Toutes les infos du portfolio sont centralisées ici.
// Modifie ce fichier pour changer les textes, sans toucher au design.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: "Baila Guisse",
  role: "Chargé d\u2019Affaires Photovoltaïque",
  tagline:
    "De l\u2019étude technique au suivi de chantier : je pilote des projets photovoltaïques dans leur intégralité.",
  location: "Avignon - mobilité France entière",
  phone: "+33 6 51 80 98 01",
  email: "guissebaila1996@gmail.com",
  permis: "Permis B - véhiculé",
};

export const kpis = [
  {
    label: "Puissance installée",
    value: 44.1,
    suffix: " kWc",
    decimals: 1,
    hint: "centrale Groupe Belmont, Agroparc",
  },
  {
    label: "Modules installés",
    value: 90,
    suffix: "",
    hint: "AIKO Neostar 3P+ 490 Wc",
  },
  {
    label: "Production annuelle",
    value: 55655,
    suffix: " kWh/an",
    hint: "moyenne 20 ans (Archélios Pro)",
  },
  {
    label: "TRI",
    value: 6,
    suffix: " ans",
    hint: "retour sur investissement estimé",
  },
];

export const profileText = `Étudiant en Master Smart Energy Logistics, je recherche une alternance à partir de septembre 2026 dans le domaine du photovoltaïque : étude, dimensionnement, relation client ou suivi de chantier. En tant que chargé d'affaires photovoltaïque chez Sud Concept, j'ai piloté des projets PV de bout en bout, de la prise de besoin client jusqu'au suivi d'installation, pour une clientèle B2B et B2C. Également ouvert à une opportunité en CDI.`;

export const education = [
  {
    degree: "Master MLAI — Smart Energy Logistics",
    school: "ESTIA, Redon",
    period: "2026 – 2027",
  },
  {
    degree: "Licence Pro Énergies Renouvelables",
    school: "Université de Limoges",
    period: "2025 – 2026",
  },
  {
    degree: "Licence 3 Mécanique Énergétique",
    school: "Univ. Paul Sabatier, Toulouse III",
    period: "2019 – 2021",
  },
  {
    degree: "L2 Électronique — EEA",
    school: "Université de Lorraine, Metz",
    period: "2018 – 2019",
  },
  {
    degree: "Prépa Grandes Écoles (MPI)",
    school: "Institut Mariste de Dakar",
    period: "2016 – 2018",
  },
];

export const toolGroups = [
  {
    title: "Étude & Dimensionnement PV",
    tools: [
      "Archélios Pro — simulation, plugin BIM Revit / SketchUp",
      "PVsyst — simulation de production détaillée",
      "PVGIS — vérification croisée de production",
      "Solteo — dimensionnement, proposition commerciale, visite technique & DP",
      "Calculateurs ESDEC / K2 Base / SunBallast",
      "Bilan des puissances & câblage AC/DC",
    ],
  },
  {
    title: "CAO & Modélisation",
    tools: [
      "AutoCAD — dossiers d\u2019exécution (EXE)",
      "Revit — modélisation BIM du bâtiment",
      "SketchUp, Matlab",
      "Plans de structure et fixation (toiture, sol)",
    ],
  },
  {
    title: "Relation Client & Gestion de Projet",
    tools: [
      "Élaboration de propositions commerciales",
      "Visites de site & relevés techniques",
      "Coordination des interventions terrain (B2B/B2C)",
      "Rédaction de rapports techniques (Word/Excel/PowerPoint)",
    ],
  },
];

export const skills = [
  "Relation client & prospection commerciale",
  "Dimensionnement électrique de centrales PV",
  "Études techniques complètes",
  "Conception de structures (toiture, sol, ombrières)",
  "Normes NF C 15-100 / UTE C 15-712-1",
  "Suivi et coordination de chantier",
  "Habilitable B1V, B2V, BR",
  "Autoconsommation collective",
];

export const languages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "B2" },
];

export const certifications = [
  "SSIAP 1 — Sécurité Incendie",
  "CQP — Certification de Qualification Professionnelle",
  "SST — Sauveteur Secouriste du Travail",
  "Habilitable électrique : B1V, B2V, BR",
];

export type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    title: "Chargé d'Affaires Photovoltaïque — Stage",
    company: "Sud Concept Énergie, Vedène (84)",
    period: "Mars 2026 – Août 2026",
    bullets: [
      "Suivi et analyse des performances de centrales PV via portails de supervision",
      "Détection d'anomalies, interprétation des alarmes et rédaction de comptes-rendus",
      "Études PV complètes (Archélios Pro, PVGIS, Solteo) pour des centrales jusqu\u2019à 484 kWc",
      "Dimensionnement électrique : câblage AC/DC, protection parafoudre, bilan des puissances (NF C 15-100 / UTE C 15-712-1)",
      "Suivi de chantier et coordination des interventions terrain (toiture, B2B/B2C)",
      "Modélisation BIM sous Revit, export vers Archélios Pro via plugin",
      "Participation active à la vente et à la relation client",
    ],
  },
  {
    title: "Projet Professionnel — Centrale PV 37 kWc (Carrefour Market)",
    company: "Université de Limoges",
    period: "Oct. 2025 – Déc. 2025",
    bullets: [
      "Modélisation complète du bâtiment (2 205 m²) sous Revit",
      "Conception d\u2019une centrale de 168 panneaux Trina Solar — production calculée : 45 500 kWh/an",
      "Export BIM vers Archélios Pro, choix onduleur SMA 33 kW, étude économique validée",
      "Calcul du Performance Ratio (PR) par modèle de pertes multiplicatif",
    ],
  },
  {
    title:
      "Projet Professionnel — Concentrateurs Solaires & Conversion Thermomécanique",
    company: "Université de Limoges",
    period: "Oct. 2025 – En cours",
    bullets: [
      "Analyse des performances de différentes technologies de concentration solaire",
      "Modélisation de la chaîne de conversion thermodynamique (fluides caloporteurs, rendement global)",
      "Comparaison technico-économique pour identifier les solutions optimales",
    ],
  },
  {
    title: "Stage de Recherche — Production de Vapeur par Héliostat",
    company: "Université Paul Sabatier, Toulouse",
    period: "Mars 2021 – Juil. 2021",
    bullets: [
      "Bilan thermique et modèle analytique d'un système solaire à concentration (CSP)",
      "Développement d'une solution numérique et interprétation des résultats",
      "Application à la production de vapeur pour turbine",
    ],
  },
];

export type ProjectImage = {
  src?: string;
  caption: string;
  mediaType?: "image" | "video";
};

export type ProjectGallerySections = {
  before: ProjectImage[];
  after: ProjectImage[];
  installation?: ProjectImage[];
};

export type ProjectChallenge = {
  problem: string;
  solution: string;
};

export type ProjectStat = {
  icon: "energy" | "performance" | "finance" | "environment";
  value: string;
  label: string;
};

export type GalleryItem = {
  slug: string;
  title: string;
  meta: string;
  category: "Installation" | "SAV" | "Étude";
  description: string;
  image?: string;
  // Illustration générique affichée tant qu'aucune photo n'est fournie.
  // 'panels' (défaut) = rangée de panneaux PV, 'ev-charging' = véhicule en charge,
  // 'cleaning' = nettoyage de panneaux au balai.
  illustration?: "panels" | "ev-charging" | "cleaning";
  context: string;
  mission: string[];
  challenges?: ProjectChallenge[];
  specs: { label: string; value: string }[];
  results: string[];
  resultStats?: ProjectStat[];
  gallery: ProjectGallerySections;
  galleryTitle?: string;
};

// Remplace ces entrées par tes propres réalisations.
// Pour les photos : dépose tes images dans /src/assets/gallery/
// puis remplace `image` (miniature) et les `src` dans `gallery.before` ou `gallery.after`
// (photos de la page détaillée) par le chemin vers ton fichier.
// Ex : image: '/src/assets/gallery/belmont-toiture.jpg'
export const galleryItems: GalleryItem[] = [
  {
    slug: "belmont-agroparc-44kwc",
    title: "Centrale toiture 44,1 kWc — Groupe Belmont",
    meta: "Agroparc, Avignon",
    category: "Installation",
    description:
      "90 panneaux AIKO Neostar 3P+ 490 Wc, onduleur Huawei SUN2000-50KTL-M3, structure ESDEC FlatFix Fusion Est-Ouest.",
    context:
      "Le Groupe Belmont, organisme de formation accueillant près de 1000 apprenants, souhaitait équiper son campus d'Avignon (technopole d'Agroparc) d'une centrale solaire. Implantée sur le bâtiment à énergie positive « Hamadryade », cette installation répond à une double ambition : réduire les charges d'exploitation liées à une consommation annuelle de 78 644 kWh, et diminuer l'empreinte carbone de l'établissement. Le modèle économique choisi est l'autoconsommation avec revente du surplus.",
    mission: [
      "Analyse et pré-étude : profil de consommation du client et contraintes de la toiture-terrasse",
      "Ingénierie et calepinage : plans d'implantation 2D sous AutoCAD, modélisation des structures via le configurateur ESDEC",
      "Dimensionnement électrique : sections de câbles DC/AC et protections sous LISE PV et Caneco, conformité UTE C 15-712-1 / NF C 15-100",
      "Étude de productible et financière : simulation sous Archélios Pro et Solteo, calcul LCOE, VAN et TRI",
    ],
    challenges: [
      {
        problem:
          "Toiture-terrasse avec membrane bitumineuse interdisant toute perforation, limite de charge résiduelle de 90 kg/m²",
        solution:
          "Système d'intégration autoportant et lesté FlatFix Fusion (ESDEC), charge ramenée à 55,87 kg/m²",
      },
      {
        problem:
          "Optimiser le rendement face aux fortes chaleurs du Vaucluse tout en maximisant le nombre de panneaux sur un espace contraint",
        solution:
          "Configuration double orientation Est-Ouest (Nord-Ouest/Sud-Est), inclinaison 11,3°, 90 modules AIKO Neostar 3P+ 490 Wc (All Back Contact, coefficient de température -0,26 %/°C)",
      },
      {
        problem:
          "Gérer la conversion de plusieurs chaînes de modules aux orientations différentes",
        solution:
          "Onduleur triphasé Huawei SUN2000-50KTL-M3, architecture centralisée à 4 trackers MPPT indépendants",
      },
    ],
    specs: [
      { label: "Puissance installée", value: "44,1 kWc" },
      { label: "Panneaux", value: "90 × AIKO Neostar 3P+ 490 Wc" },
      { label: "Onduleur", value: "Huawei SUN2000-50KTL-M3" },
      { label: "Structure", value: "ESDEC FlatFix Fusion, NO/SE ±45°" },
      { label: "Inclinaison", value: "11,3°" },
      { label: "Production moyenne (20 ans)", value: "55 655 kWh/an" },
      { label: "Performance Ratio", value: "81,66 %" },
      { label: "TRI", value: "< 6 ans" },
      { label: "Référentiel tarifaire", value: "T4 2025" },
    ],
    results: [
      "Étude validée et transmise au client avec bilan économique et environnemental",
      "Dossier technique conforme NF C 15-100 / UTE C 15-712-1",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "55 655 kWh/an",
        label: "Production moyenne sur 20 ans — pic en juillet à 7 952 kWh",
      },
      {
        icon: "performance",
        value: "38,5 % / 54,3 %",
        label: "Taux d'autoproduction / taux d'autoconsommation directe",
      },
      {
        icon: "finance",
        value: "< 6 ans",
        label: "Temps de retour sur investissement",
      },
      {
        icon: "environment",
        value: "1,1 t CO₂/an",
        label: "Soit 22 tonnes évitées sur 20 ans",
      },
    ],
    gallery: {
      before: [
        {
          src: "/src/assets/gallery/vt-1.jpg",
          caption: "Vue de face du bâtiment Hamadryade",
        },
        {
          src: "/src/assets/gallery/vt-2.jpg",
          caption: "Toiture et obstacles présents",
        },
        {
          src: "/src/assets/gallery/vt-3.jpg",
          caption: "Toiture et obstacles présents",
        },
      ],
      after: [
        { src: "/src/assets/gallery/belmont1.jpg", caption: "Après installation — Belmont 1" },
        { src: "/src/assets/gallery/belmont2.jpg", caption: "Après installation — Belmont 2" },
        { src: "/src/assets/gallery/belmont3.jpg", caption: "Après installation — Belmont 3" },
        { src: "/src/assets/gallery/belmont4.jpg", caption: "Après installation — Belmont 4" },
        { src: "/src/assets/gallery/belmont5.jpg", caption: "Après installation — Belmont 5" },
        { src: "/src/assets/gallery/VideoBelmont.mp4", caption: "VideoBelmont", mediaType: "video" },
      ],
    },
  },
  {
    slug: "centrale-residentielle-6kwc-batterie-virtuelle",
    title: "Centrale résidentielle 6 kWc — Batterie virtuelle",
    meta: "Le Thor (84) — autoconsommation Urban Solar",
    category: "Installation",
    description:
      "12 panneaux JinkoSolar Tiger Neo N-Type 500 Wc, micro-onduleurs ATMOCE MI-1000 et batterie virtuelle Urban Solar Energy.",
    context:
      "Ce projet a été conçu pour un particulier résidant au Thor (84250), avec une consommation électrique annuelle de 8 032 kWh en option Heures Pleines / Heures Creuses et un compteur 9 kVA. L'objectif était de réduire fortement l'impact de la hausse du coût de l'énergie en dimensionnant une centrale solaire résidentielle performante, capable d'effacer au maximum la facture grâce à l'autoconsommation directe et à la valorisation du surplus via une batterie virtuelle Urban Solar Energy.",
    mission: [
      "Analyse du profil de consommation du foyer et vérification de la compatibilité avec une centrale photovoltaïque résidentielle",
      "Étude de faisabilité et calepinage optimal sur un pan de toiture orienté plein Sud, incliné à 18°",
      "Sélection d’équipements premium : modules bifaciaux JinkoSolar Tiger Neo N-Type TOPCon et micro-onduleurs ATMOCE",
      "Simulation détaillée des flux énergétiques : autoconsommation directe, surplus injecté et restitution via batterie virtuelle",
      "Simulation détaillée du fonctionnement de la solution Urban Solar Energy et de l’autonomie apportée au foyer",
    ],
    challenges: [
      {
        problem:
          "Décalage naturel entre la production solaire, maximale entre 10h et 16h, et les habitudes de consommation du foyer, générant un surplus annuel estimé à 5 721 kWh",
        solution:
          "Intégration de la batterie virtuelle Urban Solar Energy : le surplus est injecté sur le réseau, stocké virtuellement, puis restitué sous forme de crédits déduits des consommations ultérieures",
      },
      {
        problem:
          "Maximiser le rendement et la fiabilité d’une centrale résidentielle de 6 kWc sur une toiture existante",
        solution:
          "Mise en œuvre de 12 modules JinkoSolar Tiger Neo 500 Wc en technologie N-Type TOPCon, associés à 6 micro-onduleurs ATMOCE MI-1000 pour un suivi MPPT optimisé et une sécurité accrue",
      },
      {
        problem:
          "Donner au client une vision claire des flux électriques et du comportement réel de son installation",
        solution:
          "Ajout d’un gestionnaire d’énergie Shelly Pro EM-50 pour suivre les consommations, la production et les échanges au tableau électrique",
      },
    ],
    specs: [
      { label: "Puissance installée", value: "6 kWc" },
      { label: "Production annuelle estimée", value: "9 102 kWh/an" },
      { label: "Consommation du foyer", value: "8 032 kWh/an" },
      { label: "Panneaux", value: "12 × JinkoSolar Tiger Neo N-Type 500 Wc" },
      { label: "Onduleurs", value: "6 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Gestion énergie", value: "Shelly Pro EM-50" },
      { label: "Orientation / inclinaison", value: "Sud / 18°" },
      {
        label: "Raccordement",
        value: "Autoconsommation + batterie virtuelle Urban Solar",
      },
      { label: "Taux d\u2019autoproduction", value: "100 %" },
    ],
    results: [
      "Production annuelle estimée à 9 102 kWh",
      "Autonomie énergétique portée à 100 % grâce à l’autoconsommation directe et à la batterie virtuelle",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "9 102 kWh/an",
        label: "Production annuelle estimée pour la centrale résidentielle",
      },
      {
        icon: "performance",
        value: "42 % / 58 %",
        label: "Autoconsommation directe / restitution via batterie virtuelle",
      },
      {
        icon: "environment",
        value: "100 %",
        label:
          "Production solaire valorisée grâce au stockage virtuel Urban Solar",
      },
    ],
    gallery: {
      before: [
        {
          src: "/src/assets/gallery/vt-A1.jpg",
          caption: "Vue de loin de la maison",
        },
        {
          src: "/src/assets/gallery/vt-A2.jpg",
          caption: "Toiture de la maison (tuile)",
        },
        {
          src: "/src/assets/gallery/vt-A3.jpg",
          caption: "Vue de dessous de la toiture",
        },
      ],
      after: [
        {
          src: "/src/assets/gallery/denis1.jpg",
          caption: "Installation en cours",
        },
        {
          src: "/src/assets/gallery/denis2.jpg",
          caption: "Installation en cours",
        },
        {
          src: "/src/assets/gallery/denis3.jpg",
          caption: "Centrale installée",
        },
        {
          src: "/src/assets/gallery/denis4.jpg",
          caption: "Centrale installée",
        },
      ],
    },
  },

  {
    slug: "centrale-residentielle-triphasee-784kwc-velleron",
    title: "Centrale résidentielle triphasée 7,84 kWc — Batterie virtuelle",
    meta: "Velleron (84) — autoconsommation Urban Solar",
    category: "Installation",
    description:
      "16 panneaux AIKO Neostar 3P+54 bifaciaux bi-verre 490 Wc, micro-onduleurs ATMOCE MI-1000 et batterie virtuelle Urban Solar Energy.",
    context:
      "Ce projet a été conçu pour un foyer particulièrement énergivore situé à Velleron (84740). Avec une consommation annuelle de 8 544 kWh et une installation électrique triphasée exigeante (compteur 18 kVA, tarification Heures Pleines / Heures Creuses), le client recherchait une solution radicale pour s'affranchir de la hausse des prix de l'énergie. L'enjeu était d'optimiser un pan de toiture orienté à l'Ouest, incliné à 18°, en combinant une forte puissance d'autoconsommation avec une solution de batterie virtuelle.",
    mission: [
      "Analyse approfondie du profil de consommation du client, avec 41 % des besoins situés en journée, et conception de l’implantation sur la toiture orientée Ouest",
      "Dimensionnement d’une architecture triphasée robuste de 7,84 kWc intégrant des panneaux premium AIKO et des micro-onduleurs ATMOCE",
      "Simulation énergétique et financière pour démontrer la viabilité du couplage avec le stockage virtuel Urban Solar Energy",
      "Optimisation de la valorisation du surplus afin d’absorber l’important excédent de production annuel",
    ],
    challenges: [
      {
        problem:
          "Toiture orientée à l’Ouest avec un pic de production décalé vers l’après-midi, nécessitant une captation maximale de la lumière",
        solution:
          "Sélection de 16 panneaux AIKO Neostar 3P+54 bifaciaux bi-verre de 490 Wc, avec technologie ABC, haut rendement et très bon comportement thermique",
      },
      {
        problem:
          "Répartir équitablement une forte puissance solaire sur une installation électrique triphasée 18 kVA",
        solution:
          "Déploiement de 8 micro-onduleurs ATMOCE MI-1000, avec un ratio d’un micro-onduleur pour deux panneaux, raccordés à un coffret M-Combiner MC100-T triphasé",
      },
      {
        problem:
          "Gérer un surplus annuel important estimé à près de 7 890 kWh sans perdre l’énergie produite",
        solution:
          "Souscription au service de batterie virtuelle Urban Solar Energy : le surplus est injecté, stocké virtuellement sans limite, puis déduit des factures lors des consommations nocturnes ou hivernales",
      },
    ],
    specs: [
      { label: "Puissance installée", value: "7,84 kWc" },
      { label: "Production annuelle estimée", value: "11 161 kWh/an" },
      { label: "Consommation du foyer", value: "8 544 kWh/an" },
      {
        label: "Panneaux",
        value: "16 × AIKO Neostar 3P+54 bifacial bi-verre 490 Wc",
      },
      { label: "Onduleurs", value: "8 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Coffret de protection", value: "M-Combiner MC100-T triphasé" },
      { label: "Compteur", value: "18 kVA triphasé — HP/HC" },
      { label: "Orientation / inclinaison", value: "Ouest / 18°" },
      {
        label: "Raccordement",
        value: "Autoconsommation + batterie virtuelle Urban Solar",
      },
      { label: "Surplus annuel estimé", value: "7 890 kWh/an" },
      { label: "Taux d’autoproduction", value: "100 %" },
      { label: "TVA", value: "5,5 %" },
    ],
    results: [
      "Production annuelle estimée à 11 161 kWh malgré l’orientation Ouest",
      "Autonomie globale portée à 100 % grâce à l’autoconsommation directe et à la restitution via batterie virtuelle",
      "Dossier structuré pour une facturation avec TVA réduite à 5,5 %",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "11 161 kWh/an",
        label: "Production annuelle estimée malgré une toiture orientée Ouest",
      },
      {
        icon: "performance",
        value: "38 % / 62 %",
        label: "Autoconsommation directe / restitution via batterie virtuelle",
      },
      {
        icon: "environment",
        value: "100 %",
        label:
          "Autonomie globale vis-à-vis de la fourniture classique d’électricité",
      },
    ],
    gallery: {
      before: [
        {
          src: "/src/assets/gallery/AV2_Cyril.jpg",
          caption: "Avant installation",
        },
        {
          src: "/src/assets/gallery/AV2_Cyril.jpg",
          caption: "Avant installation",
        },
        {
          src: "/src/assets/gallery/AV1_Cyril.jpg",
          caption: "Avant installation",
        },
      ],
      after: [
        {
          src: "/src/assets/gallery/AP1_Cyril.jpg",
          caption: "Après installation",
        },
        {
          src: "/src/assets/gallery/AP2_Cyril.jpg",
          caption: "Après installation",
        },
        {
          src: "/src/assets/gallery/AP3_Cyril.jpg",
          caption: "Après installation",
        },
        {
          src: "/src/assets/gallery/AP4_Cyril.jpg",
          caption: "Après installation",
        },
      ],
    },
  },

  {
    slug: "integration-stockage-enphase-iq-battery-5p",
    title: "Intégration d'un Système de Stockage Intelligent Enphase (IQ Battery 5P)",
    meta: "Installation batterie — passerelle de communication Enphase",
    category: "Installation",
    description:
      "Installation d’une batterie Enphase IQ Battery 5P, d’une passerelle Envoy-S Metered et d’une communication filaire dédiée pour optimiser l’autoconsommation.",
    context:
      "Dans un contexte de forte augmentation des coûts de l'électricité et de recherche d'indépendance énergétique, ce projet résidentiel visait à franchir un cap supplémentaire dans l'optimisation de l'autoconsommation. L'objectif n'était plus seulement de produire et consommer son énergie en journée, mais de la stocker physiquement pour l'utiliser le soir, la nuit ou lors des pics de consommation. Le client souhaitait une solution premium, évolutive et hautement sécurisée.",
    mission: [
      "Analyse de faisabilité et dimensionnement : étude de la compatibilité du réseau électrique domestique pour l’accueil d’un système de stockage à couplage AC",
      "Ingénierie technique de l’écosystème : sélection et intégration de la nouvelle génération de batteries Enphase avec architecture de communication filaire spécifique",
      "Configuration de la gestion d’énergie : paramétrage de la passerelle de communication pour piloter intelligemment les flux de charge et de décharge",
      "Mise en service et vérification de la supervision via l’environnement connecté Enphase Enlighten",
    ],
    challenges: [
      {
        problem:
          "Garantir une réponse instantanée aux appels de charge du logement afin d’éviter les soutirages réseau lors des pics de consommation",
        solution:
          "Intégration de la batterie Enphase IQ Battery 5P : système tout-en-un à couplage AC de 5,0 kWh utilisables, avec puissance nominale continue de 3,84 kVA grâce à 6 micro-onduleurs IQ8D-BAT intégrés",
      },
      {
        problem:
          "Piloter la batterie avec un cerveau capable d’analyser en temps réel la production solaire, la consommation et les flux réseau",
        solution:
          "Déploiement de la passerelle Envoy-S Metered (ENV-S-WB-230-F) avec transformateurs de courant, transmission des données vers Enlighten et visibilité complète pour le client",
      },
      {
        problem:
          "Assurer une installation sûre, fiable et réactive dans la durée",
        solution:
          "Choix de la chimie LFP (Lithium Fer Phosphate), refroidissement passif sans pièces mobiles et communication filaire via Communications Kit 2 INT pour une connexion rapide et stable",
      },
    ],
    specs: [
      { label: "Batterie", value: "Enphase IQ Battery 5P" },
      { label: "Capacité utilisable", value: "5,0 kWh" },
      { label: "Puissance continue", value: "3,84 kVA" },
      { label: "Micro-onduleurs intégrés", value: "6 × IQ8D-BAT" },
      { label: "Architecture", value: "Stockage physique à couplage AC" },
      { label: "Passerelle", value: "Envoy-S Metered ENV-S-WB-230-F" },
      { label: "Communication", value: "Communications Kit 2 INT — filaire" },
      { label: "Chimie batterie", value: "LFP — Lithium Fer Phosphate" },
      { label: "Supervision", value: "Enphase Enlighten" },
    ],
    results: [
      "Surplus solaire diurne stocké physiquement pour couvrir les besoins du soir et de la nuit",
      "Puissance de décharge continue de 3,84 kVA pour accompagner les appels de charge du foyer",
      "Supervision connectée via Enlighten avec suivi de l’état de charge, de la production solaire et de la consommation",
      "Architecture modulaire permettant l’ajout futur d’unités IQ Battery 5P selon l’évolution des besoins",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "5,0 kWh",
        label: "Stockage physique disponible pour valoriser le surplus solaire",
      },
      {
        icon: "performance",
        value: "3,84 kVA",
        label: "Puissance de décharge continue pour absorber les pics de consommation",
      },
      {
        icon: "environment",
        value: "LFP",
        label: "Chimie Lithium Fer Phosphate avec stabilité thermique renforcée",
      },
      {
        icon: "finance",
        value: "Évolutif",
        label: "Architecture modulaire à couplage AC prête pour de futures extensions",
      },
    ],
    gallery: {
      before: [],
      after: [],
      installation: [
        { src: "/src/assets/gallery/Bat1.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat2.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat3.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat4.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat5.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat6.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat7.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat8.jpg", caption: "Installation batterie et passerelle" },
        { src: "/src/assets/gallery/Bat9.jpg", caption: "Installation batterie et passerelle" },
      ],
    },
  },
  {
    slug: "etude-residentielle-3kwc-le-pontet",
    title: "Étude résidentielle 3 kWc — Batterie virtuelle",
    meta: "Le Pontet (84) — autoconsommation Urban Solar",
    category: "Installation",
    description:
      "6 panneaux DMEGC Solar bifaciaux 500 Wc, micro-onduleurs ATMOCE MI-1000 et batterie virtuelle Urban Solar Energy.",
    context:
      "Cette étude a été réalisée pour un particulier résidant au Pontet (84130), avec une consommation électrique annuelle de 5 373 kWh sur un compteur monophasé 6 kVA en option Base. L'objectif était de concevoir une installation solaire sur-mesure maximisant l'indépendance énergétique du client, en exploitant un pan de toiture orienté Sud-Est incliné à 18°, avec une solution d'autoconsommation couplée à une batterie virtuelle.",
    mission: [
      "Analyse du profil de consommation du foyer (73 % de la consommation déjà réalisée en journée) pour dimensionner précisément l\u2019installation",
      "Ingénierie et sélection du matériel : architecture à micro-onduleurs, panneaux bifaciaux à haut rendement, fixation ESDEC",
      "Modélisation énergétique de la centrale pour évaluer l\u2019autoconsommation directe et le volume de surplus à stocker virtuellement",
    ],
    challenges: [
      {
        problem:
          "Délivrer une puissance de 3 kWc avec un encombrement minimal sur la toiture disponible",
        solution:
          "Installation de 6 modules DMEGC Solar de 500 Wc (technologie Type N, bifacial bi-verre), reconnus pour leurs performances en faible luminosité",
      },
      {
        problem:
          "Gérer individuellement l\u2019ombrage et la conversion pour sécuriser la production",
        solution:
          "Utilisation de 3 micro-onduleurs ATMOCE MI-1000 (1 micro-onduleur pour 2 panneaux), garantissant un suivi MPPT optimal et une tension continue abaissée sous 60 V",
      },
      {
        problem:
          "Valoriser intégralement un excédent de production estimé à environ 1 200 kWh/an",
        solution:
          "Mise en place de la batterie virtuelle Urban Solar Energy, stockant 100 % du surplus et le restituant en crédits d\u2019énergie lors des pics de consommation (soir, hiver)",
      },
    ],
    specs: [
      { label: "Puissance étudiée", value: "3 kWc" },
      { label: "Production annuelle estimée", value: "4 374 kWh/an" },
      { label: "Consommation du foyer", value: "5 373 kWh/an" },
      { label: "Panneaux", value: "6 × DMEGC Solar Type N bifacial 500 Wc" },
      { label: "Onduleurs", value: "3 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Gestion énergie", value: "Shelly Pro EM-50" },
      { label: "Orientation / inclinaison", value: "Sud-Est / 18°" },
      {
        label: "Raccordement",
        value: "Autoconsommation + batterie virtuelle Urban Solar",
      },
      { label: "Taux d\u2019autoproduction", value: "81 %" },
    ],
    results: [
      "Production annuelle estimée à 4 374 kWh",
      "Autonomie globale de 81 % (59 % d\u2019autoconsommation directe + 22 % restitués via la batterie virtuelle)",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "4 374 kWh/an",
        label: "Production annuelle estimée pour la centrale résidentielle",
      },
      {
        icon: "performance",
        value: "59 % / 22 %",
        label: "Autoconsommation directe / restitution via batterie virtuelle",
      },
      {
        icon: "finance",
        value: "10,7 ans",
        label: "Temps de retour sur investissement avec TVA réduite à 5,5 %",
      },
      {
        icon: "environment",
        value: "100 %",
        label: "Surplus solaire valorisé, aucune perte de production",
      },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/AV1.jpg", caption: "Avant installation" },
        { src: "/src/assets/gallery/AV2.jpg", caption: "Avant installation" },
        { src: "/src/assets/gallery/AV3.jpg", caption: "Avant installation" },
      ],
      after: [
        { src: "/src/assets/gallery/D1.jpg", caption: "Après installation" },
        { src: "/src/assets/gallery/D2.jpg", caption: "Après installation" },
        { src: "/src/assets/gallery/D3.jpg", caption: "Après installation" },
        { src: "/src/assets/gallery/D4.jpg", caption: "Après installation" },
        { src: "/src/assets/gallery/D5.jpg", caption: "Après installation" },
        { src: "/src/assets/gallery/D6.jpg", caption: "Après installation" },
      ],
    },
  },
  {
    slug: "maintenance-nettoyage-16-panneaux-vedene",
    title: "Maintenance photovoltaïque — Nettoyage de 16 panneaux",
    meta: "Vedène (84) — restauration du rendement",
    category: "SAV",
    illustration: "cleaning",
    description:
      "Nettoyage préventif d'une centrale de 16 panneaux photovoltaïques pour éliminer l'encrassement, prévenir les hotspots et restaurer les performances.",
    context:
      "La performance d'une installation solaire dépend directement de son environnement et de son entretien. Cette intervention de maintenance préventive concernait une installation de 16 panneaux photovoltaïques située à Vedène. Au fil des mois, l'accumulation de poussières, de pollens et de pollutions diverses crée un voile opaque sur le verre des modules. Ce phénomène d'encrassement, aussi appelé soiling, fait barrière au rayonnement solaire et entraîne une chute progressive de la production électrique. L'objectif exclusif de cette intervention était d'éliminer ce facteur de perte pour restaurer le rendement maximal de la centrale.",
    mission: [
      "Audit et diagnostic visuel du niveau d'encrassement des 16 modules sur site et analyse de l'impact potentiel sur la courbe de production",
      "Sécurisation du chantier : mise en œuvre stricte du protocole de sécurité pour l'intervention en toiture, sécurisation de la zone et port des EPI",
      "Action de maintenance : nettoyage des panneaux selon les méthodes préconisées par les fabricants de matériel photovoltaïque",
    ],
    challenges: [
      {
        problem:
          "Préserver le traitement antireflet des modules, sensible aux agents abrasifs, aux détergents agressifs et aux dépôts de calcaire",
        solution:
          "Nettoyage exclusivement à l'eau pure, osmosée ou déminéralisée, à faible pression avec une brosse télescopique à poils très souples, sans produit chimique et sans traces au séchage",
      },
      {
        problem:
          "Éviter les points chauds causés par les fientes d'oiseaux ou amas de salissures localisés pouvant masquer une cellule et provoquer une surchauffe",
        solution:
          "Inspection détaillée de chaque module pendant l'opération afin d'éliminer les éléments incrustés et de protéger l'intégrité électrique de la chaîne photovoltaïque",
      },
    ],
    specs: [
      { label: "Type d'intervention", value: "Maintenance préventive — nettoyage PV" },
      { label: "Localisation", value: "Vedène (84)" },
      { label: "Nombre de panneaux", value: "16 modules photovoltaïques" },
      { label: "Méthode", value: "Eau pure + brosse télescopique souple" },
      { label: "Objectif", value: "Restauration du rendement maximal" },
      { label: "Risque traité", value: "Soiling, dépôts, hotspots" },
    ],
    results: [
      "Rendement restauré grâce à l'élimination de la barrière de poussière et à la récupération des pertes de production liées à l'encrassement",
      "Durabilité renforcée par l'élimination des agents potentiellement corrosifs et la prévention des points chauds",
      "Gain financier pour le client grâce à une centrale plus propre, plus productive et mieux valorisée en autoconsommation ou en revente",
    ],
    resultStats: [
      {
        icon: "performance",
        value: "16",
        label: "Panneaux nettoyés et inspectés module par module",
      },
      {
        icon: "energy",
        value: "5 à 15 %",
        label: "Pertes récupérables selon le degré d'encrassement constaté",
      },
      {
        icon: "environment",
        value: "Eau pure",
        label: "Nettoyage sans détergent agressif et sans dépôt calcaire",
      },
      {
        icon: "finance",
        value: "Optimisé",
        label: "Production et valorisation énergétique améliorées après intervention",
      },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/AvNet1.jpg", caption: "Avant nettoyage" },
        { src: "/src/assets/gallery/AvNet2.jpg", caption: "Avant nettoyage" },
        { src: "/src/assets/gallery/AvNet3.jpg", caption: "Avant nettoyage" },
      ],
      after: [
        { src: "/src/assets/gallery/ApNet1.jpg", caption: "Après nettoyage" },
        { src: "/src/assets/gallery/ApNet2.jpg", caption: "Après nettoyage" },
        { src: "/src/assets/gallery/ApNet3.jpg", caption: "Après nettoyage" },
        { src: "/src/assets/gallery/ApNet4.jpg", caption: "Après nettoyage" },
        { src: "/src/assets/gallery/ApNet5.MOV", caption: "Après nettoyage — vidéo", mediaType: "video" },
        { src: "/src/assets/gallery/ApNet6.MOV", caption: "Après nettoyage — vidéo", mediaType: "video" },
      ],
    },
  },

  {
    slug: "etude-integration-irve-bornes-recharge",
    title: "Étude et intégration IRVE — Bornes de recharge",
    meta: "Infrastructure de recharge — dimensionnement et gestion dynamique",
    category: "Étude",
    illustration: "ev-charging",
    description:
      "Étude complète et intégration technique de bornes de recharge pour véhicules électriques, avec protections électriques, gestion dynamique de charge et solutions Autel MaxiCharger.",
    context:
      "L'électrification du parc automobile exige une infrastructure fiable, sécurisée et parfaitement adaptée au site. Dans le cadre de mes projets, je réalise des études complètes et des propositions techniques sur mesure pour l'intégration de bornes de recharge. Mon approche garantit une compatibilité électrique avec l'installation existante, en intégrant le dimensionnement de la borne, la puissance disponible et la sélection rigoureuse des organes de protection électriques nécessaires en amont.",
    mission: [
      "Analyse du besoin client et du contexte électrique du site pour définir la puissance de recharge adaptée",
      "Dimensionnement de l'infrastructure IRVE : choix de la borne, protections électriques, câblage et compatibilité avec le tableau existant",
      "Intégration de solutions de gestion dynamique de la charge afin d'éviter les surcharges du réseau électrique du bâtiment",
      "Sélection de fabricants reconnus et proposition de solutions adaptées aux contraintes techniques, économiques et d'usage du client",
    ],
    challenges: [
      {
        problem:
          "Éviter les surcharges électriques lorsque la borne fonctionne en même temps que les autres usages du bâtiment ou de l'habitation",
        solution:
          "Intégration d'une gestion dynamique de charge via tores ampèremétriques, Smart Sensor Box ou système équivalent, permettant à la borne d'ajuster sa puissance en temps réel selon la consommation instantanée du site",
      },
      {
        problem:
          "Optimiser la recharge du véhicule électrique en présence d'une production photovoltaïque locale",
        solution:
          "Paramétrage d'une logique de pilotage favorisant la recharge à partir du surplus solaire disponible, afin d'améliorer l'autoconsommation et de limiter les soutirages réseau",
      },
      {
        problem:
          "S'adapter à des architectures électriques variées, en monophasé ou triphasé, tout en garantissant robustesse et connectivité",
        solution:
          "Préconisation de bornes reconnues, notamment la gamme Autel MaxiCharger Elite 2, compatible monophasé jusqu'à 7,4 kW et triphasé en 11 kW ou 22 kW, avec connectivité Wi-Fi, Ethernet ou 4G",
      },
    ],
    specs: [
      { label: "Type de projet", value: "Étude et intégration IRVE" },
      { label: "Usage", value: "Recharge véhicule électrique résidentielle ou tertiaire" },
      { label: "Puissance monophasée", value: "Jusqu'à 7,4 kW" },
      { label: "Puissance triphasée", value: "11 kW ou 22 kW" },
      { label: "Gestion de charge", value: "DLB / ALM avec capteurs de mesure" },
      { label: "Pilotage solaire", value: "Recharge possible sur surplus photovoltaïque" },
      { label: "Fabricants", value: "Autel, Schneider Electric, Alfen, Enphase, SolarEdge" },
      { label: "Gamme privilégiée", value: "Autel MaxiCharger Elite 2" },
      { label: "Robustesse", value: "IP65 / IK10 selon modèles" },
    ],
    results: [
      "Infrastructure de recharge dimensionnée selon la puissance disponible et les contraintes électriques du site",
      "Protection du réseau du bâtiment grâce à l'ajustement automatique de la puissance de charge",
      "Possibilité de prioriser la recharge à partir du surplus photovoltaïque pour maximiser l'autoconsommation",
      "Solution évolutive et compatible avec plusieurs fabricants reconnus du marché IRVE",
    ],
    resultStats: [
      {
        icon: "energy",
        value: "7,4 à 22 kW",
        label: "Plage de puissance selon réseau monophasé ou triphasé",
      },
      {
        icon: "performance",
        value: "DLB / ALM",
        label: "Gestion dynamique de la charge pour éviter les surcharges",
      },
      {
        icon: "environment",
        value: "Surplus PV",
        label: "Recharge pilotable avec l'énergie solaire disponible",
      },
      {
        icon: "finance",
        value: "Multi-marques",
        label: "Solutions adaptées : Autel, Schneider, Alfen, Enphase, SolarEdge",
      },
    ],
    galleryTitle: "Borne",
    gallery: {
      before: [],
      after: [],
      installation: [
        { src: "/src/assets/gallery/IRVE1.jpg", caption: "Borne de recharge IRVE" },
        { src: "/src/assets/gallery/IRVE2.jpg", caption: "Borne de recharge IRVE" },
        { src: "/src/assets/gallery/IRVE3.jpg", caption: "Borne de recharge IRVE" },
      ],
    },
  },

];

export const contact = {
  intro:
    "Disponible pour une alternance à partir de septembre 2026 ou une opportunité en CDI.",
};

// ─────────────────────────────────────────────────────────────
// Compatibilité sélecteur FR/EN — données traduites
// ─────────────────────────────────────────────────────────────

export type Lang = 'fr' | 'en'

const kpisEn = [
  {
    label: "Installed capacity",
    value: 44.1,
    suffix: " kWp",
    decimals: 1,
    hint: "Groupe Belmont PV plant, Agroparc",
  },
  {
    label: "Modules installed",
    value: 90,
    suffix: "",
    hint: "AIKO Neostar 3P+ 490 Wp",
  },
  {
    label: "Annual production",
    value: 55655,
    suffix: " kWh/year",
    hint: "20-year average using Archélios Pro",
  },
  {
    label: "Payback",
    value: 6,
    suffix: " years",
    hint: "estimated return on investment",
  },
]

const identityEn = {
  role: "Photovoltaic Project Engineer",
  tagline: "From technical studies to site supervision: I manage photovoltaic projects from start to finish.",
  location: "Avignon - available across France",
  permis: "Driving licence - mobile",
}

const profileTextEn =
  "Master's student in Smart Energy Logistics, looking for a work-study opportunity from September 2026 in photovoltaics: technical studies, sizing, customer relations or site supervision. As a photovoltaic project engineer at Sud Concept, I managed PV projects from customer needs assessment through to installation follow-up, for both B2B and B2C clients. Also open to full-time opportunities."

const educationEn = [
  {
    degree: "Master MLAI — Smart Energy Logistics",
    school: "ESTIA, Redon",
    period: "2026 – 2027",
  },
  {
    degree: "Professional Bachelor — Renewable Energy",
    school: "University of Limoges",
    period: "2025 – 2026",
  },
  {
    degree: "Bachelor 3 — Energy Mechanics",
    school: "Paul Sabatier University, Toulouse III",
    period: "2019 – 2021",
  },
  {
    degree: "Bachelor 2 — Electronics / EEA",
    school: "University of Lorraine, Metz",
    period: "2018 – 2019",
  },
  {
    degree: "Engineering preparatory classes (MPI)",
    school: "Institut Mariste de Dakar",
    period: "2016 – 2018",
  },
]

const toolGroupsEn = [
  {
    title: "PV studies & sizing",
    tools: [
      "Archélios Pro — simulation, BIM plugin for Revit / SketchUp",
      "PVsyst — detailed production simulation",
      "PVGIS — production cross-checking",
      "Solteo — sizing, commercial proposal, site visit & permitting",
      "ESDEC / K2 Base / SunBallast calculators",
      "Power balance & AC/DC cabling",
    ],
  },
  {
    title: "CAD & modelling",
    tools: [
      "AutoCAD — execution drawings",
      "Revit — building BIM modelling",
      "SketchUp, Matlab",
      "Structure and mounting plans for roofs and ground-mounted systems",
    ],
  },
  {
    title: "Customer relations & project management",
    tools: [
      "Commercial proposal preparation",
      "Site visits & technical surveys",
      "Field intervention coordination for B2B/B2C projects",
      "Technical reports using Word, Excel and PowerPoint",
    ],
  },
]

const skillsEn = [
  "Customer relations & business development",
  "Electrical sizing of PV plants",
  "Complete technical studies",
  "Structural design for roofs, ground-mount systems and carports",
  "French electrical standards NF C 15-100 / UTE C 15-712-1",
  "Site supervision and coordination",
  "Eligible for B1V, B2V, BR electrical authorisations",
  "Collective self-consumption",
]

const languagesEn = [
  { name: "French", level: "Native" },
  { name: "English", level: "B2" },
]

const certificationsEn = [
  "SSIAP 1 — Fire safety",
  "CQP — Professional qualification certificate",
  "SST — Workplace first-aider",
  "Electrical authorisation eligible: B1V, B2V, BR",
]

const experiencesEn: Experience[] = [
  {
    title: "Photovoltaic Project Engineer — Internship",
    company: "Sud Concept Énergie, Vedène (84)",
    period: "Mar. 2026 – Aug. 2026",
    bullets: [
      "Monitoring and analysis of PV plant performance through supervision platforms",
      "Fault detection, alarm interpretation and technical reporting",
      "Complete PV studies using Archélios Pro, PVGIS and Solteo for plants up to 484 kWp",
      "Electrical sizing: AC/DC cabling, surge protection, power balance and compliance with French PV standards",
      "Site supervision and coordination of field interventions on rooftops for B2B/B2C projects",
      "BIM modelling in Revit and export to Archélios Pro via plugin",
      "Active contribution to sales and customer relations",
    ],
  },
  {
    title: "Professional Project — 37 kWp PV plant (Carrefour Market)",
    company: "University of Limoges",
    period: "Oct. 2025 – Dec. 2025",
    bullets: [
      "Complete modelling of a 2,205 m² building using Revit",
      "Design of a 168-module PV plant with calculated production of 45,500 kWh/year",
      "BIM export to Archélios Pro, SMA 33 kW inverter selection and validated economic study",
      "Performance Ratio calculation using a multiplicative loss model",
    ],
  },
  {
    title: "Professional Project — Solar Concentrators & Thermomechanical Conversion",
    company: "University of Limoges",
    period: "Oct. 2025 – ongoing",
    bullets: [
      "Performance analysis of different solar concentration technologies",
      "Modelling of the thermodynamic conversion chain, heat transfer fluids and global efficiency",
      "Techno-economic comparison to identify the most relevant solutions",
    ],
  },
  {
    title: "Research Internship — Steam Production with Heliostats",
    company: "Paul Sabatier University, Toulouse",
    period: "Mar. 2021 – Jul. 2021",
    bullets: [
      "Thermal balance and analytical model of a concentrated solar power system",
      "Development of a numerical solution and interpretation of results",
      "Application to steam production for turbine systems",
    ],
  },
]

const projectTranslations: Record<string, Partial<GalleryItem>> = {
  "belmont-agroparc-44kwc": {
    title: "44.1 kWp rooftop PV plant — Groupe Belmont",
    meta: "Agroparc, Avignon",
    description:
      "90 AIKO Neostar 3P+ 490 Wp modules, Huawei SUN2000-50KTL-M3 inverter and ESDEC FlatFix Fusion East-West mounting system.",
    context:
      "Groupe Belmont, a training organisation welcoming nearly 1,000 learners, wanted to equip its Avignon campus in the Agroparc technology park with a solar power plant. Installed on the positive-energy Hamadryade building, the system meets two goals: reducing operating costs linked to an annual consumption of 78,644 kWh and lowering the site's carbon footprint. The selected business model is self-consumption with surplus resale.",
    mission: [
      "Pre-study and analysis of the customer's consumption profile and flat-roof constraints",
      "Engineering and layout design: 2D layout plans in AutoCAD and structure modelling with the ESDEC configurator",
      "Electrical sizing: DC/AC cable sections and protections using LISE PV and Caneco, with compliance to UTE C 15-712-1 / NF C 15-100",
      "Yield and financial study: simulation using Archélios Pro and Solteo, LCOE, NPV and ROI calculations",
    ],
    challenges: [
      {
        problem:
          "Flat roof with bituminous membrane, with no roof penetration allowed, and a remaining load limit of 90 kg/m²",
        solution:
          "Self-supporting ballasted FlatFix Fusion system from ESDEC, reducing the load to 55.87 kg/m²",
      },
      {
        problem:
          "Optimising yield under the high summer temperatures of Vaucluse while maximising the number of modules on a constrained roof area",
        solution:
          "Dual East-West orientation, 11.3° tilt, and 90 AIKO Neostar 3P+ 490 Wp modules with All Back Contact technology and a -0.26%/°C temperature coefficient",
      },
      {
        problem:
          "Managing several module strings with different orientations",
        solution:
          "Huawei SUN2000-50KTL-M3 three-phase inverter with four independent MPPT trackers",
      },
    ],
    specs: [
      { label: "Installed capacity", value: "44.1 kWp" },
      { label: "Modules", value: "90 × AIKO Neostar 3P+ 490 Wp" },
      { label: "Inverter", value: "Huawei SUN2000-50KTL-M3" },
      { label: "Mounting system", value: "ESDEC FlatFix Fusion, NW/SE ±45°" },
      { label: "Tilt", value: "11.3°" },
      { label: "Average production over 20 years", value: "55,655 kWh/year" },
      { label: "Performance Ratio", value: "81.66%" },
      { label: "Payback", value: "< 6 years" },
      { label: "Tariff reference", value: "Q4 2025" },
    ],
    results: [
      "Study validated and delivered to the client with economic and environmental analysis",
      "Technical file compliant with NF C 15-100 / UTE C 15-712-1",
    ],
    resultStats: [
      { icon: "energy", value: "55,655 kWh/year", label: "20-year average production — July peak at 7,952 kWh" },
      { icon: "performance", value: "38.5% / 54.3%", label: "Self-sufficiency rate / direct self-consumption rate" },
      { icon: "finance", value: "< 6 years", label: "Return on investment" },
      { icon: "environment", value: "1.1 t CO₂/year", label: "22 tonnes avoided over 20 years" },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/vt-1.jpg", caption: "Front view of the Hamadryade building" },
        { src: "/src/assets/gallery/vt-2.jpg", caption: "Roof and existing obstacles" },
        { src: "/src/assets/gallery/vt-3.jpg", caption: "Roof and existing obstacles" },
      ],
      after: [
        { src: "/src/assets/gallery/belmont1.jpg", caption: "After installation — Belmont 1" },
        { src: "/src/assets/gallery/belmont2.jpg", caption: "After installation — Belmont 2" },
        { src: "/src/assets/gallery/belmont3.jpg", caption: "After installation — Belmont 3" },
        { src: "/src/assets/gallery/belmont4.jpg", caption: "After installation — Belmont 4" },
        { src: "/src/assets/gallery/belmont5.jpg", caption: "After installation — Belmont 5" },
        { src: "/src/assets/gallery/VideoBelmont.mp4", caption: "VideoBelmont", mediaType: "video" },
      ],
    },
  },

  "centrale-residentielle-6kwc-batterie-virtuelle": {
    title: "6 kWp residential PV plant — Virtual battery",
    meta: "Le Thor (84) — Urban Solar self-consumption",
    description:
      "12 JinkoSolar Tiger Neo N-Type 500 Wp modules, ATMOCE MI-1000 microinverters and Urban Solar Energy virtual battery.",
    context:
      "This project was designed for a homeowner in Le Thor (84250), with an annual electricity consumption of 8,032 kWh under a peak/off-peak tariff and a 9 kVA meter. The goal was to reduce exposure to rising electricity prices by designing a high-performance residential solar system able to offset the bill as much as possible through direct self-consumption and surplus optimisation via an Urban Solar Energy virtual battery.",
    mission: [
      "Analysis of the household consumption profile and verification of compatibility with a residential PV plant",
      "Feasibility study and optimal layout on a south-facing roof with an 18° pitch",
      "Selection of premium equipment: JinkoSolar Tiger Neo N-Type TOPCon bifacial modules and ATMOCE microinverters",
      "Detailed simulation of energy flows: direct self-consumption, injected surplus and virtual battery return",
      "Detailed simulation of the Urban Solar Energy solution and the autonomy provided to the household",
    ],
    challenges: [
      {
        problem:
          "Natural mismatch between solar production, which peaks between 10 a.m. and 4 p.m., and household consumption habits, creating an estimated annual surplus of 5,721 kWh",
        solution:
          "Integration of the Urban Solar Energy virtual battery: surplus is injected into the grid, virtually stored and later returned as energy credits deducted from future consumption",
      },
      {
        problem:
          "Maximising yield and reliability for a 6 kWp residential rooftop system",
        solution:
          "Use of 12 JinkoSolar Tiger Neo 500 Wp N-Type TOPCon modules combined with 6 ATMOCE MI-1000 microinverters for optimised MPPT tracking and increased safety",
      },
      {
        problem:
          "Giving the client a clear view of electrical flows and real operating behaviour",
        solution:
          "Addition of a Shelly Pro EM-50 energy meter to monitor consumption, production and grid exchanges at the electrical panel",
      },
    ],
    specs: [
      { label: "Installed capacity", value: "6 kWp" },
      { label: "Estimated annual production", value: "9,102 kWh/year" },
      { label: "Household consumption", value: "8,032 kWh/year" },
      { label: "Modules", value: "12 × JinkoSolar Tiger Neo N-Type 500 Wp" },
      { label: "Inverters", value: "6 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Energy management", value: "Shelly Pro EM-50" },
      { label: "Orientation / tilt", value: "South / 18°" },
      { label: "Grid connection", value: "Self-consumption + Urban Solar virtual battery" },
      { label: "Self-sufficiency rate", value: "100%" },
    ],
    results: [
      "Estimated annual production of 9,102 kWh",
      "Energy autonomy increased to 100% thanks to direct self-consumption and the virtual battery",
    ],
    resultStats: [
      { icon: "energy", value: "9,102 kWh/year", label: "Estimated annual production for the residential PV plant" },
      { icon: "performance", value: "42% / 58%", label: "Direct self-consumption / virtual battery return" },
      { icon: "environment", value: "100%", label: "Solar production valued through Urban Solar virtual storage" },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/vt-A1.jpg", caption: "Distant view of the house" },
        { src: "/src/assets/gallery/vt-A2.jpg", caption: "Tiled roof of the house" },
        { src: "/src/assets/gallery/vt-A3.jpg", caption: "Underside view of the roof" },
      ],
      after: [
        { src: "/src/assets/gallery/denis1.jpg", caption: "Installation in progress" },
        { src: "/src/assets/gallery/denis2.jpg", caption: "Installation in progress" },
        { src: "/src/assets/gallery/denis3.jpg", caption: "Installed PV plant" },
        { src: "/src/assets/gallery/denis4.jpg", caption: "Installed PV plant" },
      ],
    },
  },

  "centrale-residentielle-triphasee-784kwc-velleron": {
    title: "7.84 kWp three-phase residential PV plant — Virtual battery",
    meta: "Velleron (84) — Urban Solar self-consumption",
    description:
      "16 AIKO Neostar 3P+54 bifacial dual-glass 490 Wp modules, ATMOCE MI-1000 microinverters and Urban Solar Energy virtual battery.",
    context:
      "This project was designed for a high-consumption household in Velleron (84740). With annual electricity consumption of 8,544 kWh and a demanding three-phase electrical installation (18 kVA meter, peak/off-peak tariff), the customer was looking for a strong solution to reduce dependence on rising energy prices. The challenge was to optimise a west-facing roof with an 18° pitch by combining high self-consumption capacity with a virtual battery solution.",
    mission: [
      "Detailed analysis of the customer's consumption profile, with 41% of needs occurring during daytime, and design of the layout on the west-facing roof",
      "Sizing of a robust 7.84 kWp three-phase architecture using premium AIKO modules and ATMOCE microinverters",
      "Energy and financial simulation to demonstrate the relevance of coupling the system with Urban Solar Energy virtual storage",
      "Optimisation of surplus valuation to absorb the significant annual excess production",
    ],
    challenges: [
      {
        problem:
          "West-facing roof with production shifted toward the afternoon, requiring maximum light capture",
        solution:
          "Selection of 16 AIKO Neostar 3P+54 bifacial dual-glass 490 Wp modules with ABC technology, high efficiency and strong thermal behaviour",
      },
      {
        problem:
          "Distributing a high solar capacity evenly across an 18 kVA three-phase electrical installation",
        solution:
          "Deployment of 8 ATMOCE MI-1000 microinverters, with one microinverter for two modules, connected to a three-phase M-Combiner MC100-T protection box",
      },
      {
        problem:
          "Managing a significant annual surplus estimated at nearly 7,890 kWh without losing produced energy",
        solution:
          "Urban Solar Energy virtual battery subscription: surplus is injected, virtually stored without limit and deducted from bills during night-time or winter consumption",
      },
    ],
    specs: [
      { label: "Installed capacity", value: "7.84 kWp" },
      { label: "Estimated annual production", value: "11,161 kWh/year" },
      { label: "Household consumption", value: "8,544 kWh/year" },
      { label: "Modules", value: "16 × AIKO Neostar 3P+54 bifacial dual-glass 490 Wp" },
      { label: "Inverters", value: "8 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Protection box", value: "M-Combiner MC100-T three-phase" },
      { label: "Meter", value: "18 kVA three-phase — peak/off-peak tariff" },
      { label: "Orientation / tilt", value: "West / 18°" },
      { label: "Grid connection", value: "Self-consumption + Urban Solar virtual battery" },
      { label: "Estimated annual surplus", value: "7,890 kWh/year" },
      { label: "Self-sufficiency rate", value: "100%" },
      { label: "VAT", value: "5.5%" },
    ],
    results: [
      "Estimated annual production of 11,161 kWh despite the west-facing roof",
      "Overall autonomy increased to 100% through direct self-consumption and virtual battery return",
      "File structured for invoicing with reduced 5.5% VAT",
    ],
    resultStats: [
      { icon: "energy", value: "11,161 kWh/year", label: "Estimated annual production despite a west-facing roof" },
      { icon: "performance", value: "38% / 62%", label: "Direct self-consumption / virtual battery return" },
      { icon: "environment", value: "100%", label: "Overall autonomy from conventional electricity supply" },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/AV2_Cyril.jpg", caption: "Before installation" },
        { src: "/src/assets/gallery/AV2_Cyril.jpg", caption: "Before installation" },
        { src: "/src/assets/gallery/AV1_Cyril.jpg", caption: "Before installation" },
      ],
      after: [
        { src: "/src/assets/gallery/AP1_Cyril.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/AP2_Cyril.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/AP3_Cyril.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/AP4_Cyril.jpg", caption: "After installation" },
      ],
    },
  },

  "integration-stockage-enphase-iq-battery-5p": {
    title: "Integration of an Enphase IQ Battery 5P smart storage system",
    meta: "Battery installation — Enphase communication gateway",
    description:
      "Installation of an Enphase IQ Battery 5P, an Envoy-S Metered gateway and a dedicated wired communication system to optimise self-consumption.",
    context:
      "In a context of rising electricity costs and growing demand for energy independence, this residential project aimed to take self-consumption optimisation one step further. The goal was not only to produce and consume energy during the day, but also to physically store it for evening, night-time or peak consumption. The customer wanted a premium, scalable and highly secure solution.",
    mission: [
      "Feasibility analysis and sizing: study of the household electrical network compatibility with an AC-coupled storage system",
      "Technical engineering of the ecosystem: selection and integration of the latest Enphase battery generation with a specific wired communication architecture",
      "Energy management configuration: setup of the communication gateway to intelligently control charge and discharge flows",
      "Commissioning and verification of monitoring through the Enphase Enlighten connected environment",
    ],
    challenges: [
      {
        problem:
          "Ensuring immediate response to household load demand in order to avoid grid imports during consumption peaks",
        solution:
          "Integration of the Enphase IQ Battery 5P: all-in-one AC-coupled system with 5.0 kWh usable capacity and 3.84 kVA continuous output thanks to six integrated IQ8D-BAT microinverters",
      },
      {
        problem:
          "Controlling the battery with a system capable of analysing solar production, consumption and grid flows in real time",
        solution:
          "Deployment of the Envoy-S Metered gateway with current transformers, data transmission to Enlighten and full visibility for the customer",
      },
      {
        problem:
          "Ensuring a safe, reliable and responsive installation over time",
        solution:
          "Selection of LFP chemistry, passive cooling with no moving parts and wired communication through Communications Kit 2 INT for a fast and stable connection",
      },
    ],
    specs: [
      { label: "Battery", value: "Enphase IQ Battery 5P" },
      { label: "Usable capacity", value: "5.0 kWh" },
      { label: "Continuous output", value: "3.84 kVA" },
      { label: "Integrated microinverters", value: "6 × IQ8D-BAT" },
      { label: "Architecture", value: "AC-coupled physical storage" },
      { label: "Gateway", value: "Envoy-S Metered ENV-S-WB-230-F" },
      { label: "Communication", value: "Communications Kit 2 INT — wired" },
      { label: "Battery chemistry", value: "LFP — Lithium Iron Phosphate" },
      { label: "Monitoring", value: "Enphase Enlighten" },
    ],
    results: [
      "Daytime solar surplus physically stored to cover evening and night-time needs",
      "3.84 kVA continuous discharge power to support household load peaks",
      "Connected monitoring via Enlighten with state of charge, solar production and consumption tracking",
      "Modular architecture allowing future IQ Battery 5P units to be added as needs evolve",
    ],
    resultStats: [
      { icon: "energy", value: "5.0 kWh", label: "Physical storage available to value solar surplus" },
      { icon: "performance", value: "3.84 kVA", label: "Continuous discharge output to support consumption peaks" },
      { icon: "environment", value: "LFP", label: "Lithium Iron Phosphate chemistry with enhanced thermal stability" },
      { icon: "finance", value: "Scalable", label: "Modular AC-coupled architecture ready for future extensions" },
    ],
    gallery: {
      before: [],
      after: [],
      installation: [
        { src: "/src/assets/gallery/Bat1.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat2.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat3.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat4.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat5.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat6.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat7.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat8.jpg", caption: "Battery and gateway installation" },
        { src: "/src/assets/gallery/Bat9.jpg", caption: "Battery and gateway installation" },
      ],
    },
  },

  "etude-residentielle-3kwc-le-pontet": {
    title: "3 kWp residential study — Virtual battery",
    meta: "Le Pontet (84) — Urban Solar self-consumption",
    description:
      "6 DMEGC Solar bifacial 500 Wp modules, ATMOCE MI-1000 microinverters and Urban Solar Energy virtual battery.",
    context:
      "This study was carried out for a homeowner in Le Pontet (84130), with annual electricity consumption of 5,373 kWh on a 6 kVA single-phase meter under a base tariff. The goal was to design a tailored solar installation maximising the customer's energy independence, using a south-east facing roof with an 18° pitch and a self-consumption solution coupled with a virtual battery.",
    mission: [
      "Analysis of the household consumption profile, with 73% of consumption already occurring during daytime, to size the system precisely",
      "Engineering and equipment selection: microinverter architecture, high-efficiency bifacial modules and ESDEC mounting system",
      "Energy modelling of the plant to assess direct self-consumption and the surplus volume to be stored virtually",
    ],
    challenges: [
      {
        problem:
          "Delivering 3 kWp with minimal footprint on the available roof area",
        solution:
          "Installation of 6 DMEGC Solar 500 Wp modules with N-Type bifacial dual-glass technology, known for strong low-light performance",
      },
      {
        problem:
          "Managing shading and conversion individually to secure production",
        solution:
          "Use of 3 ATMOCE MI-1000 microinverters, one microinverter for two modules, ensuring optimal MPPT tracking and DC voltage below 60 V",
      },
      {
        problem:
          "Fully valuing an estimated production surplus of around 1,200 kWh/year",
        solution:
          "Implementation of the Urban Solar Energy virtual battery, storing 100% of the surplus and returning it as energy credits during consumption peaks in the evening or winter",
      },
    ],
    specs: [
      { label: "Studied capacity", value: "3 kWp" },
      { label: "Estimated annual production", value: "4,374 kWh/year" },
      { label: "Household consumption", value: "5,373 kWh/year" },
      { label: "Modules", value: "6 × DMEGC Solar N-Type bifacial 500 Wp" },
      { label: "Inverters", value: "3 × ATMOCE MI-1000 — 1000 VA" },
      { label: "Energy management", value: "Shelly Pro EM-50" },
      { label: "Orientation / tilt", value: "South-East / 18°" },
      { label: "Grid connection", value: "Self-consumption + Urban Solar virtual battery" },
      { label: "Self-sufficiency rate", value: "81%" },
    ],
    results: [
      "Estimated annual production of 4,374 kWh",
      "Overall autonomy of 81%, including 59% direct self-consumption and 22% returned through the virtual battery",
    ],
    resultStats: [
      { icon: "energy", value: "4,374 kWh/year", label: "Estimated annual production for the residential PV plant" },
      { icon: "performance", value: "59% / 22%", label: "Direct self-consumption / virtual battery return" },
      { icon: "finance", value: "10.7 years", label: "Return on investment with reduced 5.5% VAT" },
      { icon: "environment", value: "100%", label: "Solar surplus valued with no production loss" },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/AV1.jpg", caption: "Before installation" },
        { src: "/src/assets/gallery/AV2.jpg", caption: "Before installation" },
        { src: "/src/assets/gallery/AV3.jpg", caption: "Before installation" },
      ],
      after: [
        { src: "/src/assets/gallery/D1.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/D2.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/D3.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/D4.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/D5.jpg", caption: "After installation" },
        { src: "/src/assets/gallery/D6.jpg", caption: "After installation" },
      ],
    },
  },

  "maintenance-nettoyage-16-panneaux-vedene": {
    title: "PV maintenance — Cleaning of 16 modules",
    meta: "Vedène (84) — yield recovery",
    description:
      "Preventive cleaning of a 16-module photovoltaic system to remove soiling, prevent hotspots and restore performance.",
    context:
      "The performance of a solar installation directly depends on its environment and maintenance. This preventive maintenance operation concerned a 16-module PV system in Vedène. Over time, dust, pollen and various pollutants form an opaque layer on the module glass. This soiling effect blocks solar radiation and gradually reduces electrical production. The goal of the intervention was to remove this loss factor and restore the plant's maximum yield.",
    mission: [
      "Visual audit and diagnosis of the soiling level on the 16 modules and analysis of its potential impact on the production curve",
      "Site safety setup: strict rooftop intervention protocol, work area securing and use of personal protective equipment",
      "Maintenance operation: module cleaning according to photovoltaic manufacturer recommendations",
    ],
    challenges: [
      {
        problem:
          "Preserving the anti-reflective coating of the modules, which can be sensitive to abrasive agents, aggressive detergents and limescale deposits",
        solution:
          "Cleaning exclusively with pure, reverse-osmosis or demineralised water at low pressure using a very soft telescopic brush, without chemicals and without drying marks",
      },
      {
        problem:
          "Avoiding hotspots caused by bird droppings or localised dirt that can shade a cell and cause overheating",
        solution:
          "Detailed inspection of each module during the operation to remove embedded dirt and protect the electrical integrity of the PV string",
      },
    ],
    specs: [
      { label: "Intervention type", value: "Preventive maintenance — PV cleaning" },
      { label: "Location", value: "Vedène (84)" },
      { label: "Number of modules", value: "16 photovoltaic modules" },
      { label: "Method", value: "Pure water + soft telescopic brush" },
      { label: "Objective", value: "Restoration of maximum yield" },
      { label: "Risk treated", value: "Soiling, deposits, hotspots" },
    ],
    results: [
      "Yield restored by removing the dust barrier and recovering production losses linked to soiling",
      "Durability strengthened by removing potentially corrosive agents and preventing hotspots",
      "Financial benefit for the customer through a cleaner, more productive plant with better self-consumption or resale value",
    ],
    resultStats: [
      { icon: "performance", value: "16", label: "Modules cleaned and inspected one by one" },
      { icon: "energy", value: "5 to 15%", label: "Recoverable losses depending on observed soiling level" },
      { icon: "environment", value: "Pure water", label: "Cleaning without aggressive detergent or limescale deposits" },
      { icon: "finance", value: "Optimised", label: "Production and energy value improved after intervention" },
    ],
    gallery: {
      before: [
        { src: "/src/assets/gallery/AvNet1.jpg", caption: "Before cleaning" },
        { src: "/src/assets/gallery/AvNet2.jpg", caption: "Before cleaning" },
        { src: "/src/assets/gallery/AvNet3.jpg", caption: "Before cleaning" },
      ],
      after: [
        { src: "/src/assets/gallery/ApNet1.jpg", caption: "After cleaning" },
        { src: "/src/assets/gallery/ApNet2.jpg", caption: "After cleaning" },
        { src: "/src/assets/gallery/ApNet3.jpg", caption: "After cleaning" },
        { src: "/src/assets/gallery/ApNet4.jpg", caption: "After cleaning" },
        { src: "/src/assets/gallery/ApNet5.MOV", caption: "After cleaning — video", mediaType: "video" },
        { src: "/src/assets/gallery/ApNet6.MOV", caption: "After cleaning — video", mediaType: "video" },
      ],
    },
  },

  "etude-integration-irve-bornes-recharge": {
    title: "EV charging infrastructure study and integration",
    meta: "Charging infrastructure — sizing and dynamic load management",
    description:
      "Complete technical study and integration of EV charging stations, including electrical protections, dynamic load management and Autel MaxiCharger solutions.",
    context:
      "Vehicle electrification requires reliable, safe and site-adapted charging infrastructure. In my projects, I carry out complete studies and tailor-made technical proposals for EV charging integration. My approach ensures electrical compatibility with the existing installation, including charger sizing, available power assessment and rigorous selection of upstream electrical protection devices.",
    mission: [
      "Analysis of customer needs and site electrical context to define the appropriate charging power",
      "EV charging infrastructure sizing: charger selection, electrical protections, cabling and compatibility with the existing distribution board",
      "Integration of dynamic load management solutions to avoid electrical overloads in the building",
      "Selection of recognised manufacturers and proposal of solutions adapted to the customer's technical, economic and usage constraints",
    ],
    challenges: [
      {
        problem:
          "Avoiding electrical overloads when the charger operates simultaneously with other uses in the building or house",
        solution:
          "Integration of dynamic load management using current transformers, Smart Sensor Box or equivalent systems, allowing the charger to adjust its power in real time according to the site's instantaneous consumption",
      },
      {
        problem:
          "Optimising electric vehicle charging when local photovoltaic production is available",
        solution:
          "Configuration of a control logic favouring charging from available solar surplus to improve self-consumption and reduce grid imports",
      },
      {
        problem:
          "Adapting to varied electrical architectures, single-phase or three-phase, while ensuring robustness and connectivity",
        solution:
          "Recommendation of recognised chargers, including the Autel MaxiCharger Elite 2 range, compatible with single-phase up to 7.4 kW and three-phase at 11 kW or 22 kW, with Wi-Fi, Ethernet or 4G connectivity",
      },
    ],
    specs: [
      { label: "Project type", value: "EV charging study and integration" },
      { label: "Use case", value: "Residential or commercial EV charging" },
      { label: "Single-phase power", value: "Up to 7.4 kW" },
      { label: "Three-phase power", value: "11 kW or 22 kW" },
      { label: "Load management", value: "DLB / ALM with measurement sensors" },
      { label: "Solar control", value: "Possible charging from PV surplus" },
      { label: "Manufacturers", value: "Autel, Schneider Electric, Alfen, Enphase, SolarEdge" },
      { label: "Preferred range", value: "Autel MaxiCharger Elite 2" },
      { label: "Robustness", value: "IP65 / IK10 depending on model" },
    ],
    results: [
      "Charging infrastructure sized according to available power and site electrical constraints",
      "Building electrical network protected thanks to automatic adjustment of charging power",
      "Possibility to prioritise charging from photovoltaic surplus to maximise self-consumption",
      "Scalable solution compatible with several recognised EV charging manufacturers",
    ],
    resultStats: [
      { icon: "energy", value: "7.4 to 22 kW", label: "Power range depending on single-phase or three-phase supply" },
      { icon: "performance", value: "DLB / ALM", label: "Dynamic load management to avoid overloads" },
      { icon: "environment", value: "PV surplus", label: "Charging can be controlled with available solar energy" },
      { icon: "finance", value: "Multi-brand", label: "Adapted solutions: Autel, Schneider, Alfen, Enphase, SolarEdge" },
    ],
    galleryTitle: "Charger",
    gallery: {
      before: [],
      after: [],
      installation: [
        { src: "/src/assets/gallery/IRVE1.jpg", caption: "EV charging station" },
        { src: "/src/assets/gallery/IRVE2.jpg", caption: "EV charging station" },
        { src: "/src/assets/gallery/IRVE3.jpg", caption: "EV charging station" },
      ],
    },
  },
}

function translateProject(item: GalleryItem): GalleryItem {
  const translation = projectTranslations[item.slug]
  if (!translation) return item

  return {
    ...item,
    ...translation,
    gallery: translation.gallery ?? item.gallery,
    challenges: translation.challenges ?? item.challenges,
    specs: translation.specs ?? item.specs,
    results: translation.results ?? item.results,
    resultStats: translation.resultStats ?? item.resultStats,
  }
}

export const galleryItemsEn: GalleryItem[] = galleryItems.map(translateProject)

export function getPortfolioData(lang: Lang) {
  const isEn = lang === 'en'

  return {
    identity: {
      ...identity,
      ...(isEn ? identityEn : {}),
    },
    kpis: isEn ? kpisEn : kpis,
    profileText: isEn ? profileTextEn : profileText,
    education: isEn ? educationEn : education,
    toolGroups: isEn ? toolGroupsEn : toolGroups,
    skills: isEn ? skillsEn : skills,
    languages: isEn ? languagesEn : languages,
    certifications: isEn ? certificationsEn : certifications,
    experiences: isEn ? experiencesEn : experiences,
    galleryItems: isEn ? galleryItemsEn : galleryItems,
    contact: {
      intro: isEn
        ? "Available for a work-study position from September 2026 or for a full-time opportunity."
        : contact.intro,
    },
  }
}
