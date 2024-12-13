import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_attributes_value')
export class AttributesValueEntity {
  @PrimaryGeneratedColumn({ name: 'attributes_value_id' })
  public id: number;

  @Column({ unique: true })
  public title: string;

  @ManyToOne(() => AttributeEntity)
  @JoinColumn({ name: 'attribute_id' })
  public attributeId: number;
}
