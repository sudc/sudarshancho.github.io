/**
 * ENGINE FACTORY
 * ===============
 * 
 * Centralized factory for creating and managing engines.
 * Provides easy access to all engines with dependency injection.
 * 
 * Benefits:
 * - Single point of access for all engines
 * - Lazy loading of engines
 * - Type-safe engine access
 * - Easy to add new engines
 */

import { Injectable } from '@angular/core';
import { RecommendationEngine } from './recommendation/recommendation.engine';
import { TripReadinessEngine } from './trip-readiness/trip-readiness.engine';
import { DestinationEngine } from './destination/destination.engine';
import { DestinationScoringEngine } from './destination-scoring/destination-scoring.engine';
import { TripReadinessScoringEngine } from './trip-readiness/trip-readiness-scoring.engine';
import { EngineType, getEngineMetadata, isEngineEnabled } from './base.engine';

/**
 * Engine Factory Service
 * Note: Not providedIn root to avoid eager instantiation
 */
@Injectable()
export class EngineFactory {
  
  constructor(
    private recommendationEngine: RecommendationEngine,
    private tripReadinessEngine: TripReadinessEngine,
    private destinationEngine: DestinationEngine,
    private destinationScoringEngine: DestinationScoringEngine,
    private tripReadinessScoringEngine: TripReadinessScoringEngine
  ) {}

  /**
   * Get Recommendation Engine
   */
  getRecommendationEngine(): RecommendationEngine {
    this.validateEngine(EngineType.RECOMMENDATION);
    return this.recommendationEngine;
  }

  /**
   * Get Trip Readiness Engine
   */
  getTripReadinessEngine(): TripReadinessEngine {
    this.validateEngine(EngineType.TRIP_READINESS);
    return this.tripReadinessEngine;
  }

  /**
   * Get Destination Engine
   */
  getDestinationEngine(): DestinationEngine {
    this.validateEngine(EngineType.DESTINATION);
    return this.destinationEngine;
  }

  /**
   * Get Destination Scoring Engine
   */
  getDestinationScoringEngine(): DestinationScoringEngine {
    this.validateEngine(EngineType.DESTINATION_SCORING);
    return this.destinationScoringEngine;
  }

  /**
   * Get Trip Readiness Scoring Engine
   */
  getTripReadinessScoringEngine(): TripReadinessScoringEngine {
    this.validateEngine(EngineType.TRIP_READINESS_SCORING);
    return this.tripReadinessScoringEngine;
  }

  /**
   * Get engine by type (generic access)
   */
  getEngine(type: EngineType): RecommendationEngine | TripReadinessEngine | DestinationEngine | DestinationScoringEngine | TripReadinessScoringEngine | null {
    switch (type) {
      case EngineType.RECOMMENDATION:
        return this.getRecommendationEngine();
      case EngineType.TRIP_READINESS:
        return this.getTripReadinessEngine();
      case EngineType.DESTINATION:
        return this.getDestinationEngine();
      case EngineType.DESTINATION_SCORING:
        return this.getDestinationScoringEngine();
      case EngineType.TRIP_READINESS_SCORING:
        return this.getTripReadinessScoringEngine();
      default:
        console.error(`Unknown engine type: ${type}`);
        return null;
    }
  }

  /**
   * Check if engine is available
   */
  isEngineAvailable(type: EngineType): boolean {
    return isEngineEnabled(type);
  }

  /**
   * Get all available engines
   */
  getAvailableEngines(): EngineType[] {
    return Object.values(EngineType).filter(type => this.isEngineAvailable(type));
  }

  /**
   * Validate engine before use
   */
  private validateEngine(type: EngineType): void {
    if (!this.isEngineAvailable(type)) {
      const metadata = getEngineMetadata(type);
      throw new Error(`Engine "${metadata?.name}" is not available or disabled`);
    }
  }
}

/**
 * USAGE EXAMPLES
 * ==============
 * 
 * // In any component or service:
 * 
 * constructor(private engineFactory: EngineFactory) {}
 * 
 * // Use Recommendation Engine
 * const recEngine = this.engineFactory.getRecommendationEngine();
 * const recommendations = recEngine.generateRecommendations(preferences);
 * 
 * // Use Trip Readiness Engine
 * const tripEngine = this.engineFactory.getTripReadinessEngine();
 * const readiness = tripEngine.process(tripData);
 * 
 * // Check engine availability
 * if (this.engineFactory.isEngineAvailable(EngineType.TRIP_READINESS)) {
 *   // Use engine
 * }
 * 
 * // Get all available engines
 * const engines = this.engineFactory.getAvailableEngines();
 * console.log('Available engines:', engines);
 */
