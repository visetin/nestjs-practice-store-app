import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { LimitEntriesInput } from '../../../../shared/dto/limit-entries';
import { CategoryEntity } from '../entities/category.entity';
// import { CreateCategoryInput, UpdateCategoryInput } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
}
