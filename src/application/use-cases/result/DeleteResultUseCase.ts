import { IResultRepository } from '@domain/repositories/IResultRepository';
import { ResultId } from '@domain/value-objects/ResultId';

export class DeleteResultUseCase {
  constructor(private readonly repository: IResultRepository) {}

  async execute(resultId: string): Promise<void> {
    const idOrError = ResultId.create(resultId);
    if (idOrError.isErr) {
      throw idOrError.error;
    }

    const existing = await this.repository.findById(idOrError.value);
    if (!existing) {
      throw new Error('Result not found');
    }

    await this.repository.delete(idOrError.value);
  }
}
