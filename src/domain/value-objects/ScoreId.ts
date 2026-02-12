import { Result, ok, err } from '@shared/utils/result';
import { ValidationError } from '@shared/errors';

/**
 * Score Type - Different ways to measure workout performance
 * - TIME: Completion time (e.g., 15:30 for "Fran")
 * - REPS: Number of repetitions completed (e.g., AMRAP)
 * - WEIGHT: Load lifted (e.g., 1RM Back Squat)
 * - ROUNDS_REPS: Rounds + Reps (e.g., "5 rounds + 12 reps")
 */
export enum ScoreType {
  TIME = 'TIME',
  REPS = 'REPS',
  WEIGHT = 'WEIGHT',
  ROUNDS_REPS = 'ROUNDS_REPS',
}

/**
 * Score Value Object
 * Represents the result/score of a workout.
 * Immutable and self-validating.
 * Examples:
 * - Score.createTime(930) → 15:30 (930 seconds)
 * - Score.createReps(150) → 150 reps
 * - Score.createWeight(225) → 225 lbs
 * - Score.createRoundsReps(5, 12) → 5 rounds + 12 reps
 */
export class Score {
  private constructor(
    private readonly type: ScoreType,
    private readonly primaryValue: number,
    private readonly secondaryValue?: number
  ) {}

  /**
   * Create a TIME score (in seconds)
   */
  static createTime(seconds: number): Result<Score, ValidationError> {
    if (seconds < 0) {
      return err(new ValidationError('Time cannot be negative', 'score'));
    }

    if (seconds > 86400) {
      // 24 hours max
      return err(new ValidationError('Time cannot exceed 24 hours', 'score'));
    }

    return ok(new Score(ScoreType.TIME, seconds));
  }

  /**
   * Create a REPS score
   */
  static createReps(reps: number): Result<Score, ValidationError> {
    if (reps < 0) {
      return err(new ValidationError('Reps cannot be negative', 'score'));
    }

    if (!Number.isInteger(reps)) {
      return err(new ValidationError('Reps must be a whole number', 'score'));
    }

    return ok(new Score(ScoreType.REPS, reps));
  }

  /**
   * Create a WEIGHT score (in pounds)
   */
  static createWeight(weight: number): Result<Score, ValidationError> {
    if (weight <= 0) {
      return err(new ValidationError('Weight must be positive', 'score'));
    }

    if (weight > 10000) {
      return err(new ValidationError('Weight seems unrealistic', 'score'));
    }

    return ok(new Score(ScoreType.WEIGHT, weight));
  }

  /**
   * Create a ROUNDS_REPS score
   */
  static createRoundsReps(rounds: number, reps: number): Result<Score, ValidationError> {
    if (rounds < 0 || reps < 0) {
      return err(new ValidationError('Rounds and reps cannot be negative', 'score'));
    }

    if (!Number.isInteger(rounds) || !Number.isInteger(reps)) {
      return err(new ValidationError('Rounds and reps must be whole numbers', 'score'));
    }

    return ok(new Score(ScoreType.ROUNDS_REPS, rounds, reps));
  }

  /**
   * Get the score type
   */
  getType(): ScoreType {
    return this.type;
  }

  /**
   * Format score as human-readable string
   */
  toString(): string {
    switch (this.type) {
      case ScoreType.TIME: {
        const minutes = Math.floor(this.primaryValue / 60);
        const seconds = this.primaryValue % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
      case ScoreType.REPS:
        return `${this.primaryValue} reps`;
      case ScoreType.WEIGHT:
        return `${this.primaryValue} lbs`;
      case ScoreType.ROUNDS_REPS:
        return `${this.primaryValue} rounds + ${this.secondaryValue} reps`;
      default:
        return 'Unknown score';
    }
  }

  /**
   * Compare scores for PR calculation
   * Returns true if this score is better than the other
   * Better means:
   * - TIME: Lower is better
   * - REPS: Higher is better
   * - WEIGHT: Higher is better
   * - ROUNDS_REPS: More rounds/reps is better
   */
  isBetterThan(other: Score): boolean {
    if (this.type !== other.type) {
      throw new Error('Cannot compare scores of different types');
    }

    switch (this.type) {
      case ScoreType.TIME:
        return this.primaryValue < other.primaryValue;
      case ScoreType.REPS:
      case ScoreType.WEIGHT:
        return this.primaryValue > other.primaryValue;
      case ScoreType.ROUNDS_REPS: {
        if (this.primaryValue !== other.primaryValue) {
          return this.primaryValue > other.primaryValue;
        }
        return (this.secondaryValue ?? 0) > (other.secondaryValue ?? 0);
      }
      default:
        return false;
    }
  }

  /**
   * Serialize for storage
   */
  toJSON(): {
    type: ScoreType;
    primaryValue: number;
    secondaryValue?: number;
  } {
    return {
      type: this.type,
      primaryValue: this.primaryValue,
      secondaryValue: this.secondaryValue,
    };
  }

  /**
   * Deserialize from storage
   */
  static fromJSON(json: {
    type: ScoreType;
    primaryValue: number;
    secondaryValue?: number;
  }): Result<Score, ValidationError> {
    switch (json.type) {
      case ScoreType.TIME:
        return Score.createTime(json.primaryValue);
      case ScoreType.REPS:
        return Score.createReps(json.primaryValue);
      case ScoreType.WEIGHT:
        return Score.createWeight(json.primaryValue);
      case ScoreType.ROUNDS_REPS:
        return Score.createRoundsReps(json.primaryValue, json.secondaryValue ?? 0);
      default:
        return err(new ValidationError('Invalid score type', 'score'));
    }
  }
}
