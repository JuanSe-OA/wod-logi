import { WODId } from '@domain/value-objects';
import { WODType } from './WODType';
import { WodName } from '@domain/value-objects/Wod/WodName';
import { WodDescription } from '@domain/value-objects/Wod/WodDescription';

/**
 * Wod Entity
 * Represents a workout definition.
 * This is an AGGREGATE ROOT in DDD terminology.
 * Design decisions:
 * - Immutable ID (cannot change after creation)
 * - Mutable name and email (can be updated)
 * - Private constructor + Factory method pattern
 * - Returns Util<T, E> to force error handling
 */
export class Wod {
  private constructor(
    private readonly id: WODId,
    private name: WodName,
    private description: WodDescription,
    private readonly type: WODType,
    private readonly date: Date,
    private readonly createdAt: Date
  ) {}

  static create(
    id: WODId,
    name: WodName,
    description: WodDescription,
    type: WODType,
    date: Date
  ): Wod {
    return new Wod(id, name, description, type, new Date(date), new Date());
  }

  static reconstitute(
    id: WODId,
    name: WodName,
    description: WodDescription,
    type: WODType,
    date: Date,
    createdAt: Date
  ): Wod {
    return new Wod(id, name, description, type, new Date(date), new Date(createdAt));
  }

  changeName(newName: WodName): void {
    this.name = newName;
  }

  changeDescription(newDescription: WodDescription): void {
    this.description = newDescription;
  }

  getId(): WODId {
    return this.id;
  }

  getName(): WodName {
    return this.name;
  }

  getDescription(): WodDescription {
    return this.description;
  }

  getType(): WODType {
    return this.type;
  }

  getDate(): Date {
    return new Date(this.date);
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }
  toJSON(): {
    id: string;
    name: string;
    description: string;
    type: WODType;
    date: string;
    createdAt: string;
  } {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      description: this.description.getValue(),
      type: this.type,
      date: this.date.toISOString(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
