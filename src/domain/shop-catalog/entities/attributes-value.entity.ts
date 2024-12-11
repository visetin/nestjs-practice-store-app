import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_attributes_value')
export class AttributesValueEntity {
  @PrimaryGeneratedColumn({ name: 'attributes_value_id' })
  public id: number;

  @Column({ unique: true })
  public value: string;

  @OneToMany(
    () => AttributeEntity,
    (attributeEntity) => attributeEntity.valueId,
    { cascade: true },
  )
  public attributes: AttributeEntity[];
}
