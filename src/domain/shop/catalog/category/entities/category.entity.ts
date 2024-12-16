import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop_catalog_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  public id: number;

  @Column()
  public title: string;
}
