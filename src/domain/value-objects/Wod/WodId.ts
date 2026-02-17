import { Util, ok, err } from '@shared/utils/Utils';
import { ValidationError } from '@shared/errors';

/**
 * WODId Value Object
 * Represents a unique identifier for a Workout of the Day.
 * Typically based on the date (e.g., "2024-01-15") but could be custom.
 * Why separate from AthleteId?
 * - Different validation rules
 * - Different domain semantics
 * - Type safety prevents mixing IDs
 */
export class WODId {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 50;
  private static readonly VALID_PATTERN = /^[a-zA-Z0-9_-]+$/;

  private constructor(private readonly value: string) {}

  /**
   * Factory method for creating WODId
   */
  static create(id: string): Util<WODId, ValidationError> {
    if (!id || id.trim().length === 0) {
      return err(new ValidationError('WOD ID cannot be empty', 'wodId'));
    }

    const trimmedId = id.trim().toLocaleLowerCase();

    if (trimmedId.length < this.MIN_LENGTH) {
      return err(
        new ValidationError(`WOD ID must be at least ${this.MIN_LENGTH} characters`, 'wodId')
      );
    }

    if (trimmedId.length > this.MAX_LENGTH) {
      return err(
        new ValidationError(`WOD ID must not exceed ${this.MAX_LENGTH} characters`, 'wodId')
      );
    }

    if (!this.VALID_PATTERN.test(trimmedId)) {
      return err(
        new ValidationError(
          'WOD ID can only contain letters, numbers, underscores, and hyphens',
          'wodId'
        )
      );
    }

    return ok(new WODId(trimmedId));
  }

  /**
   * Create WODId from a date (common pattern: "2024-01-15")
   */
  static fromDate(date: Date): Util<WODId, ValidationError> {
    const dateString = date.toISOString().split('T')[0];
    if (!dateString) {
      return err(new ValidationError('Invalid date format', 'wodId'));
    }
    return WODId.create(dateString);
  }

  toString(): string {
    return this.value;
  }

  equals(other?: WODId): boolean {
    if (!other) {
      return false;
    }
    return this.value === other?.value;
  }

  getValue(): string {
    return this.value;
  }
}
