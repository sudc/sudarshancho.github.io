import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonResult } from '../../../core/services/comparison/comparison.service';

/**
 * Reusable Comparison Card Component
 * 
 * Can be used on any page to display comparison results
 * Automatically adapts to single or multi-partner mode
 */
@Component({
  selector: 'app-comparison-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="comparison-card" [class.featured]="featured">
      <div class="comparison-badge" *ngIf="featured">
        <span class="material-icons">star</span>
        Best Match
      </div>

      <div class="partner-badge" [style.background-color]="result.partnerColor">
        {{ result.partnerName }}
      </div>

      <div class="image-container">
        <img [src]="result.imageUrl" [alt]="result.name" loading="lazy">
      </div>

      <div class="content">
        <h3 class="hotel-name">{{ result.name }}</h3>
        <p class="location">
          <span class="material-icons">location_on</span>
          {{ result.location }}
        </p>

        <div class="rating-section">
          <div class="stars">
            <span class="material-icons" *ngFor="let star of getStarArray()">star</span>
            <span class="rating-value">{{ result.rating }}</span>
          </div>
        </div>

        <div class="amenities" *ngIf="result.amenities && result.amenities.length > 0">
          <span class="amenity" *ngFor="let amenity of result.amenities.slice(0, 3)">
            {{ amenity }}
          </span>
        </div>

        <div class="price-section">
          <div class="price-info">
            <span class="price-label">Starting from</span>
            <div class="price">
              <span class="currency">{{ result.currency }}</span>
              <span class="amount">{{ result.price | number:'1.0-0' }}</span>
            </div>
            <span class="price-note">per night</span>
          </div>
        </div>

        <button 
          class="book-button" 
          (click)="onBookClick()"
          [style.background-color]="result.partnerColor">
          <span>View on {{ result.partnerName }}</span>
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </article>
  `,
  styles: [`
    .comparison-card {
      background: white;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      }

      &.featured {
        border: 2px solid #fbbf24;
      }
    }

    .comparison-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.875rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);

      .material-icons {
        font-size: 16px;
      }
    }

    .partner-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #3b82f6;
      color: white;
      padding: 0.375rem 0.875rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      z-index: 10;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: #f1f5f9;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .comparison-card:hover & img {
        transform: scale(1.1);
      }
    }

    .content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .hotel-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #6b7280;
      font-size: 0.9375rem;
      margin-bottom: 0.75rem;

      .material-icons {
        font-size: 18px;
      }
    }

    .rating-section {
      margin-bottom: 0.75rem;
    }

    .stars {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      .material-icons {
        font-size: 18px;
        color: #fbbf24;
      }

      .rating-value {
        margin-left: 0.5rem;
        font-weight: 700;
        color: #1f2937;
      }
    }

    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .amenity {
        background: #f1f5f9;
        color: #475569;
        padding: 0.375rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8125rem;
        font-weight: 600;
      }
    }

    .price-section {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      margin-bottom: 1rem;
    }

    .price-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .price-label {
      font-size: 0.8125rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .price {
      display: flex;
      align-items: baseline;
      gap: 0.375rem;

      .currency {
        font-size: 1rem;
        font-weight: 700;
        color: #1f2937;
      }

      .amount {
        font-size: 2rem;
        font-weight: 800;
        color: #1f2937;
        line-height: 1;
      }
    }

    .price-note {
      font-size: 0.8125rem;
      color: #9ca3af;
    }

    .book-button {
      width: 100%;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
      }

      &:active {
        transform: translateY(0);
      }

      .material-icons {
        font-size: 20px;
        transition: transform 0.2s ease;
      }

      &:hover .material-icons {
        transform: translateX(4px);
      }
    }

    @media (max-width: 640px) {
      .image-container {
        height: 160px;
      }

      .content {
        padding: 1.25rem;
      }

      .hotel-name {
        font-size: 1.125rem;
      }

      .price .amount {
        font-size: 1.75rem;
      }
    }
  `]
})
export class ComparisonCardComponent {
  @Input() result!: ComparisonResult;
  @Input() featured: boolean = false;
  @Output() bookClick = new EventEmitter<ComparisonResult>();

  getStarArray(): number[] {
    const fullStars = Math.floor(this.result.rating);
    return Array(Math.min(fullStars, 5)).fill(0);
  }

  onBookClick(): void {
    this.bookClick.emit(this.result);
    window.open(this.result.partnerUrl, '_blank');
  }
}
