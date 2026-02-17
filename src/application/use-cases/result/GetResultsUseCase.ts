import { IResultRepository } from '@domain/repositories/IResultRepository';
import { AthleteId } from '@domain/value-objects/Athlete/AthleteId';
import { WODId } from '@domain/value-objects/Wod/WodId';

export class GetResultsUseCase {
  constructor(private readonly repository: IResultRepository) {}

  async execute(athleteId: string, wodId: string) {
    const athleteIdOrError = AthleteId.create(athleteId);
    if (athleteIdOrError.isErr) {
      throw athleteIdOrError.error;
    }

    const wodIdOrError = WODId.create(wodId);
    if (wodIdOrError.isErr) {
      throw wodIdOrError.error;
    }

    return this.repository.findByAthleteAndWod(athleteIdOrError.value, wodIdOrError.value);
  }
}
