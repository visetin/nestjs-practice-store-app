import { Module } from '@nestjs/common';
import { ShopCatalogModule } from './catalog/module';

@Module({
  imports: [ShopCatalogModule],
  controllers: [],
  providers: [],
})
export class ShopModule {}
