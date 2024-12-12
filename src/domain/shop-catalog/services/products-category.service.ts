import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsCategoryEntity } from '../entities/products-category.entity';
import { LimitEntriesInput } from 'src/shared/dto/limit-entries';
import {
  CreateProductsCategoryInput,
  UpdateProductsCategoryInput,
} from '../dto/product.dto';

@Injectable()
export class ProductsCategoryService {
  constructor(
    @InjectRepository(ProductsCategoryEntity)
    private readonly productsCategoryRepository: Repository<ProductsCategoryEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<ProductsCategoryEntity[]> {
    const categories = await this.productsCategoryRepository.find({
      skip: offset,
      take: limit,
    });

    return categories;
  }

  public async create(dto: CreateProductsCategoryInput): Promise<number> {
    const productsCategory = await this.productsCategoryRepository.save(dto);

    return productsCategory.id;
  }

  public async update(
    id: number,
    dto: UpdateProductsCategoryInput,
  ): Promise<void> {
    await this.productsCategoryRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.productsCategoryRepository.delete(id);
  }
}
