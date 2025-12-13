/**
 * Centralized Affiliate Partner Configuration
 * 
 * This file manages all affiliate partners in one place.
 * To enable/disable a partner, simply change the 'enabled' flag.
 * 
 * Architecture Benefits:
 * - Single source of truth for all partners
 * - Easy onboarding: Add new partner object
 * - Easy offboarding: Set enabled = false
 * - Automatic filtering across entire app
 * - Scalable for future partners
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  displayName: string;
  enabled: boolean;
  affiliateId: string;
  logoUrl?: string;
  color?: string;
  priority: number; // Lower number = higher priority in UI
  categories: ('hotels' | 'flights' | 'deals' | 'all')[];
  
  // URL Building Functions
  urls: {
    hotels: (params: HotelSearchParams) => string;
    flights?: (params: FlightSearchParams) => string;
    base: string;
  };
}

export interface HotelSearchParams {
  hotelId?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
}

export interface FlightSearchParams {
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
  adults?: number;
}

/**
 * Active Affiliate Partners
 * Add/remove partners here to enable/disable them across the entire app
 */
export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'agoda',
    name: 'agoda',
    displayName: 'Agoda',
    enabled: true, // ✅ Currently enabled
    affiliateId: '1955073',
    logoUrl: 'https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg',
    color: '#D7263D',
    priority: 1,
    categories: ['hotels', 'flights', 'all'],
    
    urls: {
      base: 'https://www.agoda.com',
      hotels: (params: HotelSearchParams) => {
        const baseUrl = 'https://www.agoda.com';
        const cid = 'cid=1955073';
        
        if (params.hotelId) {
          return `${baseUrl}/hotel/${params.hotelId}.html?${cid}`;
        }
        
        if (params.city) {
          const citySlug = params.city.toLowerCase().replace(/\s+/g, '-');
          let url = `${baseUrl}/search?city=${encodeURIComponent(citySlug)}&${cid}`;
          
          if (params.checkIn) url += `&checkIn=${params.checkIn}`;
          if (params.checkOut) url += `&checkOut=${params.checkOut}`;
          if (params.adults) url += `&adults=${params.adults}`;
          if (params.rooms) url += `&rooms=${params.rooms}`;
          
          return url;
        }
        
        return `${baseUrl}?${cid}`;
      },
      
      flights: (params: FlightSearchParams) => {
        const baseUrl = 'https://www.agoda.com/flights';
        const cid = 'cid=1955073';
        let url = `${baseUrl}?${cid}`;
        
        if (params.from) url += `&from=${params.from}`;
        if (params.to) url += `&to=${params.to}`;
        if (params.departDate) url += `&departDate=${params.departDate}`;
        if (params.returnDate) url += `&returnDate=${params.returnDate}`;
        if (params.adults) url += `&adults=${params.adults}`;
        
        return url;
      }
    }
  },
  
  // FUTURE PARTNERS - Set enabled: true when onboarded
  {
    id: 'booking',
    name: 'booking',
    displayName: 'Booking.com',
    enabled: false, // ⏳ Disabled - Enable when partner onboarded
    affiliateId: 'YOUR_BOOKING_AFFILIATE_ID', // Replace when onboarding
    logoUrl: 'https://q-xx.bstatic.com/xdata/images/xphoto/300x300/140007451.png',
    color: '#003580',
    priority: 2,
    categories: ['hotels', 'all'],
    
    urls: {
      base: 'https://www.booking.com',
      hotels: (params: HotelSearchParams) => {
        const baseUrl = 'https://www.booking.com';
        const aid = 'aid=YOUR_BOOKING_AFFILIATE_ID'; // Replace when onboarding
        
        if (params.hotelId) {
          return `${baseUrl}/hotel/${params.hotelId}.html?${aid}`;
        }
        
        if (params.city) {
          let url = `${baseUrl}/searchresults.html?ss=${encodeURIComponent(params.city)}&${aid}`;
          
          if (params.checkIn) url += `&checkin=${params.checkIn}`;
          if (params.checkOut) url += `&checkout=${params.checkOut}`;
          if (params.adults) url += `&group_adults=${params.adults}`;
          if (params.rooms) url += `&no_rooms=${params.rooms}`;
          
          return url;
        }
        
        return `${baseUrl}?${aid}`;
      }
    }
  },
  
  {
    id: 'makemytrip',
    name: 'makemytrip',
    displayName: 'MakeMyTrip',
    enabled: false, // ⏳ Disabled - Enable when partner onboarded
    affiliateId: 'YOUR_MMT_AFFILIATE_ID', // Replace when onboarding
    logoUrl: 'https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/mmtLogo.png',
    color: '#E73C33',
    priority: 3,
    categories: ['hotels', 'flights', 'all'],
    
    urls: {
      base: 'https://www.makemytrip.com',
      hotels: (params: HotelSearchParams) => {
        const baseUrl = 'https://www.makemytrip.com/hotels';
        const campaign = 'campaign=YOUR_MMT_AFFILIATE_ID'; // Replace when onboarding
        
        if (params.city) {
          let url = `${baseUrl}/hotels-in-${params.city.toLowerCase()}.html?${campaign}`;
          
          if (params.checkIn) url += `&checkin=${params.checkIn}`;
          if (params.checkOut) url += `&checkout=${params.checkOut}`;
          
          return url;
        }
        
        return `${baseUrl}?${campaign}`;
      },
      
      flights: (params: FlightSearchParams) => {
        const baseUrl = 'https://www.makemytrip.com/flights';
        const campaign = 'campaign=YOUR_MMT_AFFILIATE_ID';
        let url = `${baseUrl}?${campaign}`;
        
        if (params.from) url += `&from=${params.from}`;
        if (params.to) url += `&to=${params.to}`;
        
        return url;
      }
    }
  },
  
  {
    id: 'goibibo',
    name: 'goibibo',
    displayName: 'Goibibo',
    enabled: false, // ⏳ Disabled - Enable when partner onboarded
    affiliateId: 'YOUR_GOIBIBO_AFFILIATE_ID', // Replace when onboarding
    logoUrl: 'https://gos3.ibcdn.com/goLogo-f5866b2d05.png',
    color: '#FF6D38',
    priority: 4,
    categories: ['hotels', 'flights', 'all'],
    
    urls: {
      base: 'https://www.goibibo.com',
      hotels: (params: HotelSearchParams) => {
        const baseUrl = 'https://www.goibibo.com/hotels';
        const source = 'utm_source=YOUR_GOIBIBO_AFFILIATE_ID'; // Replace when onboarding
        
        if (params.city) {
          let url = `${baseUrl}/${params.city.toLowerCase()}?${source}`;
          return url;
        }
        
        return `${baseUrl}?${source}`;
      },
      
      flights: (params: FlightSearchParams) => {
        const baseUrl = 'https://www.goibibo.com/flights';
        const source = 'utm_source=YOUR_GOIBIBO_AFFILIATE_ID';
        let url = `${baseUrl}?${source}`;
        
        if (params.from && params.to) {
          url = `${baseUrl}/air-${params.from}-${params.to}?${source}`;
        }
        
        return url;
      }
    }
  }
];

/**
 * Helper Functions for Easy Partner Management
 */
export class AffiliatePartnerManager {
  
  /**
   * Get all enabled partners
   */
  static getActivePartners(category?: 'hotels' | 'flights' | 'deals'): AffiliatePartner[] {
    let partners = AFFILIATE_PARTNERS.filter(p => p.enabled);
    
    if (category) {
      partners = partners.filter(p => 
        p.categories.includes(category) || p.categories.includes('all')
      );
    }
    
    // Sort by priority (lower number = higher priority)
    return partners.sort((a, b) => a.priority - b.priority);
  }
  
  /**
   * Get a specific partner by ID
   */
  static getPartner(partnerId: string): AffiliatePartner | undefined {
    return AFFILIATE_PARTNERS.find(p => p.id === partnerId && p.enabled);
  }
  
  /**
   * Check if any partners are enabled
   */
  static hasActivePartners(category?: 'hotels' | 'flights' | 'deals'): boolean {
    return this.getActivePartners(category).length > 0;
  }
  
  /**
   * Get count of active partners
   */
  static getActivePartnersCount(category?: 'hotels' | 'flights' | 'deals'): number {
    return this.getActivePartners(category).length;
  }
  
  /**
   * Build hotel URL for a specific partner
   */
  static buildHotelUrl(partnerId: string, params: HotelSearchParams): string | null {
    const partner = this.getPartner(partnerId);
    if (!partner) return null;
    
    return partner.urls.hotels(params);
  }
  
  /**
   * Build flight URL for a specific partner
   */
  static buildFlightUrl(partnerId: string, params: FlightSearchParams): string | null {
    const partner = this.getPartner(partnerId);
    if (!partner || !partner.urls.flights) return null;
    
    return partner.urls.flights(params);
  }
  
  /**
   * Get primary partner (highest priority enabled partner)
   */
  static getPrimaryPartner(category?: 'hotels' | 'flights' | 'deals'): AffiliatePartner | undefined {
    const partners = this.getActivePartners(category);
    return partners.length > 0 ? partners[0] : undefined;
  }
}

/**
 * Usage Examples:
 * 
 * 1. Get all active partners:
 *    const partners = AffiliatePartnerManager.getActivePartners('hotels');
 * 
 * 2. Build hotel URL:
 *    const url = AffiliatePartnerManager.buildHotelUrl('agoda', { 
 *      city: 'Mumbai', 
 *      checkIn: '2025-12-20' 
 *    });
 * 
 * 3. Check if multiple partners exist:
 *    const hasMultiple = AffiliatePartnerManager.getActivePartnersCount() > 1;
 * 
 * 4. Get primary partner:
 *    const primary = AffiliatePartnerManager.getPrimaryPartner('hotels');
 * 
 * 5. To onboard a new partner:
 *    - Add partner object to AFFILIATE_PARTNERS array
 *    - Set enabled: true
 *    - Add affiliate ID
 *    - Define URL building logic
 * 
 * 6. To offboard a partner:
 *    - Set enabled: false in partner object
 *    - No code changes needed anywhere else!
 */
