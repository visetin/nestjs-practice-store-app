import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from './category.dto';

@Controller('shop/catalog/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAll(): Promise<any> {
    return await this.categoryService.findAll();
  }

  @Post()
  public async create(@Body() dto: CreateCategoryInput) {
    const id = await this.categoryService.create(dto);

    return { id };
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryInput,
  ) {
    await this.categoryService.update(id, dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    await this.categoryService.delete(id);
  }
}
