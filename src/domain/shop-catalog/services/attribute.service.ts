import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAttributeInput,
  // FindAttributeOutput,
} from '../dto/attribute.dto';
import { AttributeEntity } from '../entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
  ) {}

  // public async findAll(): Promise<FindAttributeOutput[]> {}

  public async create(dto: CreateAttributeInput): Promise<number> {
    const attribute = await this.attributeRepository.save(dto);

    return attribute.id;
  }

  public async delete(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
