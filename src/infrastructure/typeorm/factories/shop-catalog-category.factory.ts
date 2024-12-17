import { setSeederFactory } from 'typeorm-extension';
import { CategoryEntity } from '../../../domain/shop/catalog/category/entities/category.entity';

export default setSeederFactory(CategoryEntity, (faker) => {
  const entity = new CategoryEntity();

  entity.title = `category_${faker.word.noun()}`;

  return entity;
});
