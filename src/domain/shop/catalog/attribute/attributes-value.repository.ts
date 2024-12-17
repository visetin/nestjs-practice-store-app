import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateValueWithDependenciesInput,
  UpdateValueInput,
} from './attribute.dto';
import { AttributesValueEntity } from './entities/attributes-value.entity';

@Injectable()
export class AttributesValueRepository {
  constructor(
    @InjectRepository(AttributesValueEntity)
    private readonly attributesValueRepository: Repository<AttributesValueEntity>,
  ) {}

  public async create(dto: CreateValueWithDependenciesInput): Promise<number> {
    const newEntity = this.attributesValueRepository.create(dto);
    const newRecord = await this.attributesValueRepository.save(newEntity);

    return newRecord.id;
  }

  public async update(id: number, dto: UpdateValueInput): Promise<void> {
    await this.attributesValueRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.attributesValueRepository.delete(id);
  }
}
