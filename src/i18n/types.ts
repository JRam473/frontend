export type Language = 'es' | 'en' | 'nah';

export interface Translations {
  common: {
    welcome: string;
    learnMore: string;
    contact: string;
    readMore: string;
    seeMore: string;
    back: string;
    close: string;
    share: string;
  };
  navigation: {
    title: string;
    description: string;
    home: string;
    community: string;
    culture: string;
    products: string;
    contact: string;
    gallery: string;
  };
  hero: {
    region: string;
    weather: string;
    error: string;
    language: string;
    spanish: string;
    currency: string;
    season: string;
    seasonMonths: string;
    discoverAria: string;
    discoverButton: string;
    adventureAria: string;
    adventureButton: string;
    scrollMobile: string;
    scrollDesktop: string;
  };
  highlights: {
    natureTitle: string;
    natureText: string;
    gastronomyTitle: string;
    gastronomyText: string;
    communityTitle: string;
    communityText: string;
    traditionsTitle: string;
    traditionsText: string;
    touristPlaces: string;
    typicalDishes: string;
    inhabitants: string;
    yearsHistory: string;
  };
  footer: {
    description: string;
    address: string;
    explore: string;
    keyServices: string;
    regionalGastronomy: string;
    handicrafts: string;
    transportation: string;
    culturalEvents: string;
    rights: string;
    developed: string;
    // Agregar las keys de quickLinks si también quieres traducirlas
    home: string;
    attractions: string;
    culture: string;
    community: string;
    gallery: string;
    contact: string;
  };
  cards: {
    exploreTitle: string;
    exploreSubtitle: string;
    exploreButton: string;
    previous: string;
    next: string;
    goToCard: string;
    // Cards específicas
    adelaRestaurant: {
      title: string;
      description: string;
    };
    loversWaterfall: {
      title: string;
      description: string;
    };
    cabins: {
      title: string;
      description: string;
    };
    viewpoints: {
      title: string;
      description: string;
    };
    dances: {
      title: string;
      description: string;
    };
    rivers: {
      title: string;
      description: string;
    };
  };
  culture: {
    heritageBadge: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
    exploreButton: string;
    calendarButton: string;
  };
  calendar: {
    visitors: string;
    titlePart1: string;
    titlePart2: string;
    subtitle: string;
    resetProgress: string;
    resetAria: string;
    routeTitle: string;
    completed: string;
    rewardMessage: string;
    allCompleted: string;
    downloadStickers: string;
    downloadAria: string;
    progressMessage: string;
    eventAria: string;
    completedAria: string;
    viewVideo: string;
    viewExperience: string;
    loading: string;
    videoUnavailable: string;
    activities: string;
    seeMore: string;
    categoryTraditional: string;
    categoryCultural: string;
    categoryGastronomic: string;
    categoryArtistic: string;
    categoryReligious: string;
    categoryCeremonial: string;
    categoryFair: string;
    categoryNature: string;
    categoryAgriculture: string;
    categoryAstronomy: string;
    categoryGalaxies: string;
  },
  modal: {
    welcome: string;
    learnMore: string;
    contact: string;
    readMore: string;
    seeMore: string;
    back: string;
    close: string;
    share: string;
    congratulations: string;
    completedRoute: string;
    downloadStickers: string;
  };
  breadcrumbs: {
    home: string;
    culture: string;
    culturalCalendar: string;
  };
  carousel: {
    title: string;
    sanJuanTahitic: string;
    exploreMore: string;
    phrases: string[];
  };
  culturesection: {
    dances: string;
    dancesDescription: string;
    dancesDetails: string[];
    crafts: string;
    craftsDescription: string;
    craftsDetails: string[];
    language: string;
    languageDescription: string;
    languageDetails: string[];
    gastronomy: string;
    gastronomyDescription: string;
    gastronomyDetails: string[];
    exploreMore: string;
    discoverFestivities: string;
    heritage: string;
    livingTradition: string;
    preservingOur: string;
    roots: string;
    preservationDescription: string;
    stats: {
      yearsHistory: string;
      localArtisans: string;
      annualFestivals: string;
      livingTradition: string;
    };
    achievements: string[];
  };
  language: {
    ancestralLanguage: string;
    speaking: string;
    nahuatl: string;
    description: string;
    sanJuanTahitic: string;
    listen: string;
    exploreMore: string;
    phrases: Array<{
      nahuatl: string;
      translation: string;
      audio: string;
    }>;
  };
  crafts: {
    localCrafts: string;
    description: string;
    clickInstructionDesktop: string;
    clickInstructionMobile: string;
    showLess: string;
    showMore: string;
    showingAll: string;
    moreToDiscover: string;
    scrollHint: string;
    noResults: string;
    viewAllCrafts: string;
    visitUs: string;
    visitDescription: string;
    viewDetails:string;
    clickToZoom: string;
    behindTheStory: string;
    theArtisan: string;
    details: string;
    creationTime: string;
    price: string;
    materialsUsed: string;
    ancestralTechniques: string;
    viewMoreCrafts: string;
    navigationInstructions: string;
    closeZoom: string;
    zoomedViewOf: string;
    by: string;
    closeZoomInstructions: string;
    categories: {
      textiles: string;
      ceramica: string;
      madera: string;
      todos: string;
    };
    artisanExperience: string;
     modal: {
      close: string;
      clickToZoom: string;
      closeZoom: string;
      theStoryBehind: string;
      theArtisan: string;
      details: string;
      productionTime: string;
      price: string;
      materialsUsed: string;
      ancestralTechniques: string;
      viewMoreCrafts: string;
      keyboardShortcuts: string;
      zoomInstructions: string;
      by: string;
    };
    tooltip: {
      tapToExplore: string;
      discoverMore: string;
      mobileInstruction: string;
      desktopInstruction: string;
      mobileNavigationTip: string;
      desktopNavigationTip: string;
    };
    imageNotAvailable: string; 
    loadingCraft: string;
  };
  gastronomy: {
    ancestralFlavors: string;
    journey: string;
    gastronomic: string;
    description: string;
    hoverVideo: string;
    origin: string;
    ingredients: string;
    spiceLevel: string;
    seasonFestivity: string;
    exploreOurCuisine: string;
    highlights: {
      traditionalRecipes: string;
      localIngredients: string;
      annualFairs: string;
      flavorTradition: string;
    };
  };
  gastronomysection: {
    flavorsOfTahitic: string;
    mexicanGastronomy: string;
    description: string;
    back: string;
    exploreGastronomy: string;
  };
  cocinas: {
    types: {
      familiar: string;
      comunitario: string;
    };
    services: {
      wifi: string;
      parking: string;
      garden: string;
      groups: string;
      takeaway: string;
      reservations: string;
      outdoor: string;
      demonstrations: string;
      workshops: string;
      ingredients: string;
      events: string;
    };
    schedule: {
      weekdays: string;
      weekend: string;
      closed: string;
    };
    gallery: {
      dishes: string;
      events: string;
      preparation: string;
      ambience: string;
    };
    experience: {
      idealMoment: string;
      vibe: string;
      aroma: string;
    };
    contact: {
      hours: string;
      address: string;
      reference: string;
      instructions: string;
    };
    recommendations: string;
    awards: string;
     header: {
      gastronomicExperiences: string;
      previousKitchen: string;
      nextKitchen: string;
      goToKitchen: string;
      of: string;
    };
    floatingNav: {
      currentlyViewing: string;
      kitchen: string;
      previous: string;
      next: string;
      close: string;
      minimize: string;
      showInfo: string;
      view: string;
      tooltip: {
        title: string;
        description: string;
      };
    };
    hero: {
      experiences: string;
      generations: string;
      discoverOurStory: string;
      howToGetThere: string;
      useArrows: string;
      previousKitchen: string;
      nextKitchen: string;
    };
    restaurantInfo: {
      ourStory: string;
      servicesWeOffer: string;
      theAmbiance: string;
      kitchenAmbiance: string;
    };
    featuredDishes: {
      emblematicDishes: string;
      discoverFlavors: string;
      emblem: string;
      seeMore: string;
      currency: string;
    };
    location: {
      visitUs: string;
      address: string;
      hours: string;
      mondayFriday: string;
      saturdaySunday: string;
      recommendations: string;
      locationOf: string;
    };
    expandedModal: {
      closeModal: string;
      clickToExpand: string;
      resetImage: string;
      rotateImage: string;
      zoomOut: string;
      zoomIn: string;
      closeImageViewer: string;
      featuredDish: string;
      viewImage: string;
      ourStory: string;
      services: string;
      openingHours: string;
      mondayFriday: string;
      saturdaySunday: string;
      holidays: string;
      anyQuestions: string;
      historicalInfoNotAvailable: string;
      service: string;
      expandedImageOf: string;
      kitchenEnvironment: string;
    };
    };
    platillos: {
    title: string;
    clickInstruction: string;
    description: string;
    ariaLabel: string;
    clickForInfo: string;
    tap: string;
    exploreOthers: string;
    screenReader: {
      expanded: string;
      gridView: string;
    };
    modal: {
      fullscreenView: string;
      zoomOut: string;
      resetZoom: string;
      zoomIn: string;
      previousDish: string;
      nextDish: string;
      exitFullscreen: string;
      closeModal: string;
      fullscreen: string;
      location: string;
      address: string;
      owner: string;
      phone: string;
      phoneNotAvailable: string;
      viewOnMaps: string;
      suggestions: string;
      openingHours: string;
      backToGallery: string;
      keyboardShortcuts: string;
      by: string;
    };
    loading: string; // ← NUEVO
    imageNotAvailable: string; // ← NUEVO
  };
  call: {
    discoverThe: string;
    magic: string;
    ofOurCuisine: string;
    subtitle: string;
    features: {
      localIngredients: string;
      familyTradition: string;
      qualityGuaranteed: string;
      cozyAtmosphere: string;
    };
    ctaButton: string;
    inspirationalQuote: string;
    waitingMessage: string;
  };
  dance: {
    traditionsInMotion: string;
    ancestralDances: string;
    description: string;
    sanJuanTahitic: string;
    previousDance: string;
    nextDance: string;
    learnMore: string;
    tapToLearnMore: string;
    danceDetails: string;
    closeDanceDetails: string;
    expand: string;
    close: string;
    experienceInPerson: string;
    ctaDescription: string;
    viewOnMap: string;
    invitationCard: string;
    panoramicView: string;
  };
  community: {
    ourPeopleOurStrength: string;
    unitedBy: string;
    tradition: string;
    description: string;
    learnOurHistory: string;
    communityCooperative: string;
  };
   timeline: {
    enduringLegacy: string;
    our: string;
    roots: string;
    description: string;
    showMore: string;
    showLess: string;
    expand: string;
    collapse: string;
    learnMore: string;
  };
  present: {
    sanJuanToday: string;
    ourVibrant: string;
    community: string;
    description: string;
    communityPillars: string;
    ourValues: string;
    learnMore: string;
    communityInNumbers: string;
    numbersDescription: string;
    lastUpdate: string;
    source: string;
    wouldYouLikeToVisit: string;
    visitDescription: string;
    closeModal: string; 
    pillars: Array<{
      title: string;
      description: string;
    }>;
    stats: Array<{
      label: string;
    }>;
  };
  attractions: {
    projectInDevelopment: string;
    our: string;
    novelties: string;
    description: string;
    communityProject: string;
    viewGallery: string;
    projectTimeline: string;
    knowCompletePlan: string;
    communityImpact: string;
    jobsGenerated: string;
    cabinsUnderConstruction: string;
    localMaterials: string;
    project: {
      title: string;
      subtitle: string;
      description: string;
      status: string;
      features: Array<{
        label: string;
        value: string;
      }>;
      timeline: Array<{
        phase: string;
        date: string;
      }>;
      constructionImages: Array<{
        title: string;
        description: string;
      }>;
      };
    };
    tequio: {
    title: string;
    subtitle: string;
    unitedForCommonGood: string;
    heroDescription: string;
    ancestralTradition: string;
    solidarity: string;
    collectiveProgress: string;
    communityProjects: string;
    projectsDescription: string;
    participants: string;
    frequency: string;
    benefitsForCommunity: string;
    toolsUsed: string;
    whyTequioStrengthens: string;
    benefitsDescription: string;
    communityVoices: string;
    testimonialsDescription: string;
    culturalHeritage: string;
    heritageDescription: string;
    organizedCommunity: string;
    carousel: {
      collectiveWorkRoads: string;
      roadsDescription: string;
      communityReforestation: string;
      reforestationDescription: string;
      schoolMaintenance: string;
      schoolDescription: string;
      springCleaning: string;
      springDescription: string;
      tequioCelebration: string;
      celebrationDescription: string;
    };
    projects: Array<{
      name: string;
      description: string;
      benefits: string[];
      tools: string[];
    }>;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    testimonials: Array<{
      name: string;
      participation: string;
      testimonial: string;
    }>;
  };
  gastronomymodal: {
    title: string;
    subtitle: string;
    description: string;
    heroTitle: string;
    heroDescription: string;
    heroTags: string[];
    ourProducts: string;
    productsDescription: string;
    flavorsOfTheLand: string;
    flavorsDescription: string;
    ancestralKnowledge: string;
    knowledgeDescription: string;
    livingHeritage: string;
    heritageDescription: string;
    heritageTag: string;
    carousel: {
      cornHarvest: string;
      cornDescription: string;
      organicMarket: string;
      marketDescription: string;
      molePreparation: string;
      moleDescription: string;
      organicCoffee: string;
      coffeeDescription: string;
      beanTamales: string;
      tamalesDescription: string;
    };
    products: Array<{
      name: string;
      description: string;
      season: string;
      characteristics: string[];
    }>;
    dishes: Array<{
      name: string;
      description: string;
      ingredients: string[];
      preparation: string;
    }>;
    knowledge: Array<{
      title: string;
      description: string;
    }>;
    characteristics: string;
    mainIngredients: string;
  };
  festivities: {
    title: string;
    subtitle: string;
    celebratingOurIdentity: string;
    identityDescription: string;
    livingTradition: string;
    communityUnity: string;
    culturalHeritage: string;
    annualFestiveCalendar: string;
    calendarDescription: string;
    danceExpressions: string;
    danceDescription: string;
    culturalHeritagee: string;
    heritageDescription: string;
    memoryBecomesCelebration: string;
    finalDescription: string;
    whereTraditionLives: string;
    carousel: {
      patronalFestival: string;
      patronalDescription: string;
      moorsDance: string;
      moorsDescription: string;
      dayOfTheDead: string;
      dayOfTheDeadDescription: string;
      traditionalCarnival: string;
      carnivalDescription: string;
      holyWeek: string;
      holyWeekDescription: string;
    };
    festivals: Array<{
      name: string;
      date: string;
      description: string;
      activities: string[];
      duration: string;
      participants: string;
      highlight: string;
    }>;
    dances: Array<{
      name: string;
      description: string;
      origin: string;
      participants: string;
      season: string;
      clothing: string;
      meaning: string;
    }>;
    heritage: Array<{
      title: string;
      description: string;
      status: string;
    }>;
    labels: {
      duration: string;
      highlightedActivities: string;
      origin: string;
      clothing: string;
      meaning: string;
      status: string;
    };
  };

  education: {
    transformativeEducation: string;
    knowledgeCommunityPurpose: string;
    investmentDescription: string;
    buildingFutures: string;
    purpose: string;
    educationDescription: string;
    students: string;
    teachers: string;
    institutions: string;
    yearsTradition: string;
    educationPillars: string;
    educationPillarsDescription: string;
    educationalPath: string;
    educationalPathDescription: string;
    collectiveAchievements: string;
    collectiveAchievementsDescription: string;
    educationTransforms: string;
    finalMessage: string;
    learningCreatesFutures: string;
    carousel: {
      learningCommunity: string;
      learningCommunityDesc: string;
      educationalFacilities: string;
      educationalFacilitiesDesc: string;
      practicalActivities: string;
      practicalActivitiesDesc: string;
      academicCelebrations: string;
      academicCelebrationsDesc: string;
      educationalTechnology: string;
      educationalTechnologyDesc: string;
    };
    institutionss: Array<{
      name: string;
      level: string;
      description: string;
      focus: string;
      motto: string;
    }>;
    pillars: Array<{
      title: string;
      description: string;
      metrics: string[];
    }>;
    achievements: Array<{
      year: string;
      achievement: string;
      description: string;
      impact: string;
    }>;
    };
    cooperative: {
    communityProduction: string;
    our: string;
    cooperative: string;
    description: string;
    products: {
      coffee: {
        title: string;
        description: string;
      };
      punch: {
        title: string;
        description: string;
      };
      soaps: {
        title: string;
        description: string;
      };
      juices: {
        title: string;
        description: string;
      };
    };
    impact: {
      localImpact: string;
      moreThanProducts: string;
      opportunities: string;
      impactDescription: string;
      stats: {
        yearsProduction: string;
        familiesBenefited: string;
        communityProducts: string;
        artisanalProduction: string;
      };
    };
    cta: string;
  };
  services: {
    ourCollection: string;
    collectionDescription: string;
    searchPlaceholder: string;
    allCategories: string;
    showingResults: string;
    of: string;
    products: string;
    in: string;
    for: string;
    noProductsFound: string;
    noProductsDescription: string;
    showAllProducts: string;
    featured: string;
    seasonal: string;
    moreItems: string;
    variants: string;
    available: string;
    soldOut: string;
    by: string;
    variantsCount: string;
    visitUs: string;
    requestInfo: string;
    goBack: string;
    expandImage: string;
    close: string;
    share: string;
    copyLink: string;
    whatsapp: string;
    facebook: string;
    twitter: string;
    telegram: string;
    season: string;
    description: string;
    ourStory: string;
    ingredientsProcess: string;
    mainMaterials: string;
    artisanalProcess: string;
    featuredCharacteristics: string;
    madeBy: string;
    toggleShareOptions: string;
    copying: string;
    shareOptions: string;
    mobileView: string;
    native: string;
    swipeHint: string;
  };
  cooperativesection: {
    communityCooperative: string;
    flavorsAndKnowledge: string;
    ofOurLand: string;
    description: string;
    uniqueProducts: string;
    yearsOfTradition: string;
    organicAndNatural: string;
    back: string;
    exploreProducts: string;
    solidarityEconomy: string;
    solidarityDescription: string;
    discoverMore: string;
  };
  voices: {
    testimonials: Array<{
      id: number;
      nombre: string;
      rol: string;
      testimonio: string;
      detalles: string;
      tagline: string;
    }>;
    header: {
      title: string;
      mainTitle: string;
      connect: string;
      generations: string;
      description: string;
    };
    controls: {
      previousTestimonial: string;
      nextTestimonial: string;
    };
    closing: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  contact: {
  title: string;
  subtitle: string;
  contactInfo: string;
  contactItems: {
    location: {
      title: string;
      content: string;
      details: string;
    };
    phone: {
      title: string;
      content: string;
      details: string;
    };
    email: {
      title: string;
      content: string;
      details: string;
    };
    hours: {
      title: string;
      content: string;
      details: string;
    };
  };
  howToGetThere: string;
  mapDescription: string;
  sendMessage: string;
  contactForm: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string; // ← NUEVA PROPIEDAD
    successMessage: string;
    errorMessage: string; // ← NUEVA PROPIEDAD
  };
  validation: { // ← NUEVA SECCIÓN
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    subjectRequired: string;
    messageRequired: string;
    messageTooLong: string;
  };
  additionalInfo: string;
  additionalItems: string[];
};
  gallery: {
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    categoriesTitle: string;
    allCategories: string;
    landscapes: string;
    nature: string;
    culture: string;
    community: string;
    traditions: string;
    imagesCount: string;
    imagesCount_plural: string;
    categoryLabel: string;
    allCategoriesLabel: string;
    communityCallToAction: string;
    communityDescription: string;
    video: {
      altText: string;
      ourCommunity: string;
      clickToWatch: string;
      play: string;
      playVideo: string;
      discoverEssence: string;
      youtube: string;
    };
    modal: {
      photographer: string;
      category: string;
      technicalInfo: string;
      zoom: string;
      imageOf: string;
      close: string;
      resetZoom: string;
      zoomIn: string;
      zoomOut: string;
      previous: string;
      next: string;
    };
    viewMode: {
      circularView: string;
      gridView: string;
      mobileView: string;
    };
    youtubeModal: {
      watchOnYouTube: string;
      videoTitle: string;
    };
  };
  heroturism: {
    beautifulPlace: string;
    liveSanJuanTahitic: string;
    startYourAdventure: string;
    discoverMore: string;
    swipe: string;
    loading: string;
    loadingExperience: string;
    weatherLoading: string;
    weatherError: string;
  };
  tourism: {
    sustainableEcotourism: string;
    touristAttractions: string;
    mainDescription: string;
    mountainTrails: string;
    mountainTrailsDescription: string;
    naturalReserve: string;
    naturalReserveDescription: string;
    riversWaterfalls: string;
    riversWaterfallsDescription: string;
    panoramicViewpoints: string;
    panoramicViewpointsDescription: string;
    sustainableTourism: string;
    greenCommitment: string;
    sustainabilityDescription: string;
    ecoCertified: string;
    knowItsHistory: string;
    stats: {
      ecologicalTrails: string;
      floraSpecies: string;
      sunnyDays: string;
      visitorRating: string;
    };
  };
  tourismsection: {
    back: string;
    livingMemory: string;
    treasuresNarrated: string;
    description: string;
    sections: {
      history: string;
      legend: string;
      timeline: string;
      voices: string;
    };
    videoControls: {
      play: string;
      pause: string;
      mute: string;
      unmute: string;
      fullscreen: string;
      exitFullscreen: string;
      duration: string;
    };
    metadata: {
      era: string;
      type: string;
      historicalPeriod: string;
      coordinates: string;
      archaeologicalData: string;
      naturalData: string;
    };
    historySection: {
      culturalSignificance: string;
      firstRecord: string;
    };
    legendSection: {
      characters: string;
      teaching: string;
    };
    timelineSection: {
      title: string;
      legend: string;
    };
    voicesSection: {
      title: string;
      age: string;
      noTestimonials: string;
      traditionalTechniques: string;
      origin: string;
    };
    gallery: {
      historicalArchive: string;
    };
    navigation: {
      previous: string;
      next: string;
    };
    modals: {
      close: string;
    };
  };
  // Más secciones se agregarán gradualmente
}

export type TranslationKey = 
  | `common.${keyof Translations['common']}`
  | `navigation.${keyof Translations['navigation']}`
  | `hero.${keyof Translations['hero']}`
  | `highlights.${keyof Translations['highlights']}`
  | `footer.${keyof Translations['footer']}`
  | `cards.${keyof Translations['cards']}`
  | `culture.${keyof Translations['culture']}`
  | `calendar.${keyof Translations['calendar']}`
  | `modal.${keyof Translations['modal']}`
  | `breadcrumbs.${keyof Translations['breadcrumbs']}`
  | `carousel.${keyof Translations['carousel']}`
  | `culturesection.${keyof Translations['culturesection']}`
  |`culturesection.stats.${keyof Translations['culturesection']['stats']}`
  | `language.${keyof Translations['language']}`
  | `crafts.${keyof Translations['crafts']}`
  | `crafts.categories.${keyof Translations['crafts']['categories']}`
  | `crafts.modal.${keyof Translations['crafts']['modal']}`
  | `crafts.tooltip.${keyof Translations['crafts']['tooltip']}`
  | `gastronomy.${keyof Translations['gastronomy']}`
  | `gastronomy.highlights.${keyof Translations['gastronomy']['highlights']}`
  | `gastronomysection.${keyof Translations['gastronomysection']}`
  | `cocinas.${keyof Translations['cocinas']}`
  | `cocinas.types.${keyof Translations['cocinas']['types']}`
  | `cocinas.services.${keyof Translations['cocinas']['services']}`
  | `cocinas.schedule.${keyof Translations['cocinas']['schedule']}`
  | `cocinas.gallery.${keyof Translations['cocinas']['gallery']}`
  | `cocinas.experience.${keyof Translations['cocinas']['experience']}`
  | `cocinas.contact.${keyof Translations['cocinas']['contact']}`
  | `cocinas.header.${keyof Translations['cocinas']['header']}`
  | `cocinas.floatingNav.${keyof Translations['cocinas']['floatingNav']}`
  | `cocinas.floatingNav.tooltip.${keyof Translations['cocinas']['floatingNav']['tooltip']}`
  | `cocinas.hero.${keyof Translations['cocinas']['hero']}`
  | `cocinas.restaurantInfo.${keyof Translations['cocinas']['restaurantInfo']}`
  | `cocinas.featuredDishes.${keyof Translations['cocinas']['featuredDishes']}`
  | `cocinas.location.${keyof Translations['cocinas']['location']}`
  | `cocinas.expandedModal.${keyof Translations['cocinas']['expandedModal']}`
  | `platillos.${keyof Translations['platillos']}`
  | `platillos.screenReader.${keyof Translations['platillos']['screenReader']}`
  | `platillos.modal.${keyof Translations['platillos']['modal']}`
  | `call.${keyof Translations['call']}`
  | `call.features.${keyof Translations['call']['features']}`
  | `dance.${keyof Translations['dance']}`
  | `community.${keyof Translations['community']}`
  | `timeline.${keyof Translations['timeline']}`
  | `present.${keyof Translations['present']}`
  | `present.pillars.${number}.title`
  | `present.pillars.${number}.description`
  | `present.stats.${number}.label`
  | `attractions.${keyof Translations['attractions']}`
  | `attractions.project.${keyof Translations['attractions']['project']}`
  | `attractions.project.features.${number}.label`
  | `attractions.project.features.${number}.value`
  | `attractions.project.timeline.${number}.phase`
  | `attractions.project.timeline.${number}.date`
  | `attractions.project.constructionImages.${number}.title`
  | `attractions.project.constructionImages.${number}.description`
  | `tequio.${keyof Translations['tequio']}`
  | `tequio.carousel.${keyof Translations['tequio']['carousel']}`
  | `tequio.projects.${number}.name`
  | `tequio.projects.${number}.description`
  | `tequio.projects.${number}.benefits`
  | `tequio.projects.${number}.tools`
  | `tequio.benefits.${number}.title`
  | `tequio.benefits.${number}.description`
  | `tequio.testimonials.${number}.name`
  | `tequio.testimonials.${number}.participation`
  | `tequio.testimonials.${number}.testimonial`
  | `gastronomymodal.${keyof Translations['gastronomymodal']}`
  | `gastronomymodal.carousel.${keyof Translations['gastronomymodal']['carousel']}`
  | `gastronomymodal.products.${number}.${keyof Translations['gastronomymodal']['products'][0]}`
  | `gastronomymodal.dishes.${number}.${keyof Translations['gastronomymodal']['dishes'][0]}`
  | `gastronomymodal.knowledge.${number}.${keyof Translations['gastronomymodal']['knowledge'][0]}`
  | `festivities.${keyof Translations['festivities']}`
  | `festivities.carousel.${keyof Translations['festivities']['carousel']}`
  | `festivities.festivals.${number}.${keyof Translations['festivities']['festivals'][0]}`
  | `festivities.dances.${number}.${keyof Translations['festivities']['dances'][0]}`
  | `festivities.heritage.${number}.${keyof Translations['festivities']['heritage'][0]}`
  | `festivities.labels.${keyof Translations['festivities']['labels']}`
  | `education.${keyof Translations['education']}`
  | `education.carousel.${keyof Translations['education']['carousel']}`
  | `education.institutionss.${number}.${keyof Translations['education']['institutionss'][0]}` 
  | `education.pillars.${number}.${keyof Translations['education']['pillars'][0]}`
  | `education.achievements.${number}.${keyof Translations['education']['achievements'][0]}`
  | `cooperative.${keyof Translations['cooperative']}`
  | `cooperative.products.${keyof Translations['cooperative']['products']}`
  | `cooperative.impact.${keyof Translations['cooperative']['impact']}`
  | `cooperative.impact.stats.${keyof Translations['cooperative']['impact']['stats']}`
  | `cooperative.products.coffee.${keyof Translations['cooperative']['products']['coffee']}`
  | `cooperative.products.punch.${keyof Translations['cooperative']['products']['punch']}`
  | `cooperative.products.soaps.${keyof Translations['cooperative']['products']['soaps']}`
  | `cooperative.products.juices.${keyof Translations['cooperative']['products']['juices']}`
  | `services.${keyof Translations['services']}`
  | `cooperativesection.${keyof Translations['cooperativesection']}`
  | `voices.${keyof Translations['voices']}`
  | `voices.header.${keyof Translations['voices']['header']}`
  | `voices.controls.${keyof Translations['voices']['controls']}`
  | `voices.closing.${keyof Translations['voices']['closing']}`
  | `contact.${keyof Translations['contact']}`
  | `contact.contactItems.${keyof Translations['contact']['contactItems']}`
  | `contact.contactForm.${keyof Translations['contact']['contactForm']}`
  | `contact.validation.${keyof Translations['contact']['validation']}`
  | `contact.contactItems.location.${keyof Translations['contact']['contactItems']['location']}`
  | `contact.contactItems.phone.${keyof Translations['contact']['contactItems']['phone']}`
  | `contact.contactItems.email.${keyof Translations['contact']['contactItems']['email']}`
  | `contact.contactItems.hours.${keyof Translations['contact']['contactItems']['hours']}`
  | `contact.contactForm.${keyof Translations['contact']['contactForm']}`
  | `gallery.${keyof Translations['gallery']}`
  | `gallery.video.${keyof Translations['gallery']['video']}`
  | `gallery.modal.${keyof Translations['gallery']['modal']}`
  | `gallery.viewMode.${keyof Translations['gallery']['viewMode']}`
  | `gallery.youtubeModal.${keyof Translations['gallery']['youtubeModal']}`
  | `heroturism.${keyof Translations['heroturism']}`
  | `tourism.${keyof Translations['tourism']}`
  | `tourism.stats.${keyof Translations['tourism']['stats']}`
  | `tourismsection.${keyof Translations['tourismsection']}`
  | `tourismsection.sections.${keyof Translations['tourismsection']['sections']}`
  | `tourismsection.videoControls.${keyof Translations['tourismsection']['videoControls']}`
  | `tourismsection.metadata.${keyof Translations['tourismsection']['metadata']}`
  | `tourismsection.historySection.${keyof Translations['tourismsection']['historySection']}`
  | `tourismsection.legendSection.${keyof Translations['tourismsection']['legendSection']}`
  | `tourismsection.timelineSection.${keyof Translations['tourismsection']['timelineSection']}`
  | `tourismsection.voicesSection.${keyof Translations['tourismsection']['voicesSection']}`
  | `tourismsection.gallery.${keyof Translations['tourismsection']['gallery']}`
  | `tourismsection.navigation.${keyof Translations['tourismsection']['navigation']}`
  | `tourismsection.modals.${keyof Translations['tourismsection']['modals']}`;

  export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
  origin?: string;
  ingredients?: string[];
  spiceLevel?: string;
  festival?: string;
}
export interface GastronomiaData {
  platillos: Dish[];
}

// En types.ts - AGREGAR al final
export type IconKey = 'Shirt' | 'Feather' | 'Music' | 'Sunrise' | 'Leaf' | 'Footprints' | 'Heart' | 'Wind' | 'BookOpen';

export interface DanceElement {
  icon: IconKey;
  title: string;
  text: string;
}

export interface Dance {
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
  details: {
    story: string;
    elements: DanceElement[];
  };
}
