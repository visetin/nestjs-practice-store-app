import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_catalog_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  public id: number;

  @Column({ unique: true })
  public title: string;
}
