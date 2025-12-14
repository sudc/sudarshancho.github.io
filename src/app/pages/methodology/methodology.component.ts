import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * TRUST & METHODOLOGY PAGE
 * =========================
 * 
 * Explains how TripSaver works, builds trust, and clarifies
 * that we're a decision-support platform, not a booking site.
 * 
 * Critical for:
 * - Legal transparency
 * - User trust
 * - SEO (unique value proposition)
 * - Competitive differentiation
 */

@Component({
  selector: 'app-methodology',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './methodology.component.html',
  styleUrls: ['./methodology.component.scss']
})
export class MethodologyComponent {
  
  engines = [
    {
      name: 'Destination Scoring Engine',
      icon: '🎯',
      color: 'blue',
      purpose: 'Ranks destinations based on your preferences, budget, and travel month',
      howItWorks: 'Analyzes category match, timing suitability, budget compatibility, and travel ease to score each destination (0-130 points)',
      dataSources: ['User preferences', 'Seasonal patterns', 'Budget categories', 'Accessibility data'],
      example: 'If you search for "beach vacation in December for couples under ₹20k", it ranks Goa (95), Andaman (88), and Varkala (75)'
    },
    {
      name: 'Trip Readiness Scoring Engine',
      icon: '✅',
      color: 'green',
      purpose: 'Checks if a destination is suitable right now based on current conditions',
      howItWorks: 'Evaluates weather comfort (30pts), crowd levels (20pts), cost comfort (20pts), experience match (20pts), and travel ease (10pts)',
      dataSources: ['Historical climate data (Wikipedia)', 'Festival calendars', 'School holiday schedules', 'Government tourism data'],
      example: 'For "Goa in January", it scores 88/100: Perfect weather (30/30), High crowds (14/20), Good accessibility (10/10)'
    },
    {
      name: 'Trip Readiness Engine',
      icon: '🧳',
      color: 'orange',
      purpose: 'Helps you prepare with a personalized travel checklist',
      howItWorks: 'Generates 40+ tasks across 6 categories (Documents, Booking, Packing, Health, Finance, Preparation) with timeline milestones',
      dataSources: ['Travel requirements', 'Destination characteristics', 'Trip duration and type', 'Editorial best practices'],
      example: 'For a 7-day Goa trip, creates timeline: 60 days before (passport check), 30 days (book hotels), 7 days (pack sunscreen)'
    },
    {
      name: 'Recommendation Engine',
      icon: '💡',
      color: 'purple',
      purpose: 'Suggests the best booking platform for your needs',
      howItWorks: 'Considers flexibility requirements, group size, cancellation needs, and inventory depth — not sponsorships',
      dataSources: ['Platform features', 'Traveler requirements', 'Booking policies', 'User feedback'],
      example: 'For flexible group bookings, recommends Agoda; for loyalty points, may suggest Booking.com'
    },
    {
      name: 'Destination Engine',
      icon: '🗺️',
      color: 'gray',
      purpose: 'Curates verified destination information from trusted sources',
      howItWorks: 'Aggregates data from government tourism sites, Wikipedia climate tables, and editorial research',
      dataSources: ['Incredible India', 'State tourism portals', 'Wikipedia', 'Agoda city pages', 'Editorial research'],
      example: 'Goa profile includes climate (tropical), best months (Nov-Feb), categories (Beach, Party), with source attribution'
    }
  ];

  faqs = [
    {
      question: 'Does TripSaver sell travel packages?',
      answer: 'No. We are a decision-support platform, not a travel agency. We help you decide where to go, when to travel, and how to prepare — then connect you to trusted booking platforms.'
    },
    {
      question: 'Are your scores influenced by payments or sponsorships?',
      answer: 'Absolutely not. All scores are generated using transparent, rule-based algorithms based on publicly available data. Affiliate partnerships do not influence rankings, scores, or recommendations.'
    },
    {
      question: 'How do you make money?',
      answer: 'When you choose to book through our recommended platforms, we may earn a small affiliate commission at no extra cost to you. This helps us keep TripSaver free while maintaining complete transparency.'
    },
    {
      question: 'Are your destination scores accurate?',
      answer: 'Scores are guidance, not guarantees. They are based on historical data, patterns, and rules. Weather, crowds, and conditions can vary. Always check latest advisories before traveling.'
    },
    {
      question: 'Where does your data come from?',
      answer: 'We use only legal, publicly available sources: government tourism sites (Incredible India, state portals), Wikipedia climate data, festival calendars, and our own editorial research. We never scrape copyrighted content.'
    },
    {
      question: 'Can I trust TripSaver recommendations?',
      answer: 'We prioritize transparency over optimization. Every score shows its breakdown, every recommendation explains its reasoning, and every data source is attributed. Our goal is to help you make confident decisions, not just click ads.'
    }
  ];
}
