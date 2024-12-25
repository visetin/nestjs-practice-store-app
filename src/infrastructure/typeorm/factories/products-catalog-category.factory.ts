import { setSeederFactory } from 'typeorm-extension';
import { ProductsCatalogCategoryEntity } from '../../../domain/products-catalog/category';

export default setSeederFactory(ProductsCatalogCategoryEntity, (faker) => {
  const entity = new ProductsCatalogCategoryEntity();

  entity.title = `category_${faker.word.noun()}`;

  return entity;
});
