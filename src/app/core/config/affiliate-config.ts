/**
 * ✅ Affiliate Configuration
 * Centralized configuration for all affiliate partners
 * Easy to update affiliate IDs and partner details without code changes
 */

export interface AffiliatePartnerConfig {
  id: string;
  name: string;
  logo: string;
  baseUrl: string;
  affiliateId: string;
  commission?: number;
  active: boolean;
  description?: string;
  type: 'hotel' | 'shopping' | 'both'; // hotel = Agoda, shopping = Amazon, both = supports both
}

/**
 * Affiliate Partners Configuration
 * All affiliate IDs and URLs are managed here
 */
export const AFFILIATE_CONFIG: Record<string, AffiliatePartnerConfig> = {
  agoda: {
    id: 'agoda',
    name: 'Agoda',
    logo: '🏨',
    baseUrl: 'https://www.agoda.com',
    affiliateId: '1955073', // Agoda CID
    commission: 12,
    active: true,
    description: 'Best hotel deals in Asia',
    type: 'hotel'
  },

  amazon: {
    id: 'amazon',
    name: 'Amazon',
    logo: '🛍️',
    baseUrl: 'https://www.amazon.in',
    affiliateId: 'tripsaver21-21', // Amazon Store ID
    commission: 5,
    active: true,
    description: 'Travel essentials and gear',
    type: 'shopping'
  },

  booking: {
    id: 'booking',
    name: 'Booking.com',
    logo: '🏩',
    baseUrl: 'https://www.booking.com',
    affiliateId: 'YOUR_BOOKING_AFFILIATE_ID',
    commission: 10,
    active: false,
    description: 'Global hotel network',
    type: 'hotel'
  },

  expedia: {
    id: 'expedia',
    name: 'Expedia',
    logo: '✈️',
    baseUrl: 'https://www.expedia.co.in',
    affiliateId: 'YOUR_EXPEDIA_AFFILIATE_ID',
    commission: 8,
    active: false,
    description: 'Flights, hotels, and packages',
    type: 'both'
  }
};

/**
 * Get all active partners
 */
export function getActivePartners(): AffiliatePartnerConfig[] {
  return Object.values(AFFILIATE_CONFIG).filter(p => p.active);
}

/**
 * Get partners by type (hotel, shopping, both)
 */
export function getPartnersByType(type: 'hotel' | 'shopping' | 'both'): AffiliatePartnerConfig[] {
  return Object.values(AFFILIATE_CONFIG).filter(p => p.active && (p.type === type || p.type === 'both'));
}

/**
 * Get a specific partner configuration
 */
export function getPartner(partnerId: string): AffiliatePartnerConfig | undefined {
  return AFFILIATE_CONFIG[partnerId];
}

/**
 * Get hotel partners (for hotel comparison)
 */
export function getHotelPartners(): AffiliatePartnerConfig[] {
  return getPartnersByType('hotel');
}

/**
 * Get shopping partners (for product exploration)
 */
export function getShoppingPartners(): AffiliatePartnerConfig[] {
  return getPartnersByType('shopping');
}
