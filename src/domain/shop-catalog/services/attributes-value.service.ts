import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { AttributesValueEntity } from '../entities/attributes-value.entity';
import { CreateAttributesValueInput } from '../dto/attribute.dto';

@Injectable()
export class AttributesValueService {
  constructor(
    @InjectRepository(AttributesValueEntity)
    private readonly attributesValueRepository: Repository<AttributesValueEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesValueEntity[]> {
    const values = await this.attributesValueRepository.find({
      skip: offset,
      take: limit,
    });

    return values;
  }

  public async create(dto: CreateAttributesValueInput): Promise<number> {
    const attributesValue = await this.attributesValueRepository.save(dto);

    return attributesValue.id;
  }

  public async delete(id: number): Promise<void> {
    await this.attributesValueRepository.delete(id);
  }
}
