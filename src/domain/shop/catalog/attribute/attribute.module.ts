import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributesValueEntity } from './entities/attributes-value.entity';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { AttributesValueRepository } from './attributes-value.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity, AttributesValueEntity])],
  providers: [AttributeService, AttributesValueRepository],
  controllers: [AttributeController],
  exports: [AttributeService],
})
export class ShopCatalogAttributeModule {}
