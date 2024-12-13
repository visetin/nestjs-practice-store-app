import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { LimitEntriesInput } from '../../../../shared/dto/limit-entries';
import { OfferEntity } from '../entities/offer.entity';
// import { CreateOfferInput, UpdateOfferInput } from '../dto/offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
  ) {}
}
