import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  CreateCategoryInput,
  FindCategoriesOutput,
  UpdateCategoryInput,
} from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async findAll(): Promise<FindCategoriesOutput[]> {
    return await this.categoryRepository.find({
      select: ['id', 'title'],
    });
  }

  public async create(dto: CreateCategoryInput): Promise<number> {
    const newEntity = this.categoryRepository.create(dto);
    const newRecord = await this.categoryRepository.save(newEntity);

    return newRecord.id;
  }

  public async update(id: number, dto: UpdateCategoryInput): Promise<void> {
    await this.categoryRepository.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
