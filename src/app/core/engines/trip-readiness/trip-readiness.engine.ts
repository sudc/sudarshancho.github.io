/**
 * TRIP READINESS ENGINE
 * =====================
 * 
 * Evaluates user readiness for a trip based on multiple factors:
 * - Budget preparedness
 * - Document validity
 * - Time availability
 * - Seasonal timing
 */

import { Injectable } from '@angular/core';
import { BaseEngine, BaseEngineConfig, BaseEngineResult } from '../base.engine';

export interface TripReadinessInput {
  budget: {
    available: number;
    estimated: number;
  };
  documents: {
    passport?: {
      valid: boolean;
      expiryDate?: Date;
    };
    visa?: {
      required: boolean;
      valid: boolean;
    };
  };
  timing: {
    departureDate: Date;
    returnDate: Date;
    flexibility: 'fixed' | 'flexible' | 'very-flexible';
  };
  destination: {
    type: 'domestic' | 'international';
    seasonality: 'peak' | 'off-peak' | 'shoulder';
  };
}

export interface ReadinessScore {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs-attention' | 'critical';
  recommendations: string[];
}

export interface TripReadinessResult extends BaseEngineResult {
  overallScore: number;
  overallStatus: 'ready' | 'almost-ready' | 'needs-preparation' | 'not-ready';
  scores: ReadinessScore[];
  actionItems: string[];
  estimatedPreparationTime: string;
}

@Injectable()
export class TripReadinessEngine extends BaseEngine<TripReadinessInput, TripReadinessResult> {
  
  protected config: BaseEngineConfig = {
    name: 'TripReadinessEngine',
    version: '1.0.0',
    enabled: true
  };

  async process(input: TripReadinessInput): Promise<TripReadinessResult> {
    this.log('Starting trip readiness evaluation');

    if (!this.validateInput(input)) {
      throw new Error('Invalid input for trip readiness');
    }

    const scores: ReadinessScore[] = [];
    const actionItems: string[] = [];

    // 1. Budget Readiness
    const budgetScore = this.evaluateBudget(input, actionItems);
    scores.push(budgetScore);

    // 2. Document Readiness
    const documentScore = this.evaluateDocuments(input, actionItems);
    scores.push(documentScore);

    // 3. Timing Readiness
    const timingScore = this.evaluateTiming(input, actionItems);
    scores.push(timingScore);

    // 4. Seasonal Readiness
    const seasonalScore = this.evaluateSeasonal(input, actionItems);
    scores.push(seasonalScore);

    // Calculate overall score
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const totalMaxScore = scores.reduce((sum, s) => sum + s.maxScore, 0);
    const overallScore = Math.round((totalScore / totalMaxScore) * 100);

    const overallStatus = this.getOverallStatus(overallScore);
    const estimatedPreparationTime = this.estimatePreparationTime(scores, input);

    this.log(`Trip readiness: ${overallScore}% - ${overallStatus}`);

    return {
      engineName: this.config.name,
      timestamp: new Date(),
      success: true,
      overallScore,
      overallStatus,
      scores,
      actionItems,
      estimatedPreparationTime
    };
  }

  protected validateInput(input: TripReadinessInput): boolean {
    return !!input?.budget && 
           !!input?.timing?.departureDate &&
           !!input?.destination;
  }

  private evaluateBudget(input: TripReadinessInput, actionItems: string[]): ReadinessScore {
    const { available, estimated } = input.budget;
    const ratio = available / estimated;
    let score = 0;
    let status: ReadinessScore['status'] = 'critical';
    const recommendations: string[] = [];

    if (ratio >= 1.2) {
      score = 25;
      status = 'excellent';
      recommendations.push('You have comfortable budget buffer');
    } else if (ratio >= 1.0) {
      score = 22;
      status = 'good';
      recommendations.push('Budget is adequate with small buffer');
    } else if (ratio >= 0.8) {
      score = 15;
      status = 'needs-attention';
      recommendations.push('Consider saving 20% more for comfort');
      actionItems.push(`Save additional ₹${Math.round((estimated - available))} for trip buffer`);
    } else {
      score = 8;
      status = 'critical';
      recommendations.push('Significant budget gap - postpone or reduce scope');
      actionItems.push(`Need ₹${Math.round((estimated - available))} more to meet budget`);
    }

    return {
      category: 'Budget Preparedness',
      score,
      maxScore: 25,
      status,
      recommendations
    };
  }

  private evaluateDocuments(input: TripReadinessInput, actionItems: string[]): ReadinessScore {
    let score = 0;
    let status: ReadinessScore['status'] = 'excellent';
    const recommendations: string[] = [];

    if (input.destination.type === 'domestic') {
      score = 25;
      recommendations.push('No special documents required for domestic travel');
    } else {
      // International travel
      if (input.documents.passport?.valid) {
        const expiryDate = input.documents.passport.expiryDate;
        if (expiryDate) {
          const monthsToExpiry = this.getMonthsDifference(new Date(), expiryDate);
          
          if (monthsToExpiry >= 6) {
            score += 15;
            recommendations.push('Passport is valid');
          } else if (monthsToExpiry >= 3) {
            score += 10;
            status = 'needs-attention';
            recommendations.push('Passport expires soon - consider renewal');
            actionItems.push('Renew passport - expires in less than 6 months');
          } else {
            score += 3;
            status = 'critical';
            recommendations.push('Passport renewal urgent');
            actionItems.push('URGENT: Renew passport immediately');
          }
        }
      } else {
        status = 'critical';
        recommendations.push('Valid passport required');
        actionItems.push('Apply for passport (4-6 weeks processing)');
      }

      // Visa check
      if (input.documents.visa?.required) {
        if (input.documents.visa.valid) {
          score += 10;
          recommendations.push('Visa is valid');
        } else {
          status = 'critical';
          recommendations.push('Visa required but not obtained');
          actionItems.push('Apply for visa (processing time varies)');
        }
      } else {
        score += 10;
        recommendations.push('No visa required or visa-on-arrival available');
      }
    }

    return {
      category: 'Document Readiness',
      score,
      maxScore: 25,
      status,
      recommendations
    };
  }

  private evaluateTiming(input: TripReadinessInput, actionItems: string[]): ReadinessScore {
    const daysUntilDeparture = this.getDaysDifference(new Date(), input.timing.departureDate);
    const tripDuration = this.getDaysDifference(input.timing.departureDate, input.timing.returnDate);
    
    let score = 0;
    let status: ReadinessScore['status'] = 'excellent';
    const recommendations: string[] = [];

    // Planning lead time
    if (daysUntilDeparture >= 60) {
      score += 15;
      recommendations.push('Excellent planning lead time');
    } else if (daysUntilDeparture >= 30) {
      score += 12;
      status = 'good';
      recommendations.push('Good planning time for bookings');
    } else if (daysUntilDeparture >= 14) {
      score += 8;
      status = 'needs-attention';
      recommendations.push('Book soon to avoid price surge');
      actionItems.push('Book flights and hotels within 3 days');
    } else {
      score += 4;
      status = 'critical';
      recommendations.push('Very short notice - limited availability');
      actionItems.push('URGENT: Book immediately - very limited time');
    }

    // Flexibility bonus
    if (input.timing.flexibility === 'very-flexible') {
      score += 10;
      recommendations.push('High flexibility helps find best deals');
    } else if (input.timing.flexibility === 'flexible') {
      score += 7;
      recommendations.push('Some flexibility available');
    } else {
      score += 3;
      recommendations.push('Fixed dates may limit options');
    }

    return {
      category: 'Timing & Planning',
      score,
      maxScore: 25,
      status,
      recommendations
    };
  }

  private evaluateSeasonal(input: TripReadinessInput, actionItems: string[]): ReadinessScore {
    let score = 0;
    let status: ReadinessScore['status'] = 'excellent';
    const recommendations: string[] = [];

    switch (input.destination.seasonality) {
      case 'off-peak':
        score = 25;
        status = 'excellent';
        recommendations.push('Off-peak: Best prices and fewer crowds');
        recommendations.push('Great value for money');
        break;
      
      case 'shoulder':
        score = 20;
        status = 'good';
        recommendations.push('Shoulder season: Good balance of weather and prices');
        break;
      
      case 'peak':
        score = 12;
        status = 'needs-attention';
        recommendations.push('Peak season: Higher prices expected');
        recommendations.push('Book early for better rates');
        actionItems.push('Consider travel insurance due to peak season crowds');
        break;
    }

    return {
      category: 'Seasonal Timing',
      score,
      maxScore: 25,
      status,
      recommendations
    };
  }

  private getOverallStatus(score: number): TripReadinessResult['overallStatus'] {
    if (score >= 85) return 'ready';
    if (score >= 70) return 'almost-ready';
    if (score >= 50) return 'needs-preparation';
    return 'not-ready';
  }

  private estimatePreparationTime(scores: ReadinessScore[], input: TripReadinessInput): string {
    const criticalItems = scores.filter(s => s.status === 'critical').length;
    const needsAttention = scores.filter(s => s.status === 'needs-attention').length;

    if (criticalItems > 0) {
      if (input.destination.type === 'international' && !input.documents.passport?.valid) {
        return '4-8 weeks (passport processing)';
      }
      return '2-4 weeks';
    }

    if (needsAttention > 0) {
      return '1-2 weeks';
    }

    return '3-5 days';
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    const diff = date2.getTime() - date1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  private getMonthsDifference(date1: Date, date2: Date): number {
    return (date2.getFullYear() - date1.getFullYear()) * 12 + 
           (date2.getMonth() - date1.getMonth());
  }
}
