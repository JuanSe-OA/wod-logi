import { err, ok, Util } from '@shared/utils/Utils';
import { ValidationError } from '@shared/errors';

export class ResultId {
  private constructor(private readonly value: string) {}

  static create(id: string): Util<ResultId, ValidationError> {
    if (!id || id.trim().length === 0) {
      return err(new ValidationError('ResultId is required'));
    }

    const normalized = id.trim();

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(normalized)) {
      return err(new ValidationError('Invalid ResultId format'));
    }

    return ok(new ResultId(normalized));
  }

  toString(): string {
    return this.value;
  }

  equals(other: ResultId): boolean {
    return this.value === other.value;
  }
}
