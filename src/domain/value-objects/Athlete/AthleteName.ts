import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class AthleteName {
  private constructor(private readonly value: string) {}

  static create(name: string): Util<AthleteName, ValidationError> {
    if (!name || name.trim().length === 0) {
      return err(new ValidationError('Name cannot be empty', 'name'));
    }

    const normalized = name.trim();

    if (normalized.length < 2) {
      return err(new ValidationError('Name must be at least 2 characters', 'name'));
    }

    if (normalized.length > 100) {
      return err(new ValidationError('Name must not exceed 100 characters', 'name'));
    }

    return ok(new AthleteName(normalized));
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AthleteName): boolean {
    return this.value === other.value;
  }
}
