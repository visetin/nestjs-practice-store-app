import {
  AttributesValueEntityDto,
  CreateAttributesValueInput,
  UpdateAttributesValueInput,
  DeleteAttributesValueInput,
} from '../../repositories/dto/attributes-value.dto';
import {
  CreateAttributeInput,
  UpdateAttributeInput,
} from '../../repositories/dto/attribute.dto';

export class CreateValueInput extends CreateAttributesValueInput {}

export class UpdateValueInput extends UpdateAttributesValueInput {}

export class DeleteValueInput extends DeleteAttributesValueInput {}

export class CreateInput extends CreateAttributeInput {
  public values: Omit<CreateValueInput, 'attributeId'>[];
}

export class FindAllOutput {
  public id: number;
  public title: string;
}

export class FindOneOutput {
  public id: number;
  public title: string;
  public values: Omit<AttributesValueEntityDto, 'attributeId'>[];
}

export class UpdateInput extends UpdateAttributeInput {
  public values: UpdateValueInput[] &
    Omit<CreateValueInput, 'attributeId'>[] &
    DeleteValueInput[];
}
