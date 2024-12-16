import { Module } from '@nestjs/common';
import { ShopCatalogAttributeModule } from './attribute/attribute.module';

@Module({
  imports: [ShopCatalogAttributeModule],
})
export class ShopCatalogModule {}
