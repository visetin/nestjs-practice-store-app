import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { LimitEntriesInput } from '../../../../shared/dto/limit-entries';
import { ProductEntity } from '../entities/product.entity';
// import { CreateProductInput, UpdateProductInput } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
}
