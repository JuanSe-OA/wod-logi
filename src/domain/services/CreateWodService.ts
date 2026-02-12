import { Wod } from '@domain/entities/Wod';
import { WODType } from '@domain/entities/WODType';
import { IWodRepository } from '@domain/repositories/IWodRepository';
import { WodDescription, WODId, WodName } from '@domain/value-objects';
import { ValidationError } from '@shared/errors';
import { err, Util, ok } from '@shared/utils/Utils';

export class CreateWodService {
  constructor(private readonly repository: IWodRepository) {}

  async execute(
    id: string,
    name: string,
    description: string,
    type: WODType,
    date: Date
  ): Promise<Util<Wod, ValidationError>> {
    const idVO = WODId.create(id);
    if (idVO.isErr) {
      return idVO;
    }

    const nameVO = WodName.create(name);
    if (nameVO.isErr) {
      return nameVO;
    }

    const descriptionVO = WodDescription.create(description);
    if (descriptionVO.isErr) {
      return descriptionVO;
    }

    const exists = await this.repository.existsByName(nameVO.value);
    if (exists) {
      return err(new ValidationError('WOD name already exists', 'name'));
    }

    const wod = Wod.create(idVO.value, nameVO.value, descriptionVO.value, type, date);

    await this.repository.save(wod);

    return ok(wod);
  }
}
