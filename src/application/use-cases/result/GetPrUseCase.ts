import { IResultRepository } from '@domain/repositories/IResultRepository';
import { AthleteId } from '@domain/value-objects/Athlete/AthleteId';
import { WODId } from '@domain/value-objects/Wod/WodId';

export class GetPRUseCase {
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

    const results = await this.repository.findByAthleteAndWod(
      athleteIdOrError.value,
      wodIdOrError.value
    );

    if (results.length === 0) {
      return null;
    }

    let best = results[0];

    for (const r of results.slice(1)) {
      if (best && r.getScore().isBetterThan(best.getScore())) {
        best = r;
      }
    }

    return best;
  }
}
