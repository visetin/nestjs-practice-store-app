import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsCatalogAttributeEntity } from '../../../domain/products-catalog/attribute';
import { ProductsCatalogAttributesValueEntity } from '../../../domain/products-catalog/attribute';

import { ProductsCatalogAttributeRepository } from '../../../domain/products-catalog/attribute';
import { ProductsCatalogAttributesValueRepository } from '../../../domain/products-catalog/attribute';

import { ProductsCatalogAttributeService } from '../../../domain/products-catalog/attribute';

import { ProductsCatalogAttributeController } from '../../../application/http/products-catalog-attribute.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsCatalogAttributeEntity,
      ProductsCatalogAttributesValueEntity,
    ]),
  ],
  providers: [
    ProductsCatalogAttributeRepository,
    ProductsCatalogAttributesValueRepository,
    ProductsCatalogAttributeService,
  ],
  controllers: [ProductsCatalogAttributeController],
  exports: [ProductsCatalogAttributeService],
})
export class ProductsCatalogModule {}
