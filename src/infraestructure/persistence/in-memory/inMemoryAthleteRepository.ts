import { IAthleteRepository } from '@domain/repositories/IAthleteRepository';
import { Athlete } from '@domain/entities/Athlete';
import { AthleteId, AthleteEmail } from '@domain/value-objects';

export class InMemoryAthleteRepository implements IAthleteRepository {
  private athletes: Map<string, Athlete> = new Map();

  save(athlete: Athlete): Promise<void> {
    this.athletes.set(athlete.getId().getValue(), athlete);
    return Promise.resolve();
  }
  findById(id: AthleteId): Promise<Athlete | null> {
    return Promise.resolve(this.athletes.get(id.getValue()) ?? null);
  }
  findByEmail(email: AthleteEmail): Promise<Athlete | null> {
    for (const athlete of this.athletes.values()) {
      if (athlete.getEmail().equals(email)) {
        return Promise.resolve(athlete);
      }
    }
    return Promise.resolve(null);
  }

  deleteById(id: AthleteId): Promise<void> {
    this.athletes.delete(id.getValue());
    return Promise.resolve();
  }
}
