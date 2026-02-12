import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class WodName {
  private constructor(private readonly value: string) {}

  static create(name: string): Util<WodName, ValidationError> {
    if (!name || name.trim().length === 0) {
      return err(new ValidationError('WOD name cannot be empty', 'name'));
    }

    const normalized = name.trim();

    if (normalized.length < 2) {
      return err(new ValidationError('WOD name must be at least 2 characters', 'name'));
    }

    if (normalized.length > 100) {
      return err(new ValidationError('WOD name must not exceed 100 characters', 'name'));
    }

    return ok(new WodName(normalized));
  }

  getValue(): string {
    return this.value;
  }

  equals(other: WodName): boolean {
    return this.value === other.value;
  }
}
