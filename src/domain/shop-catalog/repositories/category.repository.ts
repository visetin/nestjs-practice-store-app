import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimitEntriesInput } from '../../../shared/dto/input/limit-entries';
import { UpdateCategoryInput } from '../dto/input/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll({
    limit,
    offset,
  }: LimitEntriesInput): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      skip: offset,
      take: limit,
    });

    return categories;
  }

  async create(name: string): Promise<number> {
    const category = await this.categoryRepository.save({ name });

    return category.id;
  }

  async update({ id, name }: UpdateCategoryInput): Promise<void> {
    await this.categoryRepository.update(id, { name });
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
