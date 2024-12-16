import { setSeederFactory } from 'typeorm-extension';
import { AttributesValueEntity } from '../../../domain/shop/catalog/attribute/entities/attributes-value.entity';

export default setSeederFactory(AttributesValueEntity, (faker) => {
  const entity = new AttributesValueEntity();

  entity.title = `value_${faker.word.adjective()}`;

  return entity;
});
