import { setSeederFactory } from 'typeorm-extension';
import { AttributeEntity } from '../../../domain/shop/catalog/attribute/entities/attribute.entity';

export default setSeederFactory(AttributeEntity, (faker) => {
  const entity = new AttributeEntity();

  entity.title = `attribute_${faker.word.noun()}`;

  return entity;
});
