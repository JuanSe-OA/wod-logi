import { DomainError } from './DomainError';

/**
 * Thrown when input validation fails
 
 * Examples:
 * - Invalid email format
 * - ID too short
 * - Negative score
 * - Missing required field
 */

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string
  ) {
    super(message, 'VALIDATION_ERROR', 400);
  }

  override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      field: this.field,
    };
  }
}
