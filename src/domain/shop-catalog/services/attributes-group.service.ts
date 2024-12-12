import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { AttributesGroupEntity } from '../entities/attributes-group.entity';
import { CreateAttributesGroupInput } from '../dto/attribute.dto';

@Injectable()
export class AttributesGroupService {
  constructor(
    @InjectRepository(AttributesGroupEntity)
    private readonly attributesGroupRepository: Repository<AttributesGroupEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesGroupEntity[]> {
    const groups = await this.attributesGroupRepository.find({
      skip: offset,
      take: limit,
    });

    return groups;
  }

  public async create(dto: CreateAttributesGroupInput): Promise<number> {
    const attributesGroup = await this.attributesGroupRepository.save(dto);

    return attributesGroup.id;
  }

  public async delete(id: number): Promise<void> {
    await this.attributesGroupRepository.delete(id);
  }
}
