import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationScoringEngine } from '../../core/engines/destination-scoring/destination-scoring.engine';

@Component({
  selector: 'app-engine-test',
  standalone: true,
  imports: [CommonModule],
  providers: [DestinationScoringEngine],
  template: `
    <div style="padding: 20px;">
      <h2>Engine Test</h2>
      <button (click)="testEngine()">Test Destination Scoring</button>
      <pre *ngIf="result">{{ result | json }}</pre>
    </div>
  `
})
export class EngineTestComponent {
  result: any = null;

  constructor(private engine: DestinationScoringEngine) {}

  async testEngine() {
    this.result = await this.engine.process({
      userPreferences: {
        categories: ['Beach'],
        month: 12,
        budget: 'moderate'
      }
    });
  }
}
