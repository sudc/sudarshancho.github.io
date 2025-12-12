import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  constructor() { }

  /**
   * Track page views
   */
  trackPageView(url: string) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-XXXXXXXXXX', {
        'page_path': url
      });
    }
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, eventParams: any = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
    }
    console.log('📊 Analytics Event:', eventName, eventParams);
  }

  /**
   * Track affiliate link clicks
   */
  trackAffiliateClick(platform: string, category: string, destination: string, price?: string) {
    this.trackEvent('affiliate_click', {
      event_category: 'Affiliate',
      event_label: `${platform} - ${destination}`,
      platform: platform,
      category: category,
      destination: destination,
      price: price,
      value: this.extractNumericValue(price)
    });
  }

  /**
   * Track deal clicks
   */
  trackDealClick(dealTitle: string, platform: string, discount: string, price: string) {
    this.trackEvent('deal_click', {
      event_category: 'Deal',
      event_label: dealTitle,
      platform: platform,
      discount: discount,
      price: price,
      value: this.extractNumericValue(price)
    });
  }

  /**
   * Track search/filter actions
   */
  trackSearch(searchType: string, query: string) {
    this.trackEvent('search', {
      search_term: query,
      search_type: searchType
    });
  }

  /**
   * Track filter usage
   */
  trackFilter(filterType: string, filterValue: string) {
    this.trackEvent('filter_used', {
      event_category: 'Filter',
      filter_type: filterType,
      filter_value: filterValue
    });
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formName: string, success: boolean = true) {
    this.trackEvent('form_submission', {
      event_category: 'Form',
      form_name: formName,
      success: success
    });
  }

  /**
   * Track newsletter subscriptions
   */
  trackNewsletterSignup(email: string) {
    this.trackEvent('newsletter_signup', {
      event_category: 'Engagement',
      method: 'email'
    });
  }

  /**
   * Track social media clicks
   */
  trackSocialClick(platform: string) {
    this.trackEvent('social_click', {
      event_category: 'Social',
      social_platform: platform
    });
  }

  /**
   * Track outbound links
   */
  trackOutboundLink(url: string, linkText: string) {
    this.trackEvent('outbound_link', {
      event_category: 'Outbound',
      url: url,
      link_text: linkText
    });
  }

  /**
   * Extract numeric value from price string (e.g., "₹2,500" -> 2500)
   */
  private extractNumericValue(price?: string): number | undefined {
    if (!price) return undefined;
    const numericValue = price.replace(/[^\d]/g, '');
    return numericValue ? parseInt(numericValue, 10) : undefined;
  }

  /**
   * Generate UTM parameters for affiliate links
   */
  generateUTMParams(source: string, medium: string = 'affiliate', campaign: string = 'tripsaver'): string {
    const params = new URLSearchParams({
      utm_source: source.toLowerCase().replace(/\s+/g, '_'),
      utm_medium: medium,
      utm_campaign: campaign,
      utm_content: `tripsaver_${Date.now()}`
    });
    return params.toString();
  }

  /**
   * Add UTM parameters to URL
   */
  addUTMToUrl(url: string, source: string, medium: string = 'affiliate'): string {
    const separator = url.includes('?') ? '&' : '?';
    const utmParams = this.generateUTMParams(source, medium);
    return `${url}${separator}${utmParams}`;
  }
}
