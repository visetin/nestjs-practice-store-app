export class CreateAttributesGroupInput {
  public title: string;
}

export class CreateAttributesValueInput {
  public value: string;
}

export class CreateAttributeInput {
  public title: string;
  public groupId: number;
  public values: string[];
}

export class FindAttributeOutput {
  public id: number;
  public title: string;
  public group: {
    id: number;
    title: string;
  };
  public values: {
    id: number;
    title: string;
  }[];
}
