import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * SCREEN 2 - DESTINATION SCORING RESULTS (Future Implementation)
 * 
 * Note: Currently, SmartRecommendationsComponent is self-contained and handles
 * its own form input and recommendation logic. This component is a placeholder
 * for a future Screen 2 implementation that will display results from Screen 1.
 * 
 * When integrated with full flow:
 * - Screen 1 collects preferences and calls DestinationScoringEngine
 * - Results are stored in sessionStorage
 * - User navigates to /results
 * - This component retrieves stored results and displays them
 */

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  travelMonth: string = '';
  budgetRange: string = '';
  interests: string[] = [];
  climate: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Placeholder for future Screen 2 implementation
    // This will integrate with the RecommendationEngine output from Screen 1
    this.isLoading = false;
    document.title = 'Destination Recommendations - TripSaver';
  }

  improveAccuracy(): void {
    console.log('Navigating to Trip Readiness form...');
  }

  resetPreferences(): void {
    console.log('Resetting preferences...');
  }
}
