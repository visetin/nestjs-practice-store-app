import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OffersAttributeEntity } from './offers-attribute.entity';

@Entity('shop_catalog_offer')
export class OfferEntity {
  @PrimaryGeneratedColumn({ name: 'offer_id' })
  public id: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  public productId: number;

  @Column()
  public price: number;

  @Column()
  public quantity: number;

  @OneToMany(
    () => OffersAttributeEntity,
    (offersAttributeEntity) => offersAttributeEntity.offerId,
    {
      cascade: true,
    },
  )
  public offersAttributes: OffersAttributeEntity[];
}
