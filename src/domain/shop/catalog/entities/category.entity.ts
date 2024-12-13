import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductsCategoryEntity } from './products-category.entity';

@Entity('shop_catalog_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  public id: number;

  @Column()
  public title: string;

  @OneToMany(
    () => ProductsCategoryEntity,
    (productsCategoryEntity) => productsCategoryEntity.categoryId,
    { cascade: true },
  )
  public productsCategories: ProductsCategoryEntity[];
}
