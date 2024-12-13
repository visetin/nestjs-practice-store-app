export class CreateProductInput {
  public title: string;
  public description: string;
  public price: number;
  public quantity: number;
}

export class UpdateProductInput {
  public title: string;
  public description: string;
  public price: number;
  public quantity: number;
}

export class CreateProductsAttributeInput {
  public productId: number;
  public attributeId: number;
}

export class UpdateProductsAttributeInput {
  public attributeId: number;
}

export class CreateProductsCategoryInput {
  public productId: number;
  public categoryId: number;
}

export class UpdateProductsCategoryInput {
  public categoryId: number;
}
