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
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
          🤖 AI-Powered Destination Finder
        </h2>
        
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 text-gray-800">
          <!-- Quick Form -->
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Travel Month</label>
              <select [(ngModel)]="preferences.month" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
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
            
            <div>
              <label class="block text-sm font-semibold mb-2">Budget</label>
              <select [(ngModel)]="preferences.budget" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="budget">Budget (₹5k-15k)</option>
                <option value="moderate">Moderate (₹15k-30k)</option>
                <option value="premium">Premium (₹30k+)</option>
              </select>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-semibold mb-2">What interests you? (Select multiple)</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label *ngFor="let cat of availableCategories" 
                     class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" 
                       [checked]="preferences.categories.includes(cat)"
                       (change)="toggleCategory(cat)"
                       class="rounded">
                <span class="text-sm">{{ cat }}</span>
              </label>
            </div>
          </div>
          
          <button (click)="getRecommendations()"
                  [disabled]="isLoading"
                  class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
            {{ isLoading ? 'Finding Perfect Destinations...' : '🔍 Find My Perfect Destination' }}
          </button>
        </div>
        
        <!-- Results -->
        <div *ngIf="recommendations.length > 0" class="mt-8 max-w-6xl mx-auto">
          <h3 class="text-2xl font-bold mb-6 text-center">
            ✨ Top Recommendations for You
          </h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let rec of recommendations; let i = index" 
                 class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <!-- Rank Badge -->
              <div class="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 flex justify-between items-center">
                <span class="font-bold text-white">
                  {{ i === 0 ? '🏆 Top Pick' : '#' + (i + 1) }}
                </span>
                <span class="text-white font-bold">{{ rec.overallRecommendationScore }}/100</span>
              </div>
              
              <div class="p-4">
                <h4 class="text-xl font-bold mb-2 text-gray-900">
                  {{ rec.destination.state }}
                </h4>
                
                <!-- Badges -->
                <div class="flex flex-wrap gap-2 mb-3">
                  <span *ngFor="let badge of rec.badges" 
                        class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">
                    {{ badge }}
                  </span>
                  <span [class]="getRecommendationTypeClass(rec.recommendationType)"
                        class="px-2 py-1 text-xs rounded-full font-semibold">
                    {{ rec.recommendationType }}
                  </span>
                </div>
                
                <!-- Categories -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span *ngFor="let cat of rec.destination.categories" 
                        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {{ cat }}
                  </span>
                </div>
                
                <!-- Reasons -->
                <div class="space-y-1 mb-4">
                  <p *ngFor="let reason of rec.reasons.slice(0, 3)" 
                     class="text-sm text-gray-600">
                    {{ reason }}
                  </p>
                </div>
                
                <!-- Budget & Climate -->
                <div class="flex justify-between text-sm text-gray-600 mb-4">
                  <span>💰 {{ rec.destination.budget }}</span>
                  <span>🌡️ {{ rec.destination.climate }}</span>
                </div>
                
                <!-- Action Button -->
                <a [href]="'https://www.agoda.com/city/' + rec.destination.agoda + '.html?cid=1844104'"
                   target="_blank"
                   class="block w-full py-2 bg-green-600 text-white text-center font-semibold rounded hover:bg-green-700 transition">
                  View Hotels on Agoda
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Error Message -->
        <div *ngIf="error" class="mt-8 max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: []
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
        return 'bg-green-100 text-green-800';
      case 'recommended':
        return 'bg-blue-100 text-blue-800';
      case 'consider':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
