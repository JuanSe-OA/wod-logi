import { Result } from '@domain/entities/Result';
import { IResultRepository } from '@domain/repositories/IResultRepository';
import { AthleteId, ResultId, WODId } from '@domain/value-objects';

export class InMemoryWorkoutResultRepository implements IResultRepository {
  private results: Map<string, Result> = new Map();

  save(result: Result): Promise<void> {
    this.results.set(result.getId().getValue(), result);
    return Promise.resolve();
  }

  findById(id: ResultId): Promise<Result | null> {
    return Promise.resolve(this.results.get(id.getValue()) ?? null);
  }

  findByAthleteAndWod(athleteId: AthleteId, wodId: WODId): Promise<Result[]> {
    const filtered = Array.from(this.results.values()).filter(
      (result) => result.getAthleteId().equals(athleteId) && result.getWodId().equals(wodId)
    );
    return Promise.resolve(filtered);
  }

  delete(id: ResultId): Promise<void> {
    this.results.delete(id.getValue());
    return Promise.resolve();
  }
}
