import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/input/limit-entries';
import { AttributesNameEntity } from '../entities/attributes-name.entity';

@Injectable()
export class AttributesNameRepository {
  constructor(
    @InjectRepository(AttributesNameEntity)
    private readonly attributesNameRepository: Repository<AttributesNameEntity>,
  ) {}

  async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesNameEntity[]> {
    const names = await this.attributesNameRepository.find({
      skip: offset,
      take: limit,
    });

    return names;
  }

  async create(value: string): Promise<number> {
    const attributesName = await this.attributesNameRepository.save({ value });

    return attributesName.id;
  }

  async delete(id: number): Promise<void> {
    await this.attributesNameRepository.delete(id);
  }
}
