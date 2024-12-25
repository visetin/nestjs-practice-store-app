import { setSeederFactory } from 'typeorm-extension';
import { ProductsCatalogAttributesValueEntity } from '../../../domain/products-catalog/attribute';

export default setSeederFactory(
  ProductsCatalogAttributesValueEntity,
  (faker) => {
    const entity = new ProductsCatalogAttributesValueEntity();

    entity.title = `value_${faker.word.adjective()}`;

    return entity;
  },
);
