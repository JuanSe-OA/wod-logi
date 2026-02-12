import { AthleteId, ResultId, WODId } from '@domain/value-objects';
import { Score } from '@domain/value-objects/Score';

export class Result {
  private constructor(
    private readonly id: ResultId,
    private readonly athleteId: AthleteId,
    private readonly wodId: WODId,
    private readonly score: Score,
    private readonly completedAt: Date,
    private readonly isRx: boolean,
    private readonly notes?: string
  ) {}

  static create(
    id: ResultId,
    athleteId: AthleteId,
    wodId: WODId,
    score: Score,
    isRx: boolean,
    notes?: string
  ): Result {
    return new Result(id, athleteId, wodId, score, new Date(), isRx, notes?.trim());
  }

  getId(): ResultId {
    return this.id;
  }

  getScore(): Score {
    return this.score;
  }

  getCompletedAt(): Date {
    return new Date(this.completedAt);
  }
  getIsRx(): boolean {
    return this.isRx;
  }

  getNotes(): string | undefined {
    return this.notes;
  }
  getAthleteId(): AthleteId {
    return this.athleteId;
  }

  getWodId(): WODId {
    return this.wodId;
  }
}
