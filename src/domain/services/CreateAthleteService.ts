import { Athlete } from '@domain/entities/Athlete';
import { IAthleteRepository } from '@domain/repositories/IAthleteRepository';
import { AthleteEmail, AthleteId, AthleteName } from '@domain/value-objects';
import { ValidationError } from '@shared/errors';
import { err, ok, Util } from '@shared/utils/Utils';

export class CreateAthleteService {
  constructor(private readonly repository: IAthleteRepository) {}

  async execute(id: string, name: string, email: string): Promise<Util<Athlete, ValidationError>> {
    const idVO = AthleteId.create(id);
    if (idVO.isErr) {
      return idVO;
    }
    const nameVO = AthleteName.create(name);
    if (nameVO.isErr) {
      return nameVO;
    }

    const emailVO = AthleteEmail.create(email);
    if (emailVO.isErr) {
      return emailVO;
    }

    const exists = await this.repository.existsByEmail(emailVO.value);
    if (exists) {
      return err(new ValidationError('Email already in use'));
    }

    const athlete = Athlete.create(idVO.value, nameVO.value, emailVO.value);

    await this.repository.save(athlete);

    return ok(athlete);
  }
}
