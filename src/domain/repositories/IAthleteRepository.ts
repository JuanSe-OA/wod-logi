import { Athlete } from '@domain/entities/Athlete';
import { AthleteEmail, AthleteId } from '@domain/value-objects';

export interface IAthleteRepository {
  save(athlete: Athlete): Promise<void>;

  findById(id: AthleteId): Promise<Athlete | null>;

  findByEmail(email: AthleteEmail): Promise<Athlete | null>;

  deleteById(id: AthleteId): Promise<void>;
}
