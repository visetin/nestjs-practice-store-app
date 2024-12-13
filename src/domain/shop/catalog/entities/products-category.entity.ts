import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

@Entity('shop_catalog_products_category')
export class ProductsCategoryEntity {
  @PrimaryGeneratedColumn({ name: 'products_category_id' })
  public id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  public productId: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  public categoryId: number;
}
