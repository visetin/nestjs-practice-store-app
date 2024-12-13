import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AttributesGroupEntity } from './attributes-group.entity';
import { AttributesValueEntity } from './attributes-value.entity';

@Entity('shop_catalog_attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn({ name: 'attribute_id' })
  public id: number;

  @Column({ unique: true })
  public title: string;

  @ManyToOne(() => AttributesGroupEntity, (group) => group.id)
  @JoinColumn({ name: 'attributes_group_id' })
  public groupId: number;

  @ManyToOne(() => AttributesGroupEntity, (group) => group)
  public group: AttributesGroupEntity;

  @OneToMany(
    () => AttributesValueEntity,
    (attributesValueEntity) => attributesValueEntity.attributeId,
    { onDelete: 'CASCADE' },
  )
  public values: AttributesValueEntity[];
}
