import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  RecommendationEngine, 
  RecommendationInput,
  EnhancedRecommendation 
} from '../../core/engines/recommendation/recommendation.engine';
import { DestinationScoringEngine } from '../../core/engines/destination-scoring/destination-scoring.engine';
import { TripReadinessEngine } from '../../core/engines/trip-readiness/trip-readiness.engine';
import { MongoDBService } from '../../core/services/mongodb/mongodb.service';
import { DESTINATIONS_DATA } from '../../core/engines/destination/destinations.data';

@Component({
  selector: 'app-smart-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [MongoDBService, DestinationScoringEngine, TripReadinessEngine, RecommendationEngine],
  template: `
    <section class="smart-recommendations-section">
      <div class="container mx-auto px-4 py-16">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-block mb-4">
            <span class="text-5xl">🤖</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Destination Finder
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Let our intelligent algorithm find your perfect destination based on your preferences
          </p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <!-- Preference Form -->
          <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <!-- Month Selector -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  📅 When are you traveling?
                </label>
                <select [(ngModel)]="preferences.month" 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option [value]="1">January</option>
                  <option [value]="2">February</option>
                  <option [value]="3">March</option>
                  <option [value]="4">April</option>
                  <option [value]="5">May</option>
                  <option [value]="6">June</option>
                  <option [value]="7">July</option>
                  <option [value]="8">August</option>
                  <option [value]="9">September</option>
                  <option [value]="10">October</option>
                  <option [value]="11">November</option>
                  <option [value]="12">December</option>
                </select>
              </div>
              
              <!-- Budget Selector -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  💰 What's your budget?
                </label>
                <select [(ngModel)]="preferences.budget" 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option value="budget">Budget (₹5k-15k)</option>
                  <option value="moderate">Moderate (₹15k-30k)</option>
                  <option value="premium">Premium (₹30k+)</option>
                </select>
              </div>
            </div>
            
            <!-- Category Selection -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                🎯 What interests you? <span class="text-gray-500 font-normal">(Select all that apply)</span>
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <label *ngFor="let cat of availableCategories" 
                       class="category-checkbox">
                  <input type="checkbox" 
                         [checked]="preferences.categories.includes(cat)"
                         (change)="toggleCategory(cat)"
                         class="hidden">
                  <span class="category-label">{{ cat }}</span>
                </label>
              </div>
            </div>
            
            <!-- Search Button -->
            <button (click)="getRecommendations()"
                    [disabled]="isLoading"
                    class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5">
              <span *ngIf="!isLoading" class="flex items-center justify-center gap-2">
                <span>🔍</span>
                <span>Find My Perfect Destination</span>
              </span>
              <span *ngIf="isLoading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Finding Perfect Destinations...</span>
              </span>
            </button>
          </div>
          
          <!-- Results -->
          <div *ngIf="recommendations.length > 0" class="results-section">
            <div class="text-center mb-8">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                ✨ Your Perfect Destinations
              </h3>
              <p class="text-gray-600">Based on your preferences, here are our top recommendations</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let rec of recommendations; let i = index" 
                   class="destination-card">
                <!-- Rank Header -->
                <div class="rank-header" [class.rank-top]="i === 0">
                  <div class="flex items-center gap-2">
                    <span class="rank-badge">
                      {{ i === 0 ? '🏆' : '#' + (i + 1) }}
                    </span>
                    <span class="rank-text">
                      {{ i === 0 ? 'Top Pick' : 'Recommended' }}
                    </span>
                  </div>
                  <div class="score-display">
                    <span class="score-number">{{ rec.overallRecommendationScore }}</span>
                    <span class="score-total">/100</span>
                  </div>
                </div>
                
                <!-- Card Content -->
                <div class="card-content">
                  <h4 class="destination-name">
                    {{ rec.destination.state }}
                  </h4>
                  
                  <!-- Recommendation Type Badge -->
                  <div class="mb-3">
                    <span [class]="getRecommendationTypeClass(rec.recommendationType)"
                          class="rec-type-badge">
                      {{ getRecommendationTypeLabel(rec.recommendationType) }}
                    </span>
                  </div>
                  
                  <!-- Achievement Badges -->
                  <div class="badges-container" *ngIf="rec.badges.length > 0">
                    <span *ngFor="let badge of rec.badges" class="achievement-badge">
                      {{ badge }}
                    </span>
                  </div>
                  
                  <!-- Categories -->
                  <div class="categories-container">
                    <span *ngFor="let cat of rec.destination.categories" class="category-tag">
                      {{ cat }}
                    </span>
                  </div>
                  
                  <!-- Reasons -->
                  <div class="reasons-list">
                    <p *ngFor="let reason of rec.reasons.slice(0, 3)" class="reason-item">
                      {{ reason }}
                    </p>
                  </div>
                  
                  <!-- Info Row -->
                  <div class="info-row">
                    <span class="info-item">💰 {{ rec.destination.budget | titlecase }}</span>
                    <span class="info-item">🌡️ {{ rec.destination.climate | titlecase }}</span>
                  </div>
                  
                  <!-- CTA Button -->
                  <a [href]="'https://www.agoda.com/city/' + rec.destination.agoda + '.html?cid=1844104'"
                     target="_blank"
                     class="cta-button">
                    View Hotels on Agoda →
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Error Message -->
          <div *ngIf="error" class="error-message">
            <span class="text-xl">⚠️</span>
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .smart-recommendations-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }
    
    .smart-recommendations-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    .container {
      position: relative;
      z-index: 1;
    }
    
    .text-center h2 {
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .category-checkbox {
      position: relative;
      cursor: pointer;
    }
    
    .category-label {
      display: block;
      padding: 0.625rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
      transition: all 0.2s;
    }
    
    .category-checkbox input:checked + .category-label {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }
    
    .category-label:hover {
      border-color: #3b82f6;
      transform: translateY(-1px);
    }
    
    .results-section {
      animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .destination-card {
      background: white;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      border: 1px solid #e5e7eb;
    }
    
    .destination-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
    }
    
    .rank-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    
    .rank-header.rank-top {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .rank-badge {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .rank-text {
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .score-display {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }
    
    .score-number {
      font-size: 1.875rem;
      font-weight: bold;
    }
    
    .score-total {
      font-size: 1rem;
      opacity: 0.9;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .destination-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }
    
    .rec-type-badge {
      display: inline-block;
      padding: 0.375rem 0.875rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .rec-type-badge.highly-recommended {
      background: #dcfce7;
      color: #166534;
    }
    
    .rec-type-badge.recommended {
      background: #dbeafe;
      color: #1e40af;
    }
    
    .rec-type-badge.consider {
      background: #fef3c7;
      color: #92400e;
    }
    
    .badges-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .achievement-badge {
      padding: 0.375rem 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 0.375rem;
      box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
    }
    
    .categories-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-bottom: 1rem;
    }
    
    .category-tag {
      padding: 0.25rem 0.625rem;
      background: #f3f4f6;
      color: #374151;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      font-weight: 500;
    }
    
    .reasons-list {
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      border-left: 3px solid #667eea;
    }
    
    .reason-item {
      font-size: 0.875rem;
      color: #4b5563;
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
    
    .reason-item:last-child {
      margin-bottom: 0;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .info-item {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }
    
    .cta-button {
      display: block;
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      text-align: center;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: all 0.3s;
      text-decoration: none;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }
    
    .cta-button:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px -2px rgba(16, 185, 129, 0.4);
    }
    
    .error-message {
      background: #fef2f2;
      border: 2px solid #fecaca;
      color: #991b1b;
      padding: 1rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
    }
  `]
})
export class SmartRecommendationsComponent implements OnInit {
  private recommendationEngine = inject(RecommendationEngine);
  
  preferences = {
    month: new Date().getMonth() + 1,
    budget: 'moderate' as 'budget' | 'moderate' | 'premium',
    categories: [] as string[]
  };
  
  availableCategories = [
    'Beach', 'Mountain', 'Heritage', 'Adventure', 'Spiritual',
    'Hill', 'Nature', 'City', 'Snow', 'Wildlife', 'Romantic',
    'Backwaters', 'Island', 'Colonial', 'Culture'
  ];
  
  recommendations: EnhancedRecommendation[] = [];
  isLoading = false;
  error = '';

  ngOnInit(): void {
    // Auto-load recommendations with current month
    this.getRecommendations();
  }

  toggleCategory(category: string): void {
    const index = this.preferences.categories.indexOf(category);
    if (index > -1) {
      this.preferences.categories.splice(index, 1);
    } else {
      this.preferences.categories.push(category);
    }
  }

  async getRecommendations(): Promise<void> {
    this.isLoading = true;
    this.error = '';
    this.recommendations = [];

    try {
      const input: RecommendationInput = {
        userPreferences: {
          month: this.preferences.month,
          budget: this.preferences.budget,
          categories: this.preferences.categories
        }
      };

      const result = await this.recommendationEngine.process(input);
      
      if (result.success) {
        this.recommendations = result.recommendations.slice(0, 6); // Top 6
      } else {
        this.error = 'Failed to generate recommendations. Please try again.';
      }
    } catch (err: any) {
      console.error('Recommendation error:', err);
      this.error = 'An error occurred. Please try again later.';
      
      // Fallback to simple scoring without MongoDB
      this.useFallbackRecommendations();
    } finally {
      this.isLoading = false;
    }
  }

  private useFallbackRecommendations(): void {
    // Use static data as fallback
    const destinations = Object.entries(DESTINATIONS_DATA);
    const scored = destinations.map(([id, dest]) => {
      let score = 50;
      const reasons: string[] = [];
      const badges: string[] = [];
      
      // Month scoring
      if (dest.bestMonths.includes(this.preferences.month)) {
        score += 30;
        reasons.push('✓ Perfect time to visit');
        badges.push('Perfect Season');
      }
      
      // Budget scoring
      if (dest.budget === this.preferences.budget) {
        score += 25;
        reasons.push('✓ Matches your budget');
        badges.push('Budget Match');
      }
      
      // Category scoring
      if (this.preferences.categories.length > 0) {
        const matches = dest.categories.filter(c => this.preferences.categories.includes(c));
        if (matches.length > 0) {
          score += matches.length * 10;
          reasons.push(`✓ ${matches.length} matching interest${matches.length > 1 ? 's' : ''}`);
          badges.push('Great Match');
        }
      }
      
      return {
        destinationId: id,
        destination: dest,
        score,
        reasons,
        badges,
        overallRecommendationScore: Math.min(100, score),
        recommendationType: score >= 80 ? 'highly-recommended' : 
                           score >= 65 ? 'recommended' : 'consider',
        warnings: []
      } as EnhancedRecommendation;
    });
    
    scored.sort((a, b) => b.score - a.score);
    this.recommendations = scored.slice(0, 6);
  }

  getRecommendationTypeClass(type: string): string {
    switch (type) {
      case 'highly-recommended':
        return 'highly-recommended';
      case 'recommended':
        return 'recommended';
      case 'consider':
        return 'consider';
      default:
        return 'not-recommended';
    }
  }

  getRecommendationTypeLabel(type: string): string {
    switch (type) {
      case 'highly-recommended':
        return '⭐ Highly Recommended';
      case 'recommended':
        return '👍 Recommended';
      case 'consider':
        return '💭 Worth Considering';
      default:
        return 'Not Recommended';
    }
  }
}
