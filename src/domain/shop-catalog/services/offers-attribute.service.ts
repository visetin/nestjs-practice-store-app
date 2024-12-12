import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { OffersAttributeEntity } from '../entities/offers-attribute.entity';
import {
  CreateOffersAttributeInput,
  UpdateOffersAttributeInput,
} from '../dto/offer.dto';

@Injectable()
export class OffersAttributeService {
  constructor(
    @InjectRepository(OffersAttributeEntity)
    private readonly offersAttributeRepository: Repository<OffersAttributeEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<OffersAttributeEntity[]> {
    const offersAttributes = await this.offersAttributeRepository.find({
      skip: offset,
      take: limit,
    });

    return offersAttributes;
  }

  public async create(dto: CreateOffersAttributeInput): Promise<number> {
    const offersAttribute = await this.offersAttributeRepository.save(dto);

    return offersAttribute.id;
  }

  public async update(
    id: number,
    dto: UpdateOffersAttributeInput,
  ): Promise<void> {
    await this.offersAttributeRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.offersAttributeRepository.delete(id);
  }
}
