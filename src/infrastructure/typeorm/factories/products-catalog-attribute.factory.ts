import { setSeederFactory } from 'typeorm-extension';
import { ProductsCatalogAttributeEntity } from '../../../domain/products-catalog/attribute';

export default setSeederFactory(ProductsCatalogAttributeEntity, (faker) => {
  const entity = new ProductsCatalogAttributeEntity();

  entity.title = `attribute_${faker.word.noun()}`;

  return entity;
});
