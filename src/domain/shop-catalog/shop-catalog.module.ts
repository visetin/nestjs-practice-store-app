import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributesNameEntity } from './entities/attributes-name.entity';
import { AttributesValueEntity } from './entities/attributes-value.entity';
import { AttributesGroupEntity } from './entities/attributes-group.entity';
import { CategoryEntity } from './entities/category.entity';
import { OfferEntity } from './entities/offer.entity';
import { OffersAttributeEntity } from './entities/offers-attribute.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsAttributeEntity } from './entities/products-attribute.entity';
import { ProductsCategoryEntity } from './entities/products-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttributeEntity,
      AttributesNameEntity,
      AttributesGroupEntity,
      AttributesValueEntity,
      CategoryEntity,
      OfferEntity,
      OffersAttributeEntity,
      ProductEntity,
      ProductsAttributeEntity,
      ProductsCategoryEntity,
    ]),
  ],
})
export class ShopCatalogModule {}
