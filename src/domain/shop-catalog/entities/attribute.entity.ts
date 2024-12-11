import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AttributesNameEntity } from './attributes-name.entity';
import { AttributesGroupEntity } from './attributes-group.entity';
import { AttributesValueEntity } from './attributes-value.entity';
import { ProductsAttributeEntity } from './products-attribute.entity';

@Entity('shop_catalog_attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn({ name: 'attribute_id' })
  public id: number;

  @ManyToOne(() => AttributesNameEntity)
  @JoinColumn({ name: 'attributes_name_id' })
  public nameId: number;

  @ManyToOne(() => AttributesValueEntity)
  @JoinColumn({ name: 'attributes_value_id' })
  public valueId: number;

  @ManyToOne(() => AttributesGroupEntity)
  @JoinColumn({ name: 'attributes_group_id' })
  public groupId: number;

  @OneToMany(
    () => ProductsAttributeEntity,
    (productsAttributeEntity) => productsAttributeEntity.attributeId,
    { cascade: true },
  )
  public productsAttributes: ProductsAttributeEntity[];
}
