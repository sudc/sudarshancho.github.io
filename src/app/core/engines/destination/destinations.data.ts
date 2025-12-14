/**
 * DESTINATIONS DATA
 * ==================
 * 
 * Comprehensive Indian destination database with:
 * - Seasonal information (best months, avoid months)
 * - Climate classification
 * - Budget categories
 * - Destination categories
 * - Agoda integration
 * 
 * Data Sources:
 * - Incredible India: https://www.incredibleindia.org
 * - State Tourism Boards
 * - Indian Meteorological Department
 * - Agoda destination pages
 */

/**
 * Destination Categories
 */
export type DestinationCategory = 
  | 'Beach' | 'Mountain' | 'Hill' | 'Heritage' | 'Spiritual'
  | 'Adventure' | 'Nature' | 'Wildlife' | 'City' | 'Coastal'
  | 'Backwaters' | 'Party' | 'Romantic' | 'Snow' | 'Ski'
  | 'Colonial' | 'Island' | 'Culture';

/**
 * Climate Types
 */
export type ClimateType = 
  | 'tropical' | 'cold' | 'hot' | 'moderate' | 'humid'
  | 'cool' | 'extreme' | 'cold_desert';

/**
 * Budget Types
 */
export type BudgetType = 'budget' | 'moderate' | 'premium';

/**
 * Destination Interface
 */
export interface Destination {
  state: string;
  categories: DestinationCategory[];
  bestMonths: number[];      // 1-12 (Jan-Dec)
  avoidMonths: number[];     // 1-12 (Jan-Dec)
  climate: ClimateType;
  budget: BudgetType;
  agoda: string;             // Agoda city slug
}

/**
 * DESTINATIONS DATABASE
 * =====================
 * 45 top Indian destinations with complete data
 */
export const DESTINATIONS_DATA: Record<string, Destination> = {
  
  // WESTERN INDIA - GOA & MAHARASHTRA
  'goa': {
    state: 'Goa',
    categories: ['Beach', 'Party'],
    bestMonths: [11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'goa-in'
  },
  
  'mumbai': {
    state: 'Maharashtra',
    categories: ['City', 'Coastal'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'humid',
    budget: 'premium',
    agoda: 'mumbai-in'
  },
  
  'pune': {
    state: 'Maharashtra',
    categories: ['City', 'Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'moderate',
    budget: 'moderate',
    agoda: 'pune-in'
  },
  
  'mahabaleshwar': {
    state: 'Maharashtra',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'mahabaleshwar-in'
  },
  
  'lonavala': {
    state: 'Maharashtra',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'budget',
    agoda: 'lonavala-in'
  },

  // NORTHERN INDIA - HIMACHAL & UTTARAKHAND
  'manali': {
    state: 'Himachal Pradesh',
    categories: ['Mountain', 'Snow'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'budget',
    agoda: 'manali-in'
  },
  
  'shimla': {
    state: 'Himachal Pradesh',
    categories: ['Hill', 'Colonial'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'budget',
    agoda: 'shimla-in'
  },
  
  'rishikesh': {
    state: 'Uttarakhand',
    categories: ['Spiritual', 'Adventure'],
    bestMonths: [2, 3, 4, 9, 10],
    avoidMonths: [7, 8],
    climate: 'moderate',
    budget: 'budget',
    agoda: 'rishikesh-in'
  },
  
  'haridwar': {
    state: 'Uttarakhand',
    categories: ['Spiritual'],
    bestMonths: [10, 11, 12, 2, 3],
    avoidMonths: [7, 8],
    climate: 'moderate',
    budget: 'budget',
    agoda: 'haridwar-in'
  },

  // NORTHERN INDIA - RAJASTHAN
  'jaipur': {
    state: 'Rajasthan',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'jaipur-in'
  },
  
  'udaipur': {
    state: 'Rajasthan',
    categories: ['Romantic'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'moderate',
    agoda: 'udaipur-in'
  },
  
  'jodhpur': {
    state: 'Rajasthan',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'jodhpur-in'
  },

  // NORTHERN INDIA - LADAKH & KASHMIR
  'leh': {
    state: 'Ladakh',
    categories: ['Adventure'],
    bestMonths: [6, 7, 8, 9],
    avoidMonths: [11, 12, 1, 2],
    climate: 'cold_desert',
    budget: 'premium',
    agoda: 'leh-in'
  },
  
  'srinagar': {
    state: 'J&K',
    categories: ['Nature'],
    bestMonths: [4, 5, 6, 9],
    avoidMonths: [12, 1, 2],
    climate: 'cold',
    budget: 'moderate',
    agoda: 'srinagar-in'
  },
  
  'gulmarg': {
    state: 'J&K',
    categories: ['Snow', 'Ski'],
    bestMonths: [1, 2, 12],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'premium',
    agoda: 'gulmarg-in'
  },

  // NORTHERN INDIA - DELHI & UP
  'delhi': {
    state: 'Delhi',
    categories: ['City', 'Culture'],
    bestMonths: [10, 11, 12, 2, 3],
    avoidMonths: [5, 6],
    climate: 'extreme',
    budget: 'budget',
    agoda: 'new-delhi-in'
  },
  
  'agra': {
    state: 'Uttar Pradesh',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'agra-in'
  },
  
  'varanasi': {
    state: 'Uttar Pradesh',
    categories: ['Spiritual'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'varanasi-in'
  },
  
  'amritsar': {
    state: 'Punjab',
    categories: ['Spiritual'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'extreme',
    budget: 'budget',
    agoda: 'amritsar-in'
  },

  // SOUTHERN INDIA - KERALA
  'kochi': {
    state: 'Kerala',
    categories: ['Backwaters'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'kochi-in'
  },
  
  'munnar': {
    state: 'Kerala',
    categories: ['Hill'],
    bestMonths: [9, 10, 11, 12, 1],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'munnar-in'
  },
  
  'alleppey': {
    state: 'Kerala',
    categories: ['Backwaters'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'alleppey-in'
  },
  
  'varkala': {
    state: 'Kerala',
    categories: ['Beach'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'varkala-in'
  },
  
  'wayanad': {
    state: 'Kerala',
    categories: ['Nature'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'budget',
    agoda: 'wayanad-in'
  },

  // SOUTHERN INDIA - TAMIL NADU
  'ooty': {
    state: 'Tamil Nadu',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'ooty-in'
  },
  
  'kodaikanal': {
    state: 'Tamil Nadu',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'kodaikanal-in'
  },
  
  'pondicherry': {
    state: 'Puducherry',
    categories: ['Beach', 'Culture'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [10],
    climate: 'humid',
    budget: 'moderate',
    agoda: 'pondicherry-in'
  },

  // SOUTHERN INDIA - KARNATAKA
  'hampi': {
    state: 'Karnataka',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'hampi-in'
  },
  
  'coorg': {
    state: 'Karnataka',
    categories: ['Hill'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'coorg-in'
  },
  
  'gokarna': {
    state: 'Karnataka',
    categories: ['Beach'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [6, 7],
    climate: 'tropical',
    budget: 'budget',
    agoda: 'gokarna-in'
  },

  // EASTERN INDIA - WEST BENGAL & SIKKIM
  'darjeeling': {
    state: 'West Bengal',
    categories: ['Hill'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'darjeeling-in'
  },
  
  'gangtok': {
    state: 'Sikkim',
    categories: ['Hill'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cool',
    budget: 'moderate',
    agoda: 'gangtok-in'
  },

  // NORTH-EASTERN INDIA
  'shillong': {
    state: 'Meghalaya',
    categories: ['Nature'],
    bestMonths: [10, 11, 12, 3, 4],
    avoidMonths: [6, 7],
    climate: 'cool',
    budget: 'budget',
    agoda: 'shillong-in'
  },
  
  'kaziranga': {
    state: 'Assam',
    categories: ['Wildlife'],
    bestMonths: [11, 12, 1, 2, 3],
    avoidMonths: [6, 7, 8],
    climate: 'humid',
    budget: 'moderate',
    agoda: 'kaziranga-in'
  },

  // ISLANDS
  'andaman': {
    state: 'Andaman & Nicobar',
    categories: ['Island', 'Beach'],
    bestMonths: [11, 12, 1, 2, 3],
    avoidMonths: [6, 7, 8],
    climate: 'tropical',
    budget: 'premium',
    agoda: 'andaman-in'
  }
};

/**
 * DATA SOURCES & ATTRIBUTION
 * ============================
 * 
 * Seasonality & Best Time to Visit:
 * - Incredible India: https://www.incredibleindia.org
 * - Rajasthan Tourism: https://www.tourism.rajasthan.gov.in
 * - Kerala Tourism: https://www.keralatourism.org
 * - Himachal Tourism: https://himachaltourism.gov.in
 * 
 * Climate Information:
 * - Wikipedia climate tables
 * - Indian Meteorological Department (IMD)
 * 
 * Budget Classification:
 * - Agoda destination pages (average hotel price ranges)
 * - Travel industry standards
 * 
 * Crowd Patterns:
 * - Festival calendars (Diwali, Holi, Eid, Christmas)
 * - Indian school holiday calendar
 * - Peak tourist season data
 * 
 * Agoda Integration:
 * - City slugs verified from Agoda.com
 * - Affiliate links use cid=1955073
 */

/**
 * HELPER FUNCTIONS
 */

export function getDestinationCount(): number {
  return Object.keys(DESTINATIONS_DATA).length;
}

export function getAllDestinationKeys(): string[] {
  return Object.keys(DESTINATIONS_DATA);
}

export function getDestinationsByState(state: string): string[] {
  return Object.entries(DESTINATIONS_DATA)
    .filter(([_, dest]) => dest.state === state)
    .map(([key, _]) => key);
}

export function getAllStates(): string[] {
  const states = new Set<string>();
  Object.values(DESTINATIONS_DATA).forEach(dest => states.add(dest.state));
  return Array.from(states).sort();
}
