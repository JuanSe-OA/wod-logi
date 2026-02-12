import { Result } from '@domain/entities/Result';
import { AthleteId, ResultId, WODId } from '@domain/value-objects';

export interface IResultRepository {
  save(result: Result): Promise<void>;

  findById(id: ResultId): Promise<Result | null>;

  findByAthleteAndWod(athleteId: AthleteId, wodId: WODId): Promise<Result[]>;

  delete(id: ResultId): Promise<void>;
}
