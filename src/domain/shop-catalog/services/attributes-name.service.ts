import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { AttributesNameEntity } from '../entities/attributes-name.entity';
import { CreateAttributesNameInput } from '../dto/attribute.dto';

@Injectable()
export class AttributesNameService {
  constructor(
    @InjectRepository(AttributesNameEntity)
    private readonly attributesNameRepository: Repository<AttributesNameEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<AttributesNameEntity[]> {
    const names = await this.attributesNameRepository.find({
      skip: offset,
      take: limit,
    });

    return names;
  }

  public async create(dto: CreateAttributesNameInput): Promise<number> {
    const attributesName = await this.attributesNameRepository.save(dto);

    return attributesName.id;
  }

  public async delete(id: number): Promise<void> {
    await this.attributesNameRepository.delete(id);
  }
}
