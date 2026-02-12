import { err, ok, Result } from '../../shared/utils/result';
import { ValidationError } from '@shared/errors';

class AthleteId {
  private constructor(private value: string) {}

  static create(id: string): Result<AthleteId, ValidationError> {
    if (!id || id.trim().length === 0) {
      return err(new ValidationError('Athlete ID is required.'));
    }
    const normalized = id.trim();

    const uuidRegex = /^[0-9a-f-]{36}$/i;
    if (uuidRegex.test(normalized)) {
      return err(new ValidationError('Invalid Athlete ID format.'));
    }

    return ok(new AthleteId(id));
  }
  equals(other: AthleteId): boolean {
    return this.value === other.value;
  }
  getValue(): string {
    return this.value;
  }
  toString(): string {
    return this.value;
  }
}
