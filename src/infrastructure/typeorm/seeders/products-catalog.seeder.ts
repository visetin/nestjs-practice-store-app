import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ProductsCatalogAttributeEntity } from '../../../domain/products-catalog/attribute';
import { ProductsCatalogAttributesValueEntity } from '../../../domain/products-catalog/attribute';
import { ProductsCatalogCategoryEntity } from '../../../domain/products-catalog/category';

export default class ProductsCatalogSeeder implements Seeder {
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
    const count = 6;
    await dataSource.query(`
      TRUNCATE TABLE "products_catalog_attribute" CASCADE;
    `);

    const recordsFactory = factoryManager.get(ProductsCatalogAttributeEntity);
    const recordsList = await recordsFactory.saveMany(count);

    return this.mapIds(recordsList);
  }

  private async runAttributesValueSeeder(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    deps: {
      attributesIds: number[];
    },
  ) {
    const count = 30;

    const { attributesIds } = deps;
    const recordsFactory = factoryManager.get(
      ProductsCatalogAttributesValueEntity,
    );
    const recordsRepository = dataSource.getRepository(
      ProductsCatalogAttributesValueEntity,
    );
    const recordsList = await Promise.all(
      Array(count)
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
    const count = 4;

    await dataSource.query(`
      TRUNCATE TABLE "products_catalog_category" CASCADE;
    `);

    const recordsFactory = factoryManager.get(ProductsCatalogCategoryEntity);
    const recordsList = await recordsFactory.saveMany(count);

    return this.mapIds(recordsList);
  }

  private mapIds(
    list:
      | ProductsCatalogAttributeEntity[]
      | ProductsCatalogAttributesValueEntity[]
      | ProductsCatalogCategoryEntity[],
  ) {
    return list.map(({ id }) => {
      return id;
    });
  }
}
