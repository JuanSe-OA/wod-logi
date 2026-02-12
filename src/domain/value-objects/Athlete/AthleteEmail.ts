import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class AthleteEmail {
  private constructor(private readonly value: string) {}

  static create(email: string): Util<AthleteEmail, ValidationError> {
    if (!email || email.trim().length === 0) {
      return err(new ValidationError('Email cannot be empty', 'email'));
    }

    const normalized = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalized)) {
      return err(new ValidationError('Invalid email format', 'email'));
    }

    return ok(new AthleteEmail(normalized));
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AthleteEmail): boolean {
    return this.value === other.value;
  }
}
