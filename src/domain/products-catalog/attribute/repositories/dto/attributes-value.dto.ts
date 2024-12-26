import { AttributesValueEntity } from '../../entities/attributes-value.entity';

export class AttributesValueEntityDto extends AttributesValueEntity {}

export class CreateAttributesValueInput {
  public title: string;
  public attributeId: number;
}

export class UpdateAttributesValueInput {
  public id: number;
  public title?: string;
}

export class DeleteAttributesValueInput {
  public id: number;
}
