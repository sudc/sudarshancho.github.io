/**
 * ENGINE BADGE SYSTEM
 * ===================
 * 
 * Visual trust indicators for each engine.
 * Makes AI/logic transparent and builds user confidence.
 * 
 * Design Principles:
 * - Simple and explainable
 * - Non-technical language
 * - Consistent color coding
 * - Reusable across all UI components
 */

// ===========================
// BADGE STYLES (SCSS/CSS)
// ===========================

/*
Copy this to your global styles or component SCSS:
*/

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: help; /* Shows tooltip cursor */
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}

/* Engine-specific badge colors */
.badge-blue {
  background: #eef2ff;
  color: #3730a3;
  border: 1px solid #c7d2fe;
}

.badge-green {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.badge-orange {
  background: #fff7ed;
  color: #9a3412;
  border: 1px solid #fed7aa;
}

.badge-purple {
  background: #f5f3ff;
  color: #5b21b6;
  border: 1px solid #ddd6fe;
}

.badge-gray {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}

/* Score badge variant (for numeric scores) */
.badge-score {
  font-size: 14px;
  padding: 8px 14px;
  font-weight: 700;
  
  .score-value {
    font-size: 18px;
    margin-left: 4px;
  }
}

// ===========================
// BADGE COMPONENTS (Angular)
// ===========================

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type EngineType = 
  | 'destination-scoring'
  | 'trip-readiness-scoring'
  | 'trip-readiness'
  | 'recommendation'
  | 'destination';

export interface BadgeConfig {
  label: string;
  icon: string;
  color: string;
  tooltip: string;
}

@Component({
  selector: 'app-engine-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="'badge badge-' + badgeConfig.color"
      [title]="badgeConfig.tooltip"
      [attr.aria-label]="badgeConfig.tooltip"
    >
      <span class="badge-icon">{{ badgeConfig.icon }}</span>
      <span class="badge-label">{{ badgeConfig.label }}</span>
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class EngineBadgeComponent {
  @Input() engine!: EngineType;
  @Input() score?: number; // Optional for scoring badges
  @Input() customLabel?: string; // Override default label

  get badgeConfig(): BadgeConfig {
    const configs: Record<EngineType, BadgeConfig> = {
      'destination-scoring': {
        label: this.customLabel || 'Best Match',
        icon: '🎯',
        color: 'blue',
        tooltip: 'Ranked using your preferences, budget, travel month, and comfort factors.'
      },
      'trip-readiness-scoring': {
        label: this.customLabel || `Trip Ready: ${this.score || 0}/100`,
        icon: '✅',
        color: 'green',
        tooltip: 'Based on weather, crowd levels, costs, and travel ease for your selected dates.'
      },
      'trip-readiness': {
        label: this.customLabel || 'Preparation Checklist',
        icon: '🧳',
        color: 'orange',
        tooltip: 'Personalized checklist to help you prepare step-by-step before your trip.'
      },
      'recommendation': {
        label: this.customLabel || 'Best Booking Option',
        icon: '💡',
        color: 'purple',
        tooltip: 'Selected based on flexibility, reliability, and traveler needs — not ads.'
      },
      'destination': {
        label: this.customLabel || 'Verified Destination Info',
        icon: '🗺️',
        color: 'gray',
        tooltip: 'Curated from official tourism sources and editorial research.'
      }
    };

    return configs[this.engine];
  }
}

// ===========================
// USAGE EXAMPLES
// ===========================

/**
 * 1. Destination Card (Search Results)
 */
// HTML:
/*
<div class="destination-card">
  <img src="goa.jpg" alt="Goa">
  <h3>Goa</h3>
  
  <!-- Destination Scoring Badge -->
  <app-engine-badge engine="destination-scoring"></app-engine-badge>
  
  <div class="score">Match Score: 95/100</div>
  <p>Perfect for beach lovers in December</p>
  <button>View Details</button>
</div>
*/

/**
 * 2. Destination Detail Page (Above Fold)
 */
// HTML:
/*
<div class="destination-header">
  <h1>Goa</h1>
  
  <!-- Trip Readiness Scoring Badge -->
  <app-engine-badge 
    engine="trip-readiness-scoring" 
    [score]="88">
  </app-engine-badge>
  
  <div class="quick-facts">
    <span>✅ Excellent Weather</span>
    <span>⚠️ High Crowds</span>
    <span>💰 Moderate Cost</span>
  </div>
</div>
*/

/**
 * 3. Trip Preparation Section
 */
// HTML:
/*
<div class="preparation-section">
  <h2>Get Ready for Your Trip</h2>
  
  <!-- Trip Readiness Badge -->
  <app-engine-badge engine="trip-readiness"></app-engine-badge>
  
  <div class="checklist-progress">
    <span>12 of 40 tasks complete</span>
    <progress value="30" max="100"></progress>
  </div>
  
  <button>View Full Checklist</button>
</div>
*/

/**
 * 4. Booking Button
 */
// HTML:
/*
<button class="booking-button">
  <app-engine-badge engine="recommendation"></app-engine-badge>
  <span>Book on Agoda</span>
</button>
*/

/**
 * 5. Destination Info Footer
 */
// HTML:
/*
<footer class="destination-info-footer">
  <app-engine-badge engine="destination"></app-engine-badge>
  <p>Sources: Incredible India, Wikipedia Climate Data, Editorial Research</p>
</footer>
*/

// ===========================
// COMBINED BADGE DISPLAY
// ===========================

/**
 * Show multiple badges for transparency
 */
// HTML:
/*
<div class="trust-indicators">
  <h4>Why We Recommend This</h4>
  
  <div class="badges">
    <app-engine-badge 
      engine="destination-scoring"
      customLabel="95/100 Match">
    </app-engine-badge>
    
    <app-engine-badge 
      engine="trip-readiness-scoring"
      [score]="88">
    </app-engine-badge>
    
    <app-engine-badge 
      engine="destination"
      customLabel="Verified Info">
    </app-engine-badge>
  </div>
  
  <a href="/methodology">Learn how we score</a>
</div>
*/

// ===========================
// TOOLTIP ENHANCEMENT
// ===========================

/**
 * For better tooltips, consider using Angular Material Tooltip
 * or a custom tooltip directive
 */

import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'custom-tooltip';
    this.tooltipElement.textContent = this.tooltipText;
    
    document.body.appendChild(this.tooltipElement);
    
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.top = `${rect.bottom + 5}px`;
    this.tooltipElement.style.left = `${rect.left}px`;
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}

// Usage with tooltip:
/*
<app-engine-badge 
  engine="destination-scoring"
  appTooltip="Ranked using your preferences, budget, travel month, and comfort factors.">
</app-engine-badge>
*/

// ===========================
// RESPONSIVE BADGE STYLES
// ===========================

/*
@media (max-width: 640px) {
  .badge {
    font-size: 11px;
    padding: 5px 10px;
    gap: 4px;
  }
  
  .badge-icon {
    font-size: 14px;
  }
  
  .badge-score {
    font-size: 12px;
    padding: 6px 10px;
    
    .score-value {
      font-size: 16px;
    }
  }
}
*/

// ===========================
// ACCESSIBILITY
// ===========================

/**
 * Ensure badges are accessible:
 * - Use aria-label for screen readers
 * - Provide title attribute for tooltips
 * - Use semantic HTML
 * - Ensure color contrast meets WCAG AA standards
 */

// ===========================
// BADGE ANIMATION (OPTIONAL)
// ===========================

/*
@keyframes badge-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.badge-new {
  animation: badge-pulse 2s ease-in-out infinite;
}
*/

// ===========================
// EXPORT
// ===========================

export { EngineBadgeComponent, TooltipDirective };
