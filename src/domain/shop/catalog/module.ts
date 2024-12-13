import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributesValueEntity } from './entities/attributes-value.entity';
import { AttributesGroupEntity } from './entities/attributes-group.entity';
import { CategoryEntity } from './entities/category.entity';
import { OfferEntity } from './entities/offer.entity';
import { OffersAttributeEntity } from './entities/offers-attribute.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsAttributeEntity } from './entities/products-attribute.entity';
import { ProductsCategoryEntity } from './entities/products-category.entity';
import { AttributeService } from './services/attribute.service';
import { CategoryService } from './services/category.service';
import { OfferService } from './services/offer.service';
import { ProductService } from './services/product.service';
import { AttributeController } from './controllers/attribute.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttributeEntity,
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
  providers: [AttributeService, CategoryService, OfferService, ProductService],
  controllers: [AttributeController],
})
export class ShopCatalogModule {}
