/**
 * DESTINATIONS DATA
 * ==================
 * 
 * Static data for Indian destinations
 */

export type DestinationCategory = 
  | 'Beach' | 'Mountain' | 'Hill' | 'Heritage' | 'Spiritual'
  | 'Adventure' | 'Nature' | 'Wildlife' | 'City' | 'Coastal'
  | 'Backwaters' | 'Party' | 'Romantic' | 'Snow' | 'Ski'
  | 'Colonial' | 'Island' | 'Culture';

export type ClimateType = 
  | 'tropical' | 'cold' | 'hot' | 'moderate' | 'humid'
  | 'cool' | 'extreme' | 'cold_desert';

export type BudgetType = 'budget' | 'moderate' | 'premium';

export interface Destination {
  state: string;
  categories: DestinationCategory[];
  bestMonths: number[];
  avoidMonths: number[];
  climate: ClimateType;
  budget: BudgetType;
  agoda: string;
}

export const DESTINATIONS_DATA: Record<string, Destination> = {
  'goa': {
    state: 'Goa',
    categories: ['Beach', 'Party'],
    bestMonths: [11, 12, 1, 2],
    avoidMonths: [6, 7, 8],
    climate: 'tropical',
    budget: 'moderate',
    agoda: 'goa-in'
  },
  'manali': {
    state: 'Himachal Pradesh',
    categories: ['Mountain', 'Snow'],
    bestMonths: [3, 4, 5, 10],
    avoidMonths: [7, 8],
    climate: 'cold',
    budget: 'budget',
    agoda: 'manali-in'
  },
  'jaipur': {
    state: 'Rajasthan',
    categories: ['Heritage'],
    bestMonths: [10, 11, 12, 1, 2],
    avoidMonths: [5, 6],
    climate: 'hot',
    budget: 'budget',
    agoda: 'jaipur-in'
  }
};
