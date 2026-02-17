import { IAthleteRepository } from '@domain/repositories/IAthleteRepository';
import { AthleteId } from '@domain/value-objects';

export class GetAthleteUseCase {
  constructor(private readonly repository: IAthleteRepository) {}

  async execute(athleteId: string) {
    const athleteIdOrError = AthleteId.create(athleteId);
    if (athleteIdOrError.isErr) {
      throw athleteIdOrError.error;
    }
    return this.repository.findById(athleteIdOrError.value);
  }
}
