import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_attributes_name')
export class AttributesNameEntity {
  @PrimaryGeneratedColumn({ name: 'attributes_name_id' })
  public id: number;

  @Column({ unique: true })
  public value: string;

  @OneToMany(
    () => AttributeEntity,
    (attributeEntity) => attributeEntity.nameId,
    { cascade: true },
  )
  public attributes: AttributeEntity[];
}
