import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributesValueRepository } from '../repositories/attributes-value.repository';
import { AttributeRepository } from '../repositories/attribute.repository';
import { CreateInput, UpdateInput } from './dto/attribute.dto';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributesValueRepository: AttributesValueRepository,
  ) {}

  public async findAll(): Promise<any[]> {
    const repoRunner = this.attributeRepository.getRunner();

    return await repoRunner.find();
  }

  public async findAllWithValues(): Promise<any[]> {
    const repoRunner = this.attributeRepository.getRunner();

    return await repoRunner.find({
      relations: ['values'],
    });
  }

  public async findOne(id: number): Promise<any> {
    const repoRunner = this.attributeRepository.getRunner();

    const record = await repoRunner.findOne({
      where: { id },
      relations: ['values'],
    });

    if (!record) {
      throw new NotFoundException();
    }

    return record;
  }

  public async create(dto: CreateInput): Promise<number> {
    const { values: valuesDtoList, ...attributeDto } = dto;

    const newAttributeId = await this.attributeRepository.create(attributeDto);

    for (const valuesDto of valuesDtoList) {
      await this.attributesValueRepository.create({
        ...valuesDto,
        attributeId: newAttributeId,
      });
    }

    return newAttributeId;
  }

  public async update(attributeId: number, dto: UpdateInput): Promise<void> {
    const { values: valuesDtoList, ...attributeDto } = dto;

    await this.attributeRepository.update(attributeId, attributeDto);

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
