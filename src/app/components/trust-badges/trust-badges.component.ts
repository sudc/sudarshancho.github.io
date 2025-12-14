import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-trust-badges',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">Why Trust TripSaver?</h2>
        <p class="text-center text-gray-600 mb-8">
          Transparent, unbiased travel recommendations powered by data
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let badge of badges" 
               class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div class="text-5xl mb-4">{{ badge.icon }}</div>
            <h3 class="text-lg font-bold mb-2">{{ badge.title }}</h3>
            <p class="text-sm text-gray-600">{{ badge.description }}</p>
          </div>
        </div>
        
        <!-- Trust Messages -->
        <div class="mt-12 max-w-4xl mx-auto">
          <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h3 class="font-bold text-lg mb-2">🔒 Our Commitment to You</h3>
            <ul class="space-y-2 text-gray-700">
              <li *ngFor="let message of trustMessages" class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>{{ message }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TrustBadgesComponent {
  badges: TrustBadge[] = [
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: '45+ destinations scored using intelligent algorithms'
    },
    {
      icon: '📊',
      title: 'Data-Driven',
      description: 'Real-time data from MongoDB for accurate recommendations'
    },
    {
      icon: '🎯',
      title: 'Personalized',
      description: 'Recommendations tailored to your preferences & budget'
    },
    {
      icon: '🔍',
      title: 'Transparent',
      description: 'Every score explained with clear reasoning'
    },
    {
      icon: '💰',
      title: 'No Hidden Fees',
      description: 'Free to use - no commissions affect our recommendations'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get recommendations in seconds, not hours'
    },
    {
      icon: '🛡️',
      title: 'Unbiased',
      description: 'Pure algorithm-based scoring with no promotional bias'
    },
    {
      icon: '🌟',
      title: 'Expert Logic',
      description: 'Built on travel expertise and seasonal insights'
    }
  ];

  trustMessages: string[] = [
    'We never accept payment to influence destination rankings',
    'Our algorithms consider only objective factors: weather, budget, and your interests',
    'Complete transparency - see exactly how each destination is scored',
    'Regular updates with latest travel information and seasonal data',
    'Your privacy matters - we don\'t sell your data or preferences',
    'Affiliate links clearly marked - your trust is our priority'
  ];
}
