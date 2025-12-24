/**
 * ✅ Destination → Categories Mapping (Partner-Agnostic)
 * Maps destination types to generic product categories
 * Partner-specific URLs are generated dynamically via AffiliateLinkBuilderService
 * This makes it easy to add new partners without changing this file
 */

export interface ProductCategory {
  name: string;
  icon: string;
  searchQuery: string; // Generic search term, partner-agnostic
  aliases?: string[]; // Alternative search terms
}

export type DestinationType = 'beach' | 'hill' | 'urban' | 'desert' | 'default';

/**
 * Destination-specific product categories
 * These are partner-agnostic and contain search queries only
 * Actual affiliate URLs are built dynamically based on selected partner
 */
export const DESTINATION_CATEGORIES: Record<DestinationType, ProductCategory[]> = {
  beach: [
    {
      name: 'Beachwear & Sunscreen',
      icon: '🏖️',
      searchQuery: 'beachwear sunscreen SPF',
      aliases: ['beach wear', 'sun protection', 'swimwear'],
    },
    {
      name: 'Travel Backpack',
      icon: '🎒',
      searchQuery: 'travel backpack waterproof',
      aliases: ['hiking backpack', 'rucksack', 'daypack'],
    },
    {
      name: 'Power Bank',
      icon: '🔋',
      searchQuery: 'power bank travel 20000mah',
      aliases: ['portable charger', 'external battery', 'power bank'],
    },
    {
      name: 'Flip Flops / Sandals',
      icon: '👟',
      searchQuery: 'flip flops sandals men women',
      aliases: ['beach flip flops', 'casual sandals', 'slippers'],
    },
    {
      name: 'Travel Accessories',
      icon: '🧳',
      searchQuery: 'travel accessories packing organizer',
      aliases: ['packing cubes', 'travel organizer', 'luggage accessories'],
    },
  ],

  hill: [
    {
      name: 'Winter Jackets',
      icon: '🧥',
      searchQuery: 'winter jacket thermal insulated',
      aliases: ['fleece jacket', 'hiking jacket', 'puffer jacket'],
    },
    {
      name: 'Trekking Shoes',
      icon: '🥾',
      searchQuery: 'trekking shoes hiking boots waterproof',
      aliases: ['hiking boots', 'mountain boots', 'trail shoes'],
    },
    {
      name: 'Travel Backpack',
      icon: '🎒',
      searchQuery: 'travel backpack hiking 40L',
      aliases: ['hiking backpack', 'trekking bag', 'mountain pack'],
    },
    {
      name: 'Thermal Wear',
      icon: '👕',
      searchQuery: 'thermal wear base layer men women',
      aliases: ['base layer', 'thermal clothing', 'long underwear'],
    },
    {
      name: 'Wool Socks',
      icon: '🧦',
      searchQuery: 'wool socks hiking thermal',
      aliases: ['thermal socks', 'merino wool socks', 'hiking socks'],
    },
  ],

  urban: [
    {
      name: 'City Backpack',
      icon: '🎒',
      searchQuery: 'city backpack urban laptop',
      aliases: ['laptop backpack', 'urban backpack', 'daily backpack'],
    },
    {
      name: 'Power Bank',
      icon: '🔋',
      searchQuery: 'power bank portable charger',
      aliases: ['portable charger', 'power bank', 'phone charger'],
    },
    {
      name: 'Travel Shoes',
      icon: '👟',
      searchQuery: 'comfortable travel shoes sneakers',
      aliases: ['walking shoes', 'casual sneakers', 'travel shoes'],
    },
    {
      name: 'Camera/Phone Stabilizer',
      icon: '📷',
      searchQuery: 'phone stabilizer gimbal tripod',
      aliases: ['phone tripod', 'camera stabilizer', 'gimbal'],
    },
    {
      name: 'Travel Wallet',
      icon: '👜',
      searchQuery: 'travel wallet RFID blocking',
      aliases: ['RFID wallet', 'passport wallet', 'money organizer'],
    },
  ],

  desert: [
    {
      name: 'High SPF Sunscreen',
      icon: '🧴',
      searchQuery: 'sunscreen SPF 50 high protection',
      aliases: ['sunscreen lotion', 'UV protection', 'sun cream'],
    },
    {
      name: 'Wide Brim Hat',
      icon: '🎩',
      searchQuery: 'wide brim hat sun protection',
      aliases: ['sun hat', 'bucket hat', 'wide hat'],
    },
    {
      name: 'Desert Boots',
      icon: '🥾',
      searchQuery: 'desert boots sand resistant',
      aliases: ['boots', 'sand boots', 'ankle boots'],
    },
    {
      name: 'Cooling Towel',
      icon: '🧴',
      searchQuery: 'cooling towel microfiber evaporative',
      aliases: ['cooling towel', 'sports towel', 'quick dry towel'],
    },
    {
      name: 'Water Bottle (Insulated)',
      icon: '🧊',
      searchQuery: 'insulated water bottle thermos',
      aliases: ['thermos bottle', 'insulated bottle', 'water flask'],
    },
  ],

  // Default for unknown types
  default: [
    {
      name: 'Travel Backpack',
      icon: '🎒',
      searchQuery: 'travel backpack waterproof',
      aliases: ['hiking backpack', 'rucksack'],
    },
    {
      name: 'Power Bank',
      icon: '🔋',
      searchQuery: 'power bank portable charger',
      aliases: ['portable charger', 'power bank'],
    },
    {
      name: 'Travel Accessories',
      icon: '🧳',
      searchQuery: 'travel accessories packing',
      aliases: ['packing cubes', 'organizer'],
    },
    {
      name: 'Comfortable Footwear',
      icon: '👟',
      searchQuery: 'comfortable travel shoes',
      aliases: ['walking shoes', 'sneakers'],
    },
    {
      name: 'Travel Document Organizer',
      icon: '📋',
      searchQuery: 'travel document organizer passport',
      aliases: ['passport holder', 'document holder'],
    },
  ],
};

/**
 * Get product categories for a destination type
 * Returns partner-agnostic categories with search queries
 * Actual affiliate URLs should be built using AffiliateLinkBuilderService
 * @param type Destination type (beach, hill, urban, desert, etc)
 * @returns Array of product categories
 */
export function getDestinationCategories(type?: string): ProductCategory[] {
  const destType = (type?.toLowerCase() as DestinationType) || 'default';
  return DESTINATION_CATEGORIES[destType] || DESTINATION_CATEGORIES.default;
}

/**
 * Get all destination types
 * Useful for configuration, management dashboards
 */
export function getAllDestinationTypes(): DestinationType[] {
  return Object.keys(DESTINATION_CATEGORIES) as DestinationType[];
}
