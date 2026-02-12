import { Result } from '@domain/entities/Result';
import { IResultRepository } from '@domain/repositories/IResultRepository';
import { AthleteId, WODId } from '@domain/value-objects';

export class PRService {
  constructor(private readonly repository: IResultRepository) {}

  async getPR(athleteId: AthleteId, wodId: WODId): Promise<Result | null> {
    const results = await this.repository.findByAthleteAndWod(athleteId, wodId);

    if (results.length === 0) {
      return null;
    }

    let best: Result | null = results[0] ?? null;

    for (const result of results.slice(1)) {
      if (best && result.getScore().isBetterThan(best.getScore())) {
        best = result;
      }
    }

    return best;
  }
}
