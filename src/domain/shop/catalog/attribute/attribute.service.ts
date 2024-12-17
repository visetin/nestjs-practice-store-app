import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAttributeInput,
  FindAttributesOutput,
  UpdateAttributeInput,
} from './attribute.dto';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributesValueRepository } from './attributes-value.repository';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
    private readonly attributesValueRepository: AttributesValueRepository,
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
      await this.attributesValueRepository.create({
        ...valuesDto,
        attributeId: newRecordsId,
      });
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
      const shouldCreate = !valuesDto.id && valuesDto.title;
      const shouldDelete = !valuesDto.title && valuesDto.id;

      if (shouldCreate) {
        await this.attributesValueRepository.create({
          ...valuesDto,
          attributeId,
        });
        continue;
      }

      if (shouldDelete) {
        await this.attributesValueRepository.delete(valuesDto.id);
        continue;
      }

      await this.attributesValueRepository.update(valuesDto.id, valuesDto);
    }
  }

  public async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
