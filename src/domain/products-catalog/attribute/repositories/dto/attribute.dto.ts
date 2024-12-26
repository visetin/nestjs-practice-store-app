import { AttributeEntity } from '../../entities/attribute.entity';

export class AttributeEntityDto extends AttributeEntity {}

export class CreateAttributeInput {
  public title: string;
}

export class UpdateAttributeInput {
  public title?: string;
}
