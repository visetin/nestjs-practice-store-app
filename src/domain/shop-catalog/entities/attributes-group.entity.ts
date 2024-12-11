import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity('shop_catalog_attributes_group')
export class AttributesGroupEntity {
  @PrimaryGeneratedColumn({ name: 'attributes_group_id' })
  public id: number;

  @Column({ unique: true })
  public name: string;

  @OneToMany(
    () => AttributeEntity,
    (attributeEntity) => attributeEntity.groupId,
    { cascade: true },
  )
  public attributes: AttributeEntity[];
}
