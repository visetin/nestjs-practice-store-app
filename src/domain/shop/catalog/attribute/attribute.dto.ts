export class CreateAttributesValueInput {
  public attributeId: number;
  public title: string;
}

export class UpdateAttributesValueInput {
  public id: number;
  public title?: string;
}

export class DeleteAttributesValueInput {
  public id: number;
}

export class CreateAttributeInput {
  public title: string;
  public values: Omit<CreateAttributesValueInput, 'attributeId'>[];
}

export class FindAttributesOutput {
  public id: number;
  public title: string;
  public values: Omit<CreateAttributesValueInput, 'attributeId'>[];
}

export class UpdateAttributeInput {
  public title: string;
  public values: UpdateAttributesValueInput[] &
    DeleteAttributesValueInput[] &
    Omit<CreateAttributesValueInput, 'attributeId'>[];
}
