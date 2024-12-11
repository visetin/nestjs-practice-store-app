import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttributeInput } from '../dto/input/create-attribute.dto';
import { AttributeEntity } from '../entities/attribute.entity';

@Injectable()
export class AttributeRepository {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
  ) {}

  public async create({
    nameId,
    valueId,
    groupId,
  }: CreateAttributeInput): Promise<number> {
    const attribute = await this.attributeRepository.save({
      nameId,
      valueId,
      groupId,
    });

    return attribute.id;
  }

  public async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
