import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AttributesValueEntity } from '../../entities/attributes-value.entity';

export class AttributesValueDto extends AttributesValueEntity {}

export class CreateAttributesValueInput {
  @IsString()
  public title: string;

  @IsNumber()
  public attributeId: number;
}

export class UpdateAttributesValueInput extends PartialType(
  CreateAttributesValueInput,
) {
  @IsNumber()
  public id: number;
}

export class DeleteAttributesValueInput {
  @IsNumber()
  public id: number;
}
