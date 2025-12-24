/**
 * ✅ Affiliate Link Builder Service
 * Dynamically generates affiliate links for any partner
 * Handles URL encoding, parameter formatting, tracking
 */

import { Injectable } from '@angular/core';
import {
  AFFILIATE_PARTNERS,
  AffiliatePartnerType,
  AffiliatePartnerConfig,
  getDefaultAffiliatePartner,
  getAffiliatePartner,
} from '../config/affiliate-partners.config';

export interface AffiliateLink {
  url: string;
  partner: AffiliatePartnerType;
  searchQuery: string;
  encoded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AffiliateLinkBuilderService {
  /**
   * Build an affiliate link for a product/category
   * @param searchQuery Search term (e.g., "travel backpack")
   * @param partnerId Partner ID (defaults to 'amazon')
   * @param additionalParams Additional query parameters
   * @returns AffiliateLink object with complete URL
   */
  buildAffiliateLink(
    searchQuery: string,
    partnerId: AffiliatePartnerType = 'amazon',
    additionalParams?: Record<string, string>
  ): AffiliateLink {
    const partner = getAffiliatePartner(partnerId) || getDefaultAffiliatePartner();

    if (!partner.active) {
      console.warn(`⚠️ Partner ${partnerId} is not active. Using default partner.`);
      return this.buildAffiliateLink(searchQuery, 'amazon', additionalParams);
    }

    // Build URL with partner's base URL
    const url = new URL(partner.baseUrl);

    // Add search query
    url.searchParams.append(partner.queryParams.searchKey, searchQuery);

    // Add store/affiliate ID
    url.searchParams.append(partner.queryParams.storeParam, partner.storeId);

    // Add optional affiliate parameter
    if (partner.queryParams.affiliateParam) {
      url.searchParams.append(partner.queryParams.affiliateParam, partner.storeId);
    }

    // Add any additional parameters (e.g., tracking, campaign, etc.)
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return {
      url: url.toString(),
      partner: partnerId,
      searchQuery: searchQuery,
      encoded: true,
    };
  }

  /**
   * Build multiple affiliate links for the same product across different partners
   * Useful for A/B testing or showing user choice
   * @param searchQuery Search term
   * @param partnerIds Array of partner IDs
   * @returns Array of AffiliateLink objects
   */
  buildAffiliateLinksMultiPartner(
    searchQuery: string,
    partnerIds: AffiliatePartnerType[] = ['amazon']
  ): AffiliateLink[] {
    return partnerIds
      .map((partnerId) => this.buildAffiliateLink(searchQuery, partnerId))
      .filter((link) => link !== null);
  }

  /**
   * Generate tracking parameters for GA4
   * @param partner Affiliate partner
   * @param productName Product/category name
   * @param destinationType Destination type (beach, hill, etc.)
   * @returns GA4 event parameters
   */
  generateTrackingParams(
    partner: AffiliatePartnerType,
    productName: string,
    destinationType?: string
  ): Record<string, string> {
    return {
      event_category: partner.toUpperCase(),
      event_label: productName,
      source: 'destination_explore_panel',
      destination_type: destinationType || 'unknown',
      partner: partner,
    };
  }

  /**
   * Get partner details for UI display
   * @param partnerId Partner ID
   * @returns Partner configuration with metadata
   */
  getPartnerDetails(partnerId: AffiliatePartnerType): AffiliatePartnerConfig | null {
    return getAffiliatePartner(partnerId) || null;
  }

  /**
   * Check if partner is available in a specific country
   * @param partnerId Partner ID
   * @param countryCode Country code (e.g., 'IN', 'US')
   * @returns Boolean indicating availability
   */
  isPartnerAvailableInCountry(partnerId: AffiliatePartnerType, countryCode: string): boolean {
    const partner = getAffiliatePartner(partnerId);
    return partner ? partner.countries.includes(countryCode) : false;
  }

  /**
   * Get commission rate for a partner
   * Useful for dashboard/reporting
   * @param partnerId Partner ID
   * @returns Commission percentage (e.g., 5 for 5%)
   */
  getCommissionRate(partnerId: AffiliatePartnerType): number {
    const partner = getAffiliatePartner(partnerId);
    return partner ? partner.commission : 0;
  }

  /**
   * Validate if an affiliate link is properly formatted
   * @param url URL to validate
   * @returns Boolean indicating validity
   */
  validateAffiliateLink(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate a UTM tracking URL for campaign tracking
   * @param baseUrl Base affiliate URL
   * @param campaign Campaign name
   * @param medium Medium (e.g., 'destination-panel')
   * @param source Source (e.g., 'travel-wizard')
   * @returns URL with UTM parameters
   */
  buildTrackedUrl(
    baseUrl: string,
    campaign: string,
    medium: string = 'destination-panel',
    source: string = 'travel-wizard'
  ): string {
    const url = new URL(baseUrl);
    url.searchParams.append('utm_campaign', campaign);
    url.searchParams.append('utm_medium', medium);
    url.searchParams.append('utm_source', source);
    return url.toString();
  }
}
