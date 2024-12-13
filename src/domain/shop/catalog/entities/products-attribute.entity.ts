import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_products_attribute')
export class ProductsAttributeEntity {
  @PrimaryGeneratedColumn({ name: 'products_attribute_id' })
  public id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  public productId: number;

  @ManyToOne(() => AttributeEntity)
  @JoinColumn({ name: 'attribute_id' })
  public attributeId: number;
}
