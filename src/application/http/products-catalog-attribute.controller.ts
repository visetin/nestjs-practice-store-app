import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import {
  CreateProductsCatalogAttributeRequest,
  UpdateProductsCatalogAttributeRequest,
} from './products-catalog-attribute.request';
import { ProductsCatalogAttributeService } from '../../domain/products-catalog/attribute';

@Controller('products-catalog/attribute')
export class ProductsCatalogAttributeController {
  constructor(
    private readonly attributeService: ProductsCatalogAttributeService,
  ) {}

  @Get()
  public async findAll() {
    return await this.attributeService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return await this.attributeService.findOne(id);
  }

  @Post()
  public async create(@Body() dto: CreateProductsCatalogAttributeRequest) {
    const id = await this.attributeService.create(dto);

    return { id };
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductsCatalogAttributeRequest,
  ) {
    await this.attributeService.update(id, dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    await this.attributeService.delete(id);
  }
}
