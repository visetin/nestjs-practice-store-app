import { IsArray } from 'class-validator';
import {
  CreateAttributesValueInput,
  UpdateAttributesValueInput,
  DeleteAttributesValueInput,
} from '../../repositories/dto/attributes-value.dto';
import {
  AttributeDto,
  CreateAttributeInput,
  UpdateAttributeInput,
} from '../../repositories/dto/attribute.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateInput extends CreateAttributeInput {
  @IsArray()
  public values: Omit<CreateAttributesValueInput, 'attributeId'>[];
}

export class FindAllOutput extends OmitType(AttributeDto, ['values']) {}

export class FindAllWithValuesOutput extends AttributeDto {}

export class UpdateInput extends UpdateAttributeInput {
  @IsArray()
  public values: Omit<UpdateAttributesValueInput, 'attributeId'>[] &
    Omit<CreateAttributesValueInput, 'attributeId'>[] &
    DeleteAttributesValueInput[];
}
