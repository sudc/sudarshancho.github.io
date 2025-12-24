/**
 * ✅ Affiliate Partners Configuration
 * Scalable configuration for managing multiple affiliate partners
 * Easy to add new partners without changing component logic
 */

export type AffiliatePartnerType = 'amazon' | 'flipkart' | 'ebay' | 'alibaba';

export interface AffiliatePartnerConfig {
  id: AffiliatePartnerType;
  name: string;
  logo: string;
  baseUrl: string;
  storeId: string; // Store ID, Associate ID, etc.
  commission: number; // Estimated commission percentage
  countries: string[]; // Supported countries: 'IN', 'US', 'UK'
  active: boolean;
  queryParams: {
    searchKey: string; // 'k', 'q', 'tag' etc.
    storeParam: string; // Parameter name for store ID (e.g., 'tag', 'tag')
    affiliateParam?: string; // Optional additional affiliate parameter
  };
  metadata?: {
    description?: string;
    affiliateUrl?: string;
    terms?: string;
  };
}

/**
 * Registered Affiliate Partners
 * New partners can be added here without changing component logic
 */
export const AFFILIATE_PARTNERS: Record<AffiliatePartnerType, AffiliatePartnerConfig> = {
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    logo: '🛍️',
    baseUrl: 'https://www.amazon.in/s',
    storeId: 'tripsaver21-21',
    commission: 5,
    countries: ['IN', 'US', 'UK'],
    active: true,
    queryParams: {
      searchKey: 'k',
      storeParam: 'tag',
      affiliateParam: undefined,
    },
    metadata: {
      description: 'Largest selection of travel gear and essentials',
      affiliateUrl: 'https://affiliate-program.amazon.in/',
      terms: 'Amazon Associates Program',
    },
  },

  flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    logo: '🏪',
    baseUrl: 'https://www.flipkart.com/search',
    storeId: 'fslogin7',
    commission: 8,
    countries: ['IN'],
    active: false, // Enable when ready
    queryParams: {
      searchKey: 'q',
      storeParam: 'affid',
      affiliateParam: 'affiliate_id',
    },
    metadata: {
      description: 'Indian e-commerce with local shipping',
      affiliateUrl: 'https://affiliate.flipkart.com/',
      terms: 'Flipkart Affiliate Program',
    },
  },

  ebay: {
    id: 'ebay',
    name: 'eBay',
    logo: '🌐',
    baseUrl: 'https://www.ebay.com/sch/i.html',
    storeId: 'tripsaver-21',
    commission: 3,
    countries: ['US', 'UK', 'EU'],
    active: false, // Enable when ready
    queryParams: {
      searchKey: '_nkw',
      storeParam: '_trksid',
      affiliateParam: 'campid',
    },
    metadata: {
      description: 'Global marketplace with competitive prices',
      affiliateUrl: 'https://publisher.ebaypartnernetwork.com/',
      terms: 'eBay Partner Network',
    },
  },

  alibaba: {
    id: 'alibaba',
    name: 'AliExpress',
    logo: '🚀',
    baseUrl: 'https://www.aliexpress.com/wholesale',
    storeId: 'tripsaver21',
    commission: 4,
    countries: ['IN', 'US', 'UK'],
    active: false, // Enable when ready
    queryParams: {
      searchKey: 'SearchText',
      storeParam: 'affiliate_id',
      affiliateParam: 'aff_platform',
    },
    metadata: {
      description: 'Budget-friendly travel gear from global sellers',
      affiliateUrl: 'https://portals.aliexpress.com/',
      terms: 'AliExpress Affiliate Program',
    },
  },
};

/**
 * Get all active affiliate partners for a specific country
 * @param countryCode Country code (e.g., 'IN', 'US')
 * @returns Array of active partners available in that country
 */
export function getActivePartnersForCountry(countryCode: string): AffiliatePartnerConfig[] {
  return Object.values(AFFILIATE_PARTNERS).filter(
    (partner) => partner.active && partner.countries.includes(countryCode)
  );
}

/**
 * Get a specific partner configuration
 * @param partnerId Affiliate partner ID
 * @returns Partner configuration or undefined
 */
export function getAffiliatePartner(partnerId: AffiliatePartnerType): AffiliatePartnerConfig | undefined {
  return AFFILIATE_PARTNERS[partnerId];
}

/**
 * Get the default/primary affiliate partner
 * Currently: Amazon (most established, global support)
 */
export function getDefaultAffiliatePartner(): AffiliatePartnerConfig {
  return AFFILIATE_PARTNERS.amazon;
}

/**
 * Get all active partners (across all countries)
 */
export function getAllActivePartners(): AffiliatePartnerConfig[] {
  return Object.values(AFFILIATE_PARTNERS).filter((partner) => partner.active);
}
