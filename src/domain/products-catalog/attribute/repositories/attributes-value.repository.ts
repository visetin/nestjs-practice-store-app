import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAttributesValueInput,
  UpdateAttributesValueInput,
} from './dto/attributes-value.dto';
import { AttributesValueEntity } from '../entities/attributes-value.entity';

@Injectable()
export class AttributesValueRepository {
  constructor(
    @InjectRepository(AttributesValueEntity)
    private readonly repository: Repository<AttributesValueEntity>,
  ) {}

  public getRunner() {
    return this.repository;
  }

  public async create(dto: CreateAttributesValueInput): Promise<number> {
    const newEntity = this.repository.create(dto);
    const newRecord = await this.repository.save(newEntity);

    return newRecord.id;
  }

  public async update(
    id: number,
    dto: UpdateAttributesValueInput,
  ): Promise<void> {
    await this.repository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
