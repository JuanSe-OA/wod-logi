import { IWodRepository } from '@domain/repositories/IWodRepository';
import { WODId } from '@domain/value-objects';
import { randomUUID } from 'crypto';
import { Wod } from '@domain/entities/Wod';
import { WodName } from '@domain/value-objects/Wod/WodName';
import { WodDescription } from '@domain/value-objects/Wod/WodDescription';
import { WODType } from '@domain/entities/WODType';

export interface CreateWodInput {
  name: string;
  description: string;
  type: WODType;
  date: Date;
}

export interface CreateWodOutput {
  wodId: string;
}

export class CreateWodUseCase {
  constructor(private readonly repository: IWodRepository) {}

  async execute(input: CreateWodInput): Promise<CreateWodOutput> {
    const idOrError = WODId.create(randomUUID());
    if (idOrError.isErr) {
      throw idOrError.error;
    }

    const nameOrError = WodName.create(input.name);
    if (nameOrError.isErr) {
      throw nameOrError.error;
    }

    const descriptionOrError = WodDescription.create(input.description);
    if (descriptionOrError.isErr) {
      throw descriptionOrError.error;
    }

    const wod = Wod.create(
      idOrError.value,
      nameOrError.value,
      descriptionOrError.value,
      input.type,
      input.date
    );

    await this.repository.save(wod);

    return {
      wodId: idOrError.value.toValue(),
    };
  }
}
