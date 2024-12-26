import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributesValueRepository } from '../repositories/attributes-value.repository';
import { AttributeRepository } from '../repositories/attribute.repository';
import {
  CreateValueInput,
  UpdateValueInput,
  CreateInput,
  FindAllOutput,
  FindOneOutput,
  UpdateInput,
} from './dto/attribute.dto';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributesValueRepository: AttributesValueRepository,
  ) {}

  private async createValue(dto: CreateValueInput): Promise<number> {
    return await this.attributesValueRepository.create(dto);
  }

  private async updateValue(id: number, dto: UpdateValueInput): Promise<void> {
    await this.attributesValueRepository.update(id, dto);
  }

  private async deleteValue(id: number): Promise<void> {
    await this.attributesValueRepository.delete(id);
  }

  public async findAll(): Promise<FindAllOutput[]> {
    const repoRunner = this.attributeRepository.getRunner();

    return await repoRunner.find();
  }

  public async findOne(id: number): Promise<FindOneOutput> {
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

    const attributeId = await this.attributeRepository.create(attributeDto);

    for (const valuesDto of valuesDtoList) {
      await this.createValue({ ...valuesDto, attributeId });
    }

    return attributeId;
  }

  public async update(attributeId: number, dto: UpdateInput): Promise<void> {
    const { values: valuesDtoList, ...attributeDto } = dto;

    await this.attributeRepository.update(attributeId, attributeDto);

    for (const valuesDto of valuesDtoList) {
      const shouldCreate = !valuesDto.id && valuesDto.title;
      const shouldDelete = !valuesDto.title && valuesDto.id;

      if (shouldCreate) {
        await this.createValue({ ...valuesDto, attributeId });
        continue;
      }

      if (shouldDelete) {
        await this.deleteValue(valuesDto.id);
        continue;
      }

      await this.updateValue(valuesDto.id, valuesDto);
    }
  }

  public async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
