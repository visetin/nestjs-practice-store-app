import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AttributeEntity } from '../../../domain/shop/catalog/attribute/entities/attribute.entity';
import { AttributesValueEntity } from '../../../domain/shop/catalog/attribute/entities/attributes-value.entity';

const ATTRIBUTES_COUNT = 6;
const ATTRIBUTES_VALUES_COUNT = 30;

export default class ShopCatalogAttributeSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query(`
      TRUNCATE TABLE "shop_catalog_attribute" CASCADE;
    `);

    const attributesValueRepository = dataSource.getRepository(
      AttributesValueEntity,
    );

    const attributeFactory = factoryManager.get(AttributeEntity);
    const attributesValueFactory = factoryManager.get(AttributesValueEntity);

    const attributes = await attributeFactory.saveMany(ATTRIBUTES_COUNT);
    const attributesIds = attributes.map(({ id }) => {
      return id;
    });

    const attributesValues = await Promise.all(
      Array(ATTRIBUTES_VALUES_COUNT)
        .fill(null)
        .map(async () => {
          return await attributesValueFactory.make({
            attributeId: faker.helpers.arrayElement(attributesIds),
          });
        }),
    );

    await attributesValueRepository.save(attributesValues);
  }
}
