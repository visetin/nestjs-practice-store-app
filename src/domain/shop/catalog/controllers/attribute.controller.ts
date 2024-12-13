import { Controller, Get } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';

@Controller('shop/catalog/attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get()
  public async findAll() {
    const attributes = await this.attributeService.findAll();

    return attributes;
  }
}
