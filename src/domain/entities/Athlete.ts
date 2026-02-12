import { AthleteEmail, AthleteId, AthleteName } from '@domain/value-objects';

/**
 * Athlete Entity
 * Represents a user who performs workouts.
 * This is an AGGREGATE ROOT in DDD terminology.
 * Design decisions:
 * - Immutable ID (cannot change after creation)
 * - Mutable name and email (can be updated)
 * - Private constructor + Factory method pattern
 * - Returns Util<T, E> to force error handling
 */
export class Athlete {
  private constructor(
    private readonly id: AthleteId,
    private name: AthleteName,
    private email: AthleteEmail,
    private readonly createdAt: Date
  ) {}

  static create(id: AthleteId, name: AthleteName, email: AthleteEmail): Athlete {
    return new Athlete(id, name, email, new Date());
  }

  static reconstitute(
    id: AthleteId,
    name: AthleteName,
    email: AthleteEmail,
    createdAt: Date
  ): Athlete {
    return new Athlete(id, name, email, new Date(createdAt));
  }

  changeName(newName: AthleteName): void {
    this.name = newName;
  }

  changeEmail(newEmail: AthleteEmail): void {
    this.email = newEmail;
  }

  getId(): AthleteId {
    return this.id;
  }

  getName(): AthleteName {
    return this.name;
  }

  getEmail(): AthleteEmail {
    return this.email;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  toJSON(): {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
