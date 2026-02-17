import { IWodRepository } from '@domain/repositories/IWodRepository';
import { WODId } from '@domain/value-objects';

export class GetWodUseCase {
  constructor(private readonly repository: IWodRepository) {}
  async execute(wodId: string) {
    const wodIdOrError = WODId.create(wodId);
    if (wodIdOrError.isErr) {
      throw wodIdOrError.error;
    }
    return this.repository.findById(wodIdOrError.value);
  }
}
