import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/limit-entries';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      skip: offset,
      take: limit,
    });

    return categories;
  }

  public async create(dto: CreateCategoryInput): Promise<number> {
    const category = await this.categoryRepository.save(dto);

    return category.id;
  }

  public async update(id: number, dto: UpdateCategoryInput): Promise<void> {
    await this.categoryRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
