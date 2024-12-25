import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAttributeInput,
  UpdateAttributeInput,
} from './dto/attribute.dto';
import { AttributeEntity } from '../entities/attribute.entity';

@Injectable()
export class AttributeRepository {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly repository: Repository<AttributeEntity>,
  ) {}

  public getRunner() {
    return this.repository;
  }

  public async create(dto: CreateAttributeInput): Promise<number> {
    const newEntity = this.repository.create(dto);
    const newRecord = await this.repository.save(newEntity);

    return newRecord.id;
  }

  public async update(id: number, dto: UpdateAttributeInput): Promise<void> {
    await this.repository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
