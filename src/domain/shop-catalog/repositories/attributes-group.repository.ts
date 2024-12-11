import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/input/limit-entries';
import { AttributesGroupEntity } from '../entities/attributes-group.entity';

@Injectable()
export class AttributesGroupRepository {
  constructor(
    @InjectRepository(AttributesGroupEntity)
    private readonly attributesGroupRepository: Repository<AttributesGroupEntity>,
  ) {}

  async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesGroupEntity[]> {
    const groups = await this.attributesGroupRepository.find({
      skip: offset,
      take: limit,
    });

    return groups;
  }

  async create(name: string): Promise<number> {
    const attributesGroup = await this.attributesGroupRepository.save({ name });

    return attributesGroup.id;
  }

  async delete(id: number): Promise<void> {
    await this.attributesGroupRepository.delete(id);
  }
}
