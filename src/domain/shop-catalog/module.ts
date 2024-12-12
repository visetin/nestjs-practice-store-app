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
import { AttributeService } from './services/attribute.service';
import { AttributesGroupService } from './services/attributes-group.service';
import { AttributesNameService } from './services/attributes-name.service';
import { AttributesValueService } from './services/attributes-value.service';
import { CategoryService } from './services/category.service';
import { OfferService } from './services/offer.service';
import { OffersAttributeService } from './services/offers-attribute.service';
import { ProductService } from './services/product.service';
import { ProductsAttributeService } from './services/products-attribute.service';
import { ProductsCategoryService } from './services/products-category.service';

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
  providers: [
    AttributeService,
    AttributesGroupService,
    AttributesNameService,
    AttributesValueService,
    CategoryService,
    OfferService,
    OffersAttributeService,
    ProductService,
    ProductsAttributeService,
    ProductsCategoryService,
  ],
})
export class ShopCatalogModule {}
