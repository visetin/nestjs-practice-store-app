import { Module } from '@nestjs/common';
import { ShopCatalogAttributeModule } from './attribute/attribute.module';
import { ShopCatalogCategoryModule } from './category/category.module';

@Module({
  imports: [ShopCatalogAttributeModule, ShopCatalogCategoryModule],
})
export class ShopCatalogModule {}
