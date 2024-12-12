import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { OfferEntity } from '../entities/offer.entity';
import { CreateOfferInput, UpdateOfferInput } from '../dto/offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<OfferEntity[]> {
    const offers = await this.offerRepository.find({
      skip: offset,
      take: limit,
    });

    return offers;
  }

  public async create(dto: CreateOfferInput): Promise<number> {
    const offer = await this.offerRepository.save(dto);

    return offer.id;
  }

  public async update(id: number, dto: UpdateOfferInput): Promise<void> {
    await this.offerRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }
}
