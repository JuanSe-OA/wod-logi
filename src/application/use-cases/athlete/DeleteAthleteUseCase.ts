import { IAthleteRepository } from '@domain/repositories/IAthleteRepository';
import { AthleteId } from '@domain/value-objects';

export class DeleteAthleteUseCase {
  constructor(private readonly repository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<void> {
    const idOrError = AthleteId.create(athleteId);
    if (idOrError.isErr) {
      throw idOrError.error;
    }

    const existing = await this.repository.findById(idOrError.value);
    if (!existing) {
      throw new Error('Athlete not found');
    }

    await this.repository.deleteById(idOrError.value);
  }
}
