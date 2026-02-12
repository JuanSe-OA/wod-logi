import { Wod } from '@domain/entities/Wod';
import { WODId, WodName } from '@domain/value-objects';

export interface IWodRepository {
  save(wod: Wod): Promise<void>;

  findById(id: WODId): Promise<Wod | null>;

  existsByName(name: WodName): Promise<boolean>;
}
