import { IAthleteRepository } from '@domain/repositories/IAthleteRepository';
import { AthleteEmail, AthleteId, AthleteName } from '@domain/value-objects';
import { randomUUID } from 'crypto';
import { Athlete } from '@domain/entities/Athlete';

export interface CreateAthleteInput {
  name: string;
  email: string;
}

export interface CreateAthleteOutput {
  athleteId: string;
}

export class CreateAthleteUseCase {
  constructor(private readonly repository: IAthleteRepository) {}

  async execute(input: CreateAthleteInput): Promise<CreateAthleteOutput> {
    const idOrError = AthleteId.create(randomUUID());
    if (idOrError.isErr) {
      throw idOrError.error;
    }

    const nameOrError = AthleteName.create(input.name);
    if (nameOrError.isErr) {
      throw nameOrError.error;
    }

    const emailOrError = AthleteEmail.create(input.email);
    if (emailOrError.isErr) {
      throw emailOrError.error;
    }

    const athlete = Athlete.create(idOrError.value, nameOrError.value, emailOrError.value);

    await this.repository.save(athlete);

    return {
      athleteId: idOrError.value.getValue(),
    };
  }
}
