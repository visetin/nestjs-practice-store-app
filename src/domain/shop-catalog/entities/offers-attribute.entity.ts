import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_offers_attribute')
export class OffersAttributeEntity {
  @PrimaryGeneratedColumn({ name: 'offers_attribute_id' })
  public id: number;

  @ManyToOne(() => OfferEntity)
  @JoinColumn({ name: 'offer_id' })
  public offerId: number;

  @ManyToOne(() => AttributeEntity)
  @JoinColumn({ name: 'attribute_id' })
  public attributeId: number;
}
