import { ScoreType } from '@domain/entities/ScoreType';
import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class Score {
  private constructor(
    private readonly type: ScoreType,
    private readonly primary: number,
    private readonly secondary?: number
  ) {}

  static create(
    type: ScoreType,
    primary: number,
    secondary?: number
  ): Util<Score, ValidationError> {
    if (primary < 0) {
      return err(new ValidationError('Score value cannot be negative'));
    }

    if (type === ScoreType.ROUNDS_REPS) {
      if (secondary === undefined) {
        return err(new ValidationError('Secondary value required for rounds and reps'));
      }

      if (secondary < 0) {
        return err(new ValidationError('Secondary value cannot be negative'));
      }
    }

    if (type !== ScoreType.ROUNDS_REPS && secondary !== undefined) {
      return err(new ValidationError('Secondary value not allowed for this score type'));
    }

    return ok(new Score(type, primary, secondary));
  }
  isBetterThan(other: Score): boolean {
    if (this.type !== other.type) {
      throw new Error('Cannot compare scores of different types');
    }

    switch (this.type) {
      case ScoreType.TIME:
        return this.primary < other.primary;

      case ScoreType.REPS:
        return this.primary > other.primary;

      case ScoreType.WEIGHT:
        return this.primary > other.primary;

      case ScoreType.ROUNDS_REPS:
        if (this.primary > other.primary) {
          return true;
        }

        if (this.primary === other.primary) {
          return (this.secondary ?? 0) > (other.secondary ?? 0);
        }

        return false;

      default:
        throw new Error('Unknown score type');
    }
  }

  getType(): ScoreType {
    return this.type;
  }

  getPrimary(): number {
    return this.primary;
  }

  getSecondary(): number | undefined {
    return this.secondary;
  }
}
