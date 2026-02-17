import { Wod } from '@domain/entities/Wod';
import { IWodRepository } from '@domain/repositories/IWodRepository';
import { WODId, WodName } from '@domain/value-objects';

export class InMemoryWodRepsotory implements IWodRepository {
  private wods: Map<string, Wod> = new Map();

  save(wod: Wod): Promise<void> {
    this.wods.set(wod.getId().getValue(), wod);
    return Promise.resolve();
  }
  findById(id: WODId): Promise<Wod | null> {
    return Promise.resolve(this.wods.get(id.getValue()) ?? null);
  }
  existsByName(name: WodName): Promise<boolean> {
    for (const wod of this.wods.values()) {
      if (wod.getName().equals(name)) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }
}
