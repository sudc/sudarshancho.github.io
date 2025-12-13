import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  AffiliatePartnerManager, 
  AffiliatePartner,
  HotelSearchParams 
} from '../config/affiliate-partners.config';
import { AgodaDataService, AgodaHotel } from './agoda-data/agoda-data.service';
import { AnalyticsService } from './analytics/analytics.service';

/**
 * Unified comparison result across all partners
 */
export interface ComparisonResult {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  currency: string;
  imageUrl: string;
  description?: string;
  amenities?: string[];
  
  // Partner information
  partnerId: string;
  partnerName: string;
  partnerUrl: string;
  partnerColor?: string;
}

/**
 * Comparison options for filtering
 */
export interface ComparisonOptions {
  category: 'hotels' | 'flights' | 'deals';
  searchQuery?: string;
  city?: string;
  maxResults?: number;
  sortBy?: 'price' | 'rating' | 'relevance';
  priceRange?: { min: number; max: number };
  minRating?: number;
}

/**
 * Core Comparison Service
 * 
 * This service handles intelligent comparison across all enabled affiliate partners.
 * 
 * Architecture:
 * - Single partner mode: Show 2-3 similar options from same partner
 * - Multi-partner mode: Show best options from each partner
 * - Automatic partner detection and filtering
 * - Smart algorithm for best matches
 * - Future-proof for any number of partners
 */
@Injectable({ providedIn: 'root' })
export class ComparisonService {

  constructor(
    private agodaService: AgodaDataService,
    private analytics: AnalyticsService
  ) {}

  /**
   * Main comparison method - returns best options across all active partners
   */
  compareHotels(options: ComparisonOptions): Observable<ComparisonResult[]> {
    const activePartners = AffiliatePartnerManager.getActivePartners(options.category);
    
    if (activePartners.length === 0) {
      return of([]);
    }
    
    // Single partner mode - Show similar options from same partner
    if (activePartners.length === 1) {
      return this.getSimilarOptionsFromSinglePartner(activePartners[0], options);
    }
    
    // Multi-partner mode - Show best option from each partner
    return this.getBestOptionsFromMultiplePartners(activePartners, options);
  }

  /**
   * Single Partner Mode: Show 2-3 similar options from same partner
   * Algorithm: Find similar hotels by location, rating, price range
   */
  private getSimilarOptionsFromSinglePartner(
    partner: AffiliatePartner, 
    options: ComparisonOptions
  ): Observable<ComparisonResult[]> {
    
    // Currently only Agoda is implemented
    if (partner.id === 'agoda') {
      return this.getAgodaSimilarOptions(options);
    }
    
    // Add logic for other partners when onboarded
    return of([]);
  }

  /**
   * Multi-Partner Mode: Show 3-4 best options from different partners
   * Algorithm: Get best match from each partner, compare and rank
   */
  private getBestOptionsFromMultiplePartners(
    partners: AffiliatePartner[], 
    options: ComparisonOptions
  ): Observable<ComparisonResult[]> {
    
    const partnerRequests = partners.map(partner => {
      // Get best option from each partner
      if (partner.id === 'agoda') {
        return this.getAgodaBestOption(options);
      }
      
      // Add other partner logic here when onboarded
      // if (partner.id === 'booking') return this.getBookingBestOption(options);
      // if (partner.id === 'makemytrip') return this.getMMTBestOption(options);
      
      return of(null);
    });

    return forkJoin(partnerRequests).pipe(
      map(results => {
        // Filter out null results
        const validResults = results.filter(r => r !== null) as ComparisonResult[];
        
        // Sort and return top results
        return this.rankAndSortResults(validResults, options);
      })
    );
  }

  /**
   * Agoda Similar Options Algorithm
   * Returns 2-3 hotels similar to search criteria
   */
  private getAgodaSimilarOptions(options: ComparisonOptions): Observable<ComparisonResult[]> {
    const city = options.city || options.searchQuery || '';
    
    return this.agodaService.getHotelsByCity(city).pipe(
      map(hotels => {
        // Filter by criteria
        let filtered = this.applyFilters(hotels, options);
        
        // Sort by algorithm
        filtered = this.sortByAlgorithm(filtered, options);
        
        // Get top 3 results
        const maxResults = options.maxResults || 3;
        const topHotels = filtered.slice(0, maxResults);
        
        // Convert to comparison results
        return topHotels.map(hotel => this.mapAgodaToComparison(hotel));
      })
    );
  }

  /**
   * Agoda Best Option Algorithm
   * Returns single best match for multi-partner comparison
   */
  private getAgodaBestOption(options: ComparisonOptions): Observable<ComparisonResult | null> {
    return this.getAgodaSimilarOptions({ ...options, maxResults: 1 }).pipe(
      map(results => results.length > 0 ? results[0] : null)
    );
  }

  /**
   * Smart Filtering Algorithm
   */
  private applyFilters(hotels: AgodaHotel[], options: ComparisonOptions): AgodaHotel[] {
    let filtered = [...hotels];

    // Filter by rating
    if (options.minRating) {
      filtered = filtered.filter(h => h.rating >= options.minRating!);
    }

    // Filter by price range
    if (options.priceRange) {
      filtered = filtered.filter(h => 
        h.priceFrom >= options.priceRange!.min && 
        h.priceFrom <= options.priceRange!.max
      );
    }

    // Filter by search query
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(h =>
        h.hotelName.toLowerCase().includes(query) ||
        h.city.toLowerCase().includes(query) ||
        h.country.toLowerCase().includes(query) ||
        (h.description && h.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  /**
   * Smart Sorting Algorithm
   */
  private sortByAlgorithm(hotels: AgodaHotel[], options: ComparisonOptions): AgodaHotel[] {
    const sortBy = options.sortBy || 'relevance';

    switch (sortBy) {
      case 'price':
        return hotels.sort((a, b) => a.priceFrom - b.priceFrom);
      
      case 'rating':
        return hotels.sort((a, b) => b.rating - a.rating);
      
      case 'relevance':
      default:
        // Custom relevance algorithm
        // Consider: rating weight (60%), price attractiveness (30%), reviews (10%)
        return hotels.sort((a, b) => {
          const scoreA = this.calculateRelevanceScore(a);
          const scoreB = this.calculateRelevanceScore(b);
          return scoreB - scoreA;
        });
    }
  }

  /**
   * Relevance Score Algorithm
   * Considers rating, price value, and popularity
   */
  private calculateRelevanceScore(hotel: AgodaHotel): number {
    const ratingScore = hotel.rating * 0.6; // 60% weight
    
    // Price attractiveness (lower is better, normalized)
    const priceScore = hotel.priceFrom > 0 
      ? Math.max(0, 10 - (hotel.priceFrom / 1000)) * 0.3 
      : 0; // 30% weight
    
    // Review popularity
    const reviewScore = hotel.numberOfReviews 
      ? Math.min(hotel.numberOfReviews / 100, 10) * 0.1 
      : 0; // 10% weight
    
    return ratingScore + priceScore + reviewScore;
  }

  /**
   * Rank and sort results from multiple partners
   */
  private rankAndSortResults(
    results: ComparisonResult[], 
    options: ComparisonOptions
  ): ComparisonResult[] {
    
    // Sort by price or rating based on options
    if (options.sortBy === 'price') {
      results.sort((a, b) => a.price - b.price);
    } else if (options.sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: mixed relevance considering both price and rating
      results.sort((a, b) => {
        const scoreA = (a.rating * 0.6) + ((10000 - a.price) / 1000 * 0.4);
        const scoreB = (b.rating * 0.6) + ((10000 - b.price) / 1000 * 0.4);
        return scoreB - scoreA;
      });
    }

    // Return top 3-4 results
    const maxResults = options.maxResults || 4;
    return results.slice(0, maxResults);
  }

  /**
   * Map Agoda hotel to unified comparison result
   */
  private mapAgodaToComparison(hotel: AgodaHotel): ComparisonResult {
    const partner = AffiliatePartnerManager.getPartner('agoda')!;
    
    // Build URL with UTM tracking
    const baseUrl = partner.urls.hotels({ 
      hotelId: hotel.hotelId, 
      city: hotel.city 
    });
    const trackedUrl = this.analytics.addUTMToUrl(
      baseUrl, 
      'tripsaver_comparison', 
      'comparison_tool'
    );

    return {
      id: hotel.hotelId,
      name: hotel.hotelName,
      location: `${hotel.city}, ${hotel.country}`,
      rating: hotel.rating,
      price: hotel.priceFrom,
      currency: hotel.currency,
      imageUrl: hotel.imageUrl,
      description: hotel.description,
      amenities: hotel.amenities ? hotel.amenities.split(',').map(a => a.trim()) : [],
      
      partnerId: partner.id,
      partnerName: partner.displayName,
      partnerUrl: trackedUrl,
      partnerColor: partner.color
    };
  }

  /**
   * Track comparison click
   */
  trackComparisonClick(result: ComparisonResult): void {
    this.analytics.trackAffiliateClick(
      result.partnerName,
      'comparison',
      result.name,
      `${result.currency} ${result.price}`
    );
  }

  /**
   * Get comparison summary
   */
  getComparisonSummary(options: ComparisonOptions): Observable<{
    totalPartners: number;
    activePartners: string[];
    mode: 'single' | 'multi';
  }> {
    const activePartners = AffiliatePartnerManager.getActivePartners(options.category);
    
    return of({
      totalPartners: activePartners.length,
      activePartners: activePartners.map(p => p.displayName),
      mode: activePartners.length === 1 ? 'single' : 'multi'
    });
  }
}

/**
 * Usage Examples Across Pages:
 * 
 * 1. Hotels Page - Show similar hotels:
 *    this.comparisonService.compareHotels({
 *      category: 'hotels',
 *      city: 'Mumbai',
 *      maxResults: 3,
 *      sortBy: 'rating'
 *    }).subscribe(results => {
 *      this.similarHotels = results;
 *    });
 * 
 * 2. Search Results - Compare best options:
 *    this.comparisonService.compareHotels({
 *      category: 'hotels',
 *      searchQuery: 'Taj Hotel',
 *      minRating: 4,
 *      sortBy: 'price'
 *    }).subscribe(results => {
 *      this.comparisonResults = results;
 *    });
 * 
 * 3. Hotel Detail - Show alternatives:
 *    this.comparisonService.compareHotels({
 *      category: 'hotels',
 *      city: hotel.city,
 *      priceRange: { min: hotel.price - 1000, max: hotel.price + 1000 },
 *      maxResults: 2
 *    }).subscribe(results => {
 *      this.alternatives = results.filter(r => r.id !== hotel.id);
 *    });
 */
