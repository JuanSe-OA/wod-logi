import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class WodDescription {
  private constructor(private readonly value: string) {}

  static create(description: string): Util<WodDescription, ValidationError> {
    if (!description || description.trim().length === 0) {
      return err(new ValidationError('WOD description cannot be empty', 'description'));
    }

    const normalized = description.trim();

    if (normalized.length > 1000) {
      return err(
        new ValidationError('WOD description must not exceed 1000 characters', 'description')
      );
    }

    return ok(new WodDescription(normalized));
  }

  getValue(): string {
    return this.value;
  }

  equals(other: WodDescription): boolean {
    return this.value === other.value;
  }
}
