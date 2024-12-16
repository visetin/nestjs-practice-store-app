import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeInput, UpdateAttributeInput } from './attribute.dto';

@Controller('shop/catalog/attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get()
  public async findAll() {
    return await this.attributeService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return await this.attributeService.findOneById(id);
  }

  @Post()
  public async create(@Body() dto: CreateAttributeInput) {
    const id = await this.attributeService.create(dto);

    return { id };
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateAttributeInput,
  ) {
    await this.attributeService.update(id, dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    await this.attributeService.delete(id);
  }
}
