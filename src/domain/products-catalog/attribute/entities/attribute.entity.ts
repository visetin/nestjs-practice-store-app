import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttributesValueEntity } from './attributes-value.entity';

@Entity('products_catalog_attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn({ name: 'attribute_id' })
  public id: number;

  @Column({ unique: true })
  public title: string;

  @OneToMany(
    () => AttributesValueEntity,
    (attributesValueEntity) => attributesValueEntity.attributeId,
    { onDelete: 'CASCADE' },
  )
  public values: AttributesValueEntity[];
}
