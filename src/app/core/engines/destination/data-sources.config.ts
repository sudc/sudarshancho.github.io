/**
 * DESTINATION DATA SOURCES CONFIGURATION
 * ========================================
 * 
 * Official and trusted sources for destination intelligence.
 * This configuration defines where TripSaver gets its data from.
 * 
 * Source Hierarchy (Most to Least Trusted):
 * 1. Government Tourism Portals (Official)
 * 2. Wikipedia Climate Data (Historical, Reliable)
 * 3. Agoda Market Data (Real-time pricing)
 * 4. Editorial Rules (TripSaver IP)
 */

// ===========================
// DATA SOURCE TYPES
// ===========================

export enum DataSourceType {
  GOVERNMENT_TOURISM = 'government_tourism',
  STATE_TOURISM = 'state_tourism',
  CLIMATE_HISTORICAL = 'climate_historical',
  MARKET_PRICING = 'market_pricing',
  EDITORIAL = 'editorial'
}

export enum DataSourceTrust {
  HIGH = 'high',           // Government, Official
  MEDIUM = 'medium',       // Wikipedia, Market Data
  LOW = 'low'              // Blogs, Forums
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  trust: DataSourceTrust;
  url: string;
  coverage: string[];      // States/regions covered
  dataProvides: string[];  // What data this source provides
  updateFrequency: string;
  notes?: string;
}

// ===========================
// 1️⃣ GOVERNMENT TOURISM SOURCES
// ===========================

/**
 * National Tourism Portal - Highest Trust
 */
export const INCREDIBLE_INDIA: DataSource = {
  id: 'incredible_india',
  name: 'Incredible India',
  type: DataSourceType.GOVERNMENT_TOURISM,
  trust: DataSourceTrust.HIGH,
  url: 'https://www.incredibleindia.org',
  coverage: ['India'],
  dataProvides: [
    'Best time to visit',
    'Destination categorization',
    'Official festivals',
    'Tourist attractions',
    'Travel advisories'
  ],
  updateFrequency: 'Monthly',
  notes: '🇮🇳 Official Government of India tourism portal - Highest credibility'
};

/**
 * Central Government Tourism
 */
export const GOVT_TOURISM: DataSource = {
  id: 'govt_tourism',
  name: 'Ministry of Tourism',
  type: DataSourceType.GOVERNMENT_TOURISM,
  trust: DataSourceTrust.HIGH,
  url: 'https://tourism.gov.in',
  coverage: ['India'],
  dataProvides: [
    'Tourism statistics',
    'State tourism links',
    'Travel guidelines',
    'Safety information'
  ],
  updateFrequency: 'Monthly',
  notes: 'Central government tourism ministry'
};

// ===========================
// 2️⃣ STATE TOURISM PORTALS
// ===========================

/**
 * State-specific tourism boards (High Trust)
 */
export const STATE_TOURISM_PORTALS: Record<string, DataSource> = {
  
  rajasthan: {
    id: 'rajasthan_tourism',
    name: 'Rajasthan Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.tourism.rajasthan.gov.in',
    coverage: ['Rajasthan'],
    dataProvides: [
      'Best months to visit',
      'Festival calendar',
      'Heritage sites',
      'Desert safaris',
      'Palace hotels',
      'Cultural events'
    ],
    updateFrequency: 'Weekly',
    notes: '🏰 Best for: Jaipur, Udaipur, Jodhpur, Jaisalmer'
  },

  kerala: {
    id: 'kerala_tourism',
    name: 'Kerala Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.keralatourism.org',
    coverage: ['Kerala'],
    dataProvides: [
      'Backwater seasons',
      'Monsoon tourism',
      'Ayurveda centers',
      'Beach safety',
      'Wildlife sanctuaries',
      'Houseboat availability'
    ],
    updateFrequency: 'Weekly',
    notes: '🌴 Best for: Munnar, Alleppey, Kochi, Wayanad, Varkala'
  },

  himachal: {
    id: 'himachal_tourism',
    name: 'Himachal Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://himachaltourism.gov.in',
    coverage: ['Himachal Pradesh'],
    dataProvides: [
      'Snow conditions',
      'Road closures',
      'Trekking seasons',
      'Ski resort status',
      'Weather alerts',
      'Mountain passes'
    ],
    updateFrequency: 'Daily (winter)',
    notes: '🏔️ Best for: Manali, Shimla, Dharamshala, Kullu'
  },

  goa: {
    id: 'goa_tourism',
    name: 'Goa Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.goatourism.gov.in',
    coverage: ['Goa'],
    dataProvides: [
      'Beach seasons',
      'Monsoon closures',
      'Festival dates',
      'Water sports safety',
      'Nightlife regulations',
      'COVID protocols'
    ],
    updateFrequency: 'Weekly',
    notes: '🏖️ Best for: Goa beaches, parties, water sports'
  },

  gujarat: {
    id: 'gujarat_tourism',
    name: 'Gujarat Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.gujarattourism.com',
    coverage: ['Gujarat'],
    dataProvides: [
      'Rann Utsav dates',
      'Lion safari seasons',
      'Festival calendar',
      'Heritage trails',
      'Beach resorts'
    ],
    updateFrequency: 'Weekly',
    notes: '🦁 Best for: Gir National Park, Rann of Kutch, Dwarka'
  },

  maharashtra: {
    id: 'maharashtra_tourism',
    name: 'Maharashtra Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.maharashtratourism.gov.in',
    coverage: ['Maharashtra'],
    dataProvides: [
      'Monsoon destinations',
      'Hill station seasons',
      'Beach safety',
      'Heritage sites',
      'Wildlife sanctuaries'
    ],
    updateFrequency: 'Weekly',
    notes: '🌧️ Best for: Mumbai, Pune, Lonavala, Mahabaleshwar'
  },

  karnataka: {
    id: 'karnataka_tourism',
    name: 'Karnataka Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://karnatakatourism.org',
    coverage: ['Karnataka'],
    dataProvides: [
      'Coffee estate tours',
      'Beach seasons',
      'Heritage circuits',
      'Wildlife safaris',
      'Yoga retreats'
    ],
    updateFrequency: 'Weekly',
    notes: '☕ Best for: Coorg, Hampi, Gokarna, Bangalore'
  },

  tamil_nadu: {
    id: 'tamil_nadu_tourism',
    name: 'Tamil Nadu Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.tamilnadutourism.tn.gov.in',
    coverage: ['Tamil Nadu'],
    dataProvides: [
      'Temple festivals',
      'Hill station climate',
      'Beach conditions',
      'Cultural events',
      'Heritage walks'
    ],
    updateFrequency: 'Weekly',
    notes: '🛕 Best for: Ooty, Kodaikanal, Mahabalipuram'
  },

  west_bengal: {
    id: 'west_bengal_tourism',
    name: 'West Bengal Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://wbtourism.gov.in',
    coverage: ['West Bengal'],
    dataProvides: [
      'Darjeeling tea seasons',
      'Monsoon warnings',
      'Tiger reserve bookings',
      'Cultural festivals',
      'Heritage sites'
    ],
    updateFrequency: 'Weekly',
    notes: '🍵 Best for: Darjeeling, Sundarbans, Kolkata'
  },

  uttarakhand: {
    id: 'uttarakhand_tourism',
    name: 'Uttarakhand Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://uttarakhandtourism.gov.in',
    coverage: ['Uttarakhand'],
    dataProvides: [
      'Char Dham yatra dates',
      'Pilgrimage seasons',
      'River rafting safety',
      'Trekking permits',
      'Weather alerts'
    ],
    updateFrequency: 'Daily (summer)',
    notes: '🙏 Best for: Rishikesh, Haridwar, Nainital, Mussoorie'
  },

  sikkim: {
    id: 'sikkim_tourism',
    name: 'Sikkim Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.sikkimtourism.gov.in',
    coverage: ['Sikkim'],
    dataProvides: [
      'Permit requirements',
      'Road conditions',
      'Monastery festivals',
      'Trekking seasons',
      'Snow forecasts'
    ],
    updateFrequency: 'Daily',
    notes: '🏔️ Best for: Gangtok, Pelling, Yumthang Valley'
  },

  andaman: {
    id: 'andaman_tourism',
    name: 'Andaman Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://www.andamantourism.gov.in',
    coverage: ['Andaman and Nicobar'],
    dataProvides: [
      'Island ferry schedules',
      'Diving seasons',
      'Monsoon closures',
      'Beach safety',
      'Restricted areas'
    ],
    updateFrequency: 'Daily',
    notes: '🏝️ Best for: Havelock, Neil Island, Port Blair'
  },

  ladakh: {
    id: 'ladakh_tourism',
    name: 'Ladakh Tourism',
    type: DataSourceType.STATE_TOURISM,
    trust: DataSourceTrust.HIGH,
    url: 'https://ladakhtourism.gov.in',
    coverage: ['Ladakh'],
    dataProvides: [
      'Road opening dates',
      'High altitude warnings',
      'Festival calendar',
      'Permit requirements',
      'Oxygen availability'
    ],
    updateFrequency: 'Daily (summer)',
    notes: '❄️ Best for: Leh, Nubra Valley, Pangong Lake'
  }
};

// ===========================
// 3️⃣ CLIMATE & WEATHER SOURCES
// ===========================

/**
 * Wikipedia Climate Tables (Historical Data)
 */
export const WIKIPEDIA_CLIMATE: DataSource = {
  id: 'wikipedia_climate',
  name: 'Wikipedia Climate Data',
  type: DataSourceType.CLIMATE_HISTORICAL,
  trust: DataSourceTrust.MEDIUM,
  url: 'https://en.wikipedia.org',
  coverage: ['Global'],
  dataProvides: [
    'Monthly temperature averages',
    'Rainfall patterns',
    'Humidity levels',
    'Historical climate data',
    'Sunshine hours'
  ],
  updateFrequency: 'Yearly',
  notes: '🌦️ Surprisingly reliable for historical climate averages. Search pattern: "Climate of [City] site:wikipedia.org"'
};

/**
 * India Meteorological Department (Future Integration)
 */
export const IMD_WEATHER: DataSource = {
  id: 'imd_weather',
  name: 'India Meteorological Department',
  type: DataSourceType.CLIMATE_HISTORICAL,
  trust: DataSourceTrust.HIGH,
  url: 'https://mausam.imd.gov.in',
  coverage: ['India'],
  dataProvides: [
    'Real-time weather',
    'Forecasts (7-day)',
    'Severe weather alerts',
    'Monsoon tracking',
    'Historical data API'
  ],
  updateFrequency: 'Hourly',
  notes: '🇮🇳 Official weather source - Future integration for real-time data'
};

// ===========================
// 4️⃣ MARKET & PRICING SOURCES
// ===========================

/**
 * Agoda City Pages (Already Integrated)
 */
export const AGODA_MARKET_DATA: DataSource = {
  id: 'agoda_market',
  name: 'Agoda City Pages',
  type: DataSourceType.MARKET_PRICING,
  trust: DataSourceTrust.MEDIUM,
  url: 'https://www.agoda.com',
  coverage: ['Global'],
  dataProvides: [
    'Hotel price bands',
    'Accommodation density',
    'Destination popularity',
    'Real-time availability',
    'Budget classification'
  ],
  updateFrequency: 'Real-time',
  notes: '💰 Already integrated via affiliate links. Use for budget classification (budget/moderate/premium)'
};

/**
 * NomadList (Reference Only)
 */
export const NOMAD_LIST: DataSource = {
  id: 'nomad_list',
  name: 'NomadList',
  type: DataSourceType.MARKET_PRICING,
  trust: DataSourceTrust.MEDIUM,
  url: 'https://nomadlist.com',
  coverage: ['Global'],
  dataProvides: [
    'Cost of living',
    'Digital nomad insights',
    'Weather ratings',
    'Safety scores',
    'Internet quality'
  ],
  updateFrequency: 'Weekly',
  notes: '💻 Reference for budget and lifestyle data'
};

// ===========================
// 5️⃣ CROWD & SEASONALITY LOGIC
// ===========================

/**
 * School Holiday Calendar (India)
 */
export const INDIAN_SCHOOL_HOLIDAYS = {
  summer: {
    months: [4, 5, 6],
    impact: 'high',
    note: 'Peak family travel season - Hill stations crowded'
  },
  winter: {
    months: [12, 1],
    impact: 'high',
    note: 'Christmas-New Year rush - All destinations crowded'
  },
  diwali: {
    months: [10, 11],  // Variable
    impact: 'very_high',
    note: 'Diwali week - Highest domestic travel'
  },
  holi: {
    months: [3],  // Variable
    impact: 'high',
    note: 'Holi celebrations - Rajasthan, UP crowded'
  }
};

/**
 * Festival Calendar Impact
 */
export const FESTIVAL_CROWD_IMPACT = {
  diwali: {
    affectedStates: ['All'],
    crowdMultiplier: 2.5,
    priceIncrease: '50-100%',
    note: 'Biggest festival - Book 3 months advance'
  },
  holi: {
    affectedStates: ['Rajasthan', 'UP', 'Punjab'],
    crowdMultiplier: 2.0,
    priceIncrease: '30-50%',
    note: 'Color festival - Rajasthan extremely crowded'
  },
  durga_puja: {
    affectedStates: ['West Bengal', 'Odisha'],
    crowdMultiplier: 2.0,
    priceIncrease: '40-60%',
    note: 'Kolkata inaccessible during Pujo'
  },
  onam: {
    affectedStates: ['Kerala'],
    crowdMultiplier: 1.8,
    priceIncrease: '30-40%',
    note: 'Kerala festival season'
  },
  ganesh_chaturthi: {
    affectedStates: ['Maharashtra'],
    crowdMultiplier: 1.8,
    priceIncrease: '25-35%',
    note: 'Mumbai, Pune very crowded'
  }
};

/**
 * Long Weekend Impact
 */
export const LONG_WEEKEND_LOGIC = {
  threshold: 3,  // 3+ day weekends
  crowdIncrease: 'moderate',
  bookingWindow: '1-2 weeks advance',
  affectedDestinations: [
    'Weekend getaways within 300km of metros',
    'Hill stations near Delhi, Mumbai, Bangalore',
    'Beach resorts (Goa, Gokarna, Pondicherry)'
  ],
  note: 'Check government holiday calendar for long weekends'
};

// ===========================
// 6️⃣ EDITORIAL TAGS (TRIPSAVER IP)
// ===========================

/**
 * Experience-based categorization
 * This is TripSaver's competitive advantage
 */
export interface ExperienceTag {
  id: string;
  name: string;
  description: string;
  applicableTo: string[];  // Destination IDs
  confidence: 'high' | 'medium' | 'low';
  source: 'editorial' | 'user_feedback' | 'algorithmic';
}

export const EXPERIENCE_TAGS: Record<string, ExperienceTag> = {
  
  family_friendly: {
    id: 'family_friendly',
    name: 'Family-Friendly',
    description: 'Safe, kid-friendly activities, family hotels available',
    applicableTo: [
      'goa', 'ooty', 'shimla', 'manali', 'pondicherry', 'munnar',
      'jaipur', 'udaipur', 'andaman', 'coorg', 'lonavala'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  couples_paradise: {
    id: 'couples_paradise',
    name: 'Perfect for Couples',
    description: 'Romantic settings, privacy, couple activities',
    applicableTo: [
      'udaipur', 'munnar', 'goa', 'andaman', 'shimla', 'manali',
      'alleppey', 'pondicherry', 'coorg', 'gokarna', 'varkala'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  party_destination: {
    id: 'party_destination',
    name: 'Party Vibe',
    description: 'Nightlife, bars, beach parties, young crowd',
    applicableTo: [
      'goa', 'pondicherry', 'varkala', 'gokarna', 'mumbai',
      'bangalore', 'delhi'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  spiritual_journey: {
    id: 'spiritual_journey',
    name: 'Spiritual Experience',
    description: 'Temples, ashrams, meditation, peace',
    applicableTo: [
      'varanasi', 'rishikesh', 'haridwar', 'amritsar', 'bodh_gaya',
      'tirupati', 'madurai', 'puri', 'ujjain'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  adventure_hub: {
    id: 'adventure_hub',
    name: 'Adventure Activities',
    description: 'Trekking, rafting, paragliding, camping',
    applicableTo: [
      'rishikesh', 'manali', 'leh', 'darjeeling', 'gangtok',
      'bir_billing', 'spiti', 'coorg'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  solo_friendly: {
    id: 'solo_friendly',
    name: 'Great for Solo Travel',
    description: 'Safe, social hostels, solo-friendly activities',
    applicableTo: [
      'goa', 'rishikesh', 'mcleodganj', 'hampi', 'varkala',
      'pondicherry', 'bir', 'gokarna', 'kasol'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  luxury_escape: {
    id: 'luxury_escape',
    name: 'Luxury Experience',
    description: 'Premium hotels, fine dining, exclusive experiences',
    applicableTo: [
      'udaipur', 'jaipur', 'goa', 'andaman', 'coorg',
      'shimla', 'munnar', 'leh', 'jodhpur'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  budget_backpacker: {
    id: 'budget_backpacker',
    name: 'Budget-Friendly',
    description: 'Cheap accommodation, food, transport',
    applicableTo: [
      'hampi', 'gokarna', 'varkala', 'rishikesh', 'varanasi',
      'mcleodganj', 'kasol', 'bir', 'pushkar'
    ],
    confidence: 'high',
    source: 'editorial'
  },

  offbeat_hidden: {
    id: 'offbeat_hidden',
    name: 'Offbeat Gem',
    description: 'Less crowded, unexplored, unique',
    applicableTo: [
      'spiti', 'zanskar', 'tawang', 'majuli', 'dhanushkodi',
      'gokarna', 'bir', 'ziro', 'mawlynnong'
    ],
    confidence: 'medium',
    source: 'editorial'
  },

  digital_nomad: {
    id: 'digital_nomad',
    name: 'Digital Nomad Friendly',
    description: 'Good wifi, coworking spaces, long-stay options',
    applicableTo: [
      'goa', 'rishikesh', 'mcleodganj', 'coorg', 'pondicherry',
      'bir', 'varkala', 'kasol', 'gokarna'
    ],
    confidence: 'medium',
    source: 'editorial'
  }
};

// ===========================
// DATA SOURCE REGISTRY
// ===========================

/**
 * Complete registry of all data sources
 */
export const DATA_SOURCE_REGISTRY = {
  government: {
    national: [INCREDIBLE_INDIA, GOVT_TOURISM],
    states: Object.values(STATE_TOURISM_PORTALS)
  },
  climate: [WIKIPEDIA_CLIMATE, IMD_WEATHER],
  market: [AGODA_MARKET_DATA, NOMAD_LIST],
  editorial: {
    holidays: INDIAN_SCHOOL_HOLIDAYS,
    festivals: FESTIVAL_CROWD_IMPACT,
    weekends: LONG_WEEKEND_LOGIC,
    experiences: EXPERIENCE_TAGS
  }
};

// ===========================
// HELPER FUNCTIONS
// ===========================

/**
 * Get tourism portal for a state
 */
export function getStateTourismPortal(state: string): DataSource | null {
  const stateKey = state.toLowerCase().replace(/\s+/g, '_');
  return STATE_TOURISM_PORTALS[stateKey] || null;
}

/**
 * Get all high-trust sources
 */
export function getHighTrustSources(): DataSource[] {
  return [
    INCREDIBLE_INDIA,
    GOVT_TOURISM,
    ...Object.values(STATE_TOURISM_PORTALS)
  ].filter(source => source.trust === DataSourceTrust.HIGH);
}

/**
 * Get data sources for specific destination
 */
export function getDestinationSources(state: string): DataSource[] {
  const sources: DataSource[] = [INCREDIBLE_INDIA];
  
  const statePortal = getStateTourismPortal(state);
  if (statePortal) {
    sources.push(statePortal);
  }
  
  sources.push(WIKIPEDIA_CLIMATE, AGODA_MARKET_DATA);
  
  return sources;
}

/**
 * Get experience tags for destination
 */
export function getExperienceTags(destinationId: string): ExperienceTag[] {
  return Object.values(EXPERIENCE_TAGS).filter(tag => 
    tag.applicableTo.includes(destinationId)
  );
}

/**
 * Check if month has festival impact
 */
export function getFestivalImpact(month: number, state?: string): any[] {
  const impacts: any[] = [];
  
  Object.entries(FESTIVAL_CROWD_IMPACT).forEach(([festival, data]) => {
    if (!state || data.affectedStates.includes('All') || data.affectedStates.includes(state)) {
      impacts.push({ festival, ...data });
    }
  });
  
  return impacts;
}

/**
 * Check if month is school holiday
 */
export function isSchoolHoliday(month: number): boolean {
  return Object.values(INDIAN_SCHOOL_HOLIDAYS).some(holiday => 
    holiday.months.includes(month)
  );
}

/**
 * Generate data source citation
 */
export function generateCitation(source: DataSource): string {
  return `Data source: ${source.name} (${source.trust} trust) - ${source.url}`;
}

/**
 * Get all editorial tags
 */
export function getAllExperienceTags(): ExperienceTag[] {
  return Object.values(EXPERIENCE_TAGS);
}

// ===========================
// EXPORT ALL
// ===========================

export default {
  sources: {
    government: [INCREDIBLE_INDIA, GOVT_TOURISM],
    states: STATE_TOURISM_PORTALS,
    climate: [WIKIPEDIA_CLIMATE, IMD_WEATHER],
    market: [AGODA_MARKET_DATA, NOMAD_LIST]
  },
  logic: {
    holidays: INDIAN_SCHOOL_HOLIDAYS,
    festivals: FESTIVAL_CROWD_IMPACT,
    weekends: LONG_WEEKEND_LOGIC
  },
  editorial: EXPERIENCE_TAGS,
  helpers: {
    getStateTourismPortal,
    getHighTrustSources,
    getDestinationSources,
    getExperienceTags,
    getFestivalImpact,
    isSchoolHoliday,
    generateCitation,
    getAllExperienceTags
  }
};
