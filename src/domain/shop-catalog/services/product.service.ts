import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductInput, UpdateProductInput } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      skip: offset,
      take: limit,
    });

    return products;
  }

  public async create(dto: CreateProductInput): Promise<number> {
    const product = await this.productRepository.save(dto);

    return product.id;
  }

  public async update(id: number, dto: UpdateProductInput): Promise<void> {
    await this.productRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
