import { DomainError } from './DomainError';

/**
 * Thrown when an entity is not found
 
 * Examples:
 * - Athlete with ID "abc123" doesn't exist
 * - WOD for date "2024-01-15" not found
 */
export class NotFoundError extends DomainError {
  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier '${identifier}' not found`, 'NOT_FOUND', 404);
  }
}
