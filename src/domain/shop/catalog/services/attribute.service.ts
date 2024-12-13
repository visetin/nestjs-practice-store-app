import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FindAttributeOutput,
  CreateAttributeInput,
} from '../dto/attribute.dto';
import { AttributeEntity } from '../entities/attribute.entity';
import { AttributesGroupEntity } from '../entities/attributes-group.entity';
import { AttributesValueEntity } from '../entities/attributes-value.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
    @InjectRepository(AttributesGroupEntity)
    private readonly attributesGroupRepository: Repository<AttributesGroupEntity>,
    @InjectRepository(AttributesValueEntity)
    private readonly attributesValueRepository: Repository<AttributesValueEntity>,
  ) {}

  public async findAll(): Promise<FindAttributeOutput[]> {
    const attributes = await this.attributeRepository.find({
      select: ['id', 'title', 'group', 'values'],
    });

    return attributes;
  }

  public async findOneById(id: number): Promise<FindAttributeOutput> {
    const attribute = await this.attributeRepository.findOne({
      select: ['id', 'title', 'group', 'values'],
      where: { id },
    });

    return attribute;
  }

  public async create({
    title,
    groupId,
    values,
  }: CreateAttributeInput): Promise<number> {
    const newAttribute = this.attributeRepository.create({ title, groupId });

    // todo: add transaction
    await this.attributeRepository.save(newAttribute);
    values.forEach(async (title) => {
      await this.createValue(title);
    });

    return newAttribute.id;
  }

  public async createGroup(title: string): Promise<number> {
    const newGroup = this.attributesGroupRepository.create({ title });

    await this.attributesGroupRepository.save(newGroup);

    return newGroup.id;
  }

  public async createValue(title: string): Promise<number> {
    const newValue = this.attributesValueRepository.create({ title });

    await this.attributesValueRepository.save(newValue);

    return newValue.id;
  }
}
