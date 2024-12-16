import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAttributeInput,
  CreateAttributesValueInput,
  FindAttributesOutput,
  UpdateAttributeInput,
  UpdateAttributesValueInput,
} from './attribute.dto';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributesValueEntity } from './entities/attributes-value.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
    @InjectRepository(AttributesValueEntity)
    private readonly attributesValueRepository: Repository<AttributesValueEntity>,
  ) {}

  public async findAll(): Promise<FindAttributesOutput[]> {
    return await this.attributeRepository.find({
      select: ['id', 'title', 'values'],
      relations: ['values'],
    });
  }

  public async findOneById(id: number): Promise<FindAttributesOutput> {
    const attribute = await this.attributeRepository.findOne({
      select: ['id', 'title', 'values'],
      relations: ['values'],
      where: { id },
    });

    if (!attribute) {
      throw new NotFoundException();
    }

    return attribute;
  }

  public async create(dto: CreateAttributeInput): Promise<number> {
    const { values: valuesDtoList, ...attributesDto } = dto;

    const newEntity = this.attributeRepository.create(attributesDto);

    // todo: add transaction
    const newRecord = await this.attributeRepository.save(newEntity);
    const newRecordsId = newRecord.id;

    for (const valuesDto of valuesDtoList) {
      await this.createValue({ ...valuesDto, attributeId: newRecordsId });
    }

    return newRecordsId;
  }

  public async update(
    attributeId: number,
    dto: UpdateAttributeInput,
  ): Promise<void> {
    const { values: valuesDtoList, ...attributesDto } = dto;

    // todo: add transaction
    await this.attributeRepository.update(attributeId, attributesDto);
    for (const valuesDto of valuesDtoList) {
      if (!valuesDto.title) {
        await this.deleteValue(valuesDto.id);
        continue;
      }

      if (!valuesDto.id) {
        await this.createValue({ ...valuesDto, attributeId });
        continue;
      }

      await this.updateValue(valuesDto.id, valuesDto);
    }
  }

  public async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }

  public async createValue(dto: CreateAttributesValueInput): Promise<number> {
    const newEntity = this.attributesValueRepository.create(dto);
    const newRecord = await this.attributesValueRepository.save(newEntity);

    return newRecord.id;
  }

  public async updateValue(
    id: number,
    dto: UpdateAttributesValueInput,
  ): Promise<void> {
    await this.attributesValueRepository.update(id, dto);
  }

  public async deleteValue(id: number): Promise<void> {
    await this.attributesValueRepository.delete(id);
  }
}
