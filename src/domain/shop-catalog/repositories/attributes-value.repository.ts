import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/input/limit-entries';
import { AttributesValueEntity } from '../entities/attributes-value.entity';

@Injectable()
export class AttributesValueRepository {
  constructor(
    @InjectRepository(AttributesValueEntity)
    private readonly attributesValueRepository: Repository<AttributesValueEntity>,
  ) {}

  async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesValueEntity[]> {
    const values = await this.attributesValueRepository.find({
      skip: offset,
      take: limit,
    });

    return values;
  }

  async create(value: string): Promise<number> {
    const attributesValue = await this.attributesValueRepository.save({
      value,
    });

    return attributesValue.id;
  }

  async delete(id: number): Promise<void> {
    await this.attributesValueRepository.delete(id);
  }
}
