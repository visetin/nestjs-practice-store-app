export class FindAttributeOutput {
  public id: number;
  public nameId: number;
  public valueId: number;
  public groupId: number;
  public name: string;
  public value: string;
  public group: string;
}

export class CreateAttributeInput {
  public nameId: number;
  public valueId: number;
  public groupId: number;
}

export class CreateAttributesGroupInput {
  public title: string;
}

export class CreateAttributesNameInput {
  public value: string;
}

export class CreateAttributesValueInput {
  public value: string;
}
