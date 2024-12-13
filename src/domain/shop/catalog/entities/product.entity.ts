import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductsCategoryEntity } from './products-category.entity';
import { OfferEntity } from './offer.entity';

@Entity('shop_catalog_product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public quantity: number;

  @OneToMany(
    () => ProductsCategoryEntity,
    (productsCategoryEntity) => productsCategoryEntity.productId,
    { cascade: true },
  )
  public productsCategories: ProductsCategoryEntity[];

  @OneToMany(() => OfferEntity, (offerEntity) => offerEntity.productId, {
    cascade: true,
  })
  public offers: OfferEntity[];
}
