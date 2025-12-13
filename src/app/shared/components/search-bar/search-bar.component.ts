import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { SearchService, SearchResult } from '../../../core/services/search/search.service';
import { AnalyticsService } from '../../../core/services/analytics/analytics.service';
import { ComparisonService, ComparisonResult } from '../../../core/services/comparison/comparison.service';
import { ComparisonCardComponent } from '../comparison-card/comparison-card.component';

@Component({
	selector: 'app-search-bar',
	standalone: true,
    imports: [CommonModule, ComparisonCardComponent],
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
	public searchResults: SearchResult[] = [];
	public comparisonResults: ComparisonResult[] = [];
	public showDropdown = false;
	public showComparison = false;
	public isSearching = false;
	public isLoadingComparison = false;

	public destination = '';
	public checkin = '';
	public checkout = '';

	private searchSubject = new Subject<string>();

	@Output() search = new EventEmitter<{destination:string,checkin:string,checkout:string}>();

	constructor(
		private router: Router,
		private searchService: SearchService,
		private analytics: AnalyticsService,
		private comparisonService: ComparisonService
	) {
		// Set up smart search with debounce
		this.searchSubject.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((query: string) => {
				if (!query || query.trim().length < 2) {
					return of([]);
				}
				this.isSearching = true;
				return this.searchService.searchHotels(query);
			})
		).subscribe({
			next: (results: SearchResult[]) => {
				this.searchResults = results;
				this.showDropdown = results.length > 0;
				this.isSearching = false;
			},
			error: (err: any) => {
				console.error('Search error:', err);
				this.isSearching = false;
			}
		});
	}

	onInputChange(value: string) {
		this.destination = value;
		this.searchSubject.next(value);
	}

	onHotelSelect(hotel: SearchResult) {
		// Close dropdown
		this.showDropdown = false;
		this.destination = hotel.hotelName;
		
		// Track search selection
		this.analytics.trackEvent('hotel_selected', {
			hotel_name: hotel.hotelName,
			city: hotel.city,
			country: hotel.country
		});
		
		// Load comparison results based on selected hotel
		this.loadComparisonResults(hotel.hotelName, hotel.city);
	}

	loadComparisonResults(searchQuery: string, city?: string) {
		this.isLoadingComparison = true;
		this.showComparison = true;
		
		this.comparisonService.compareHotels({
			category: 'hotels',
			searchQuery,
			city,
			maxResults: 4
		}).subscribe({
			next: (results: ComparisonResult[]) => {
				this.comparisonResults = results;
				this.isLoadingComparison = false;
			},
			error: (err: any) => {
				console.error('Comparison error:', err);
				this.isLoadingComparison = false;
			}
		});
	}

	closeComparison() {
		this.showComparison = false;
		this.comparisonResults = [];
	}

	onSubmit(e: Event) {
		e.preventDefault();
		if (!this.destination) return;
		
		// Track search query
		this.analytics.trackEvent('search_query', {
			search_term: this.destination,
			has_dates: !!(this.checkin && this.checkout)
		});
		
		// If there's an exact match in results, use that hotel
		if (this.searchResults.length > 0) {
			const exactMatch = this.searchResults.find(r => 
				r.hotelName.toLowerCase() === this.destination.toLowerCase()
			);
			if (exactMatch) {
				this.onHotelSelect(exactMatch);
				return;
			}
		}
		
		// Otherwise, load comparison results based on search query
		this.loadComparisonResults(this.destination);
		
		this.search.emit({ destination: this.destination, checkin: this.checkin, checkout: this.checkout });
	}

	onBlur() {
		// Delay to allow click on dropdown item
		setTimeout(() => {
			this.showDropdown = false;
		}, 200);
	}
}
