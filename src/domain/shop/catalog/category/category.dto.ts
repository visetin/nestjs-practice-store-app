export class CreateCategoryInput {
  public title: string;
}

export class FindCategoriesOutput {
  public id: number;
  public title: string;
}

export class UpdateCategoryInput implements Partial<CreateCategoryInput> {}
