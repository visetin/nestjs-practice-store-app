import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AttributeEntity } from '../../../domain/shop/catalog/attribute/entities/attribute.entity';
import { AttributesValueEntity } from '../../../domain/shop/catalog/attribute/entities/attributes-value.entity';
import { CategoryEntity } from '../../../domain/shop/catalog/category/entities/category.entity';

const ATTRIBUTES_COUNT = 6;
const ATTRIBUTES_VALUES_COUNT = 30;
const CATEGORIES_COUNT = 4;

export default class ShopCatalogSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const attributesIds = await this.runAttributeSeeder(
      dataSource,
      factoryManager,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const attributesValuesIds = await this.runAttributesValueSeeder(
      dataSource,
      factoryManager,
      { attributesIds },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const categoriesIds = await this.runCategorySeeder(
      dataSource,
      factoryManager,
    );
  }

  private async runAttributeSeeder(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    await dataSource.query(`
      TRUNCATE TABLE "shop_catalog_attribute" CASCADE;
    `);

    const recordsFactory = factoryManager.get(AttributeEntity);
    const recordsList = await recordsFactory.saveMany(ATTRIBUTES_COUNT);

    return this.mapIds(recordsList);
  }

  private async runAttributesValueSeeder(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    deps: {
      attributesIds: number[];
    },
  ) {
    const { attributesIds } = deps;
    const recordsFactory = factoryManager.get(AttributesValueEntity);
    const recordsRepository = dataSource.getRepository(AttributesValueEntity);
    const recordsList = await Promise.all(
      Array(ATTRIBUTES_VALUES_COUNT)
        .fill(null)
        .map(async () => {
          return await recordsFactory.make({
            attributeId: faker.helpers.arrayElement(attributesIds),
          });
        }),
    );

    await recordsRepository.save(recordsList);

    return this.mapIds(recordsList);
  }

  private async runCategorySeeder(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    await dataSource.query(`
      TRUNCATE TABLE "shop_catalog_category" CASCADE;
    `);

    const recordsFactory = factoryManager.get(CategoryEntity);
    const recordsList = await recordsFactory.saveMany(CATEGORIES_COUNT);

    return this.mapIds(recordsList);
  }

  private mapIds(
    list: AttributeEntity[] | AttributesValueEntity[] | CategoryEntity[],
  ) {
    return list.map(({ id }) => {
      return id;
    });
  }
}
