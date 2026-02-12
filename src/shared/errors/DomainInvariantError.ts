import { DomainError } from './DomainError';

/**
 * Thrown when a business rule is violated
 * Examples:
 * - Cannot record a result for a future WOD
 * - Cannot have a negative PR
 * - Cannot delete an athlete with existing results
 * This is different from ValidationError:
 * - ValidationError: Input is malformed
 * - DomainInvariantError: Input is valid, but breaks a business rule
 */
export class DomainInvariantError extends DomainError {
  constructor(message: string) {
    super(message, 'DOMAIN_INVARIANT_VIOLATION', 422);
  }
}
