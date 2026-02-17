import { Result } from '@domain/entities/Result';
import { ScoreType } from '@domain/entities/ScoreType';
import { IResultRepository } from '@domain/repositories/IResultRepository';
import { AthleteId, ResultId, WODId } from '@domain/value-objects';
import { Score } from '@domain/value-objects/Score';
import { randomUUID } from 'crypto';

export interface CreateResultInput {
  athleteId: string;
  wodId: string;
  scoreType: ScoreType;
  primaryValue: number;
  secondaryValue?: number;
  isRx: boolean;
  notes?: string;
}

export interface CreateResultOutput {
  resultId: string;
  completedAt: Date;
}
export class CreateResultUseCase {
  constructor(private readonly repository: IResultRepository) {}

  async execute(input: CreateResultInput): Promise<CreateResultOutput> {
    const athleteIdOrError = AthleteId.create(input.athleteId);
    if (athleteIdOrError.isErr) {
      throw athleteIdOrError.error;
    }

    const wodIdOrError = WODId.create(input.wodId);
    if (wodIdOrError.isErr) {
      throw wodIdOrError.error;
    }

    const resultIdOrError = ResultId.create(randomUUID());
    if (resultIdOrError.isErr) {
      throw resultIdOrError.error;
    }

    const scoreOrError = Score.create(input.scoreType, input.primaryValue, input.secondaryValue);

    if (scoreOrError.isErr) {
      throw scoreOrError.error;
    }

    const result = Result.create(
      resultIdOrError.value,
      athleteIdOrError.value,
      wodIdOrError.value,
      scoreOrError.value,
      input.isRx,
      input.notes
    );

    await this.repository.save(result);

    return {
      resultId: result.getId().toString(),
      completedAt: result.getCompletedAt(),
    };
  }
}
