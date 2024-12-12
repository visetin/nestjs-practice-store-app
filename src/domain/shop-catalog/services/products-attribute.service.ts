import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { ProductsAttributeEntity } from '../entities/products-attribute.entity';
import {
  CreateProductsAttributeInput,
  UpdateProductsAttributeInput,
} from '../dto/product.dto';

@Injectable()
export class ProductsAttributeService {
  constructor(
    @InjectRepository(ProductsAttributeEntity)
    private readonly productsAttributeRepository: Repository<ProductsAttributeEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<ProductsAttributeEntity[]> {
    const productsAttribute = await this.productsAttributeRepository.find({
      skip: offset,
      take: limit,
    });

    return productsAttribute;
  }

  public async create(dto: CreateProductsAttributeInput): Promise<number> {
    const productsAttribute = await this.productsAttributeRepository.save(dto);

    return productsAttribute.id;
  }

  public async update(
    id: number,
    dto: UpdateProductsAttributeInput,
  ): Promise<void> {
    await this.productsAttributeRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.productsAttributeRepository.delete(id);
  }
}
