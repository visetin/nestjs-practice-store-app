import { ApiProperty, PartialType, IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class CreateValueInput {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;
}

export class CreateValueWithDependenciesInput extends CreateValueInput {
  @IsNumber()
  public attributeId: number;
}

export class UpdateValueInput extends PartialType(CreateValueInput) {
  @IsNumber()
  @ApiProperty()
  public id: number;
}

export class DeleteValueInput {
  @IsNumber()
  @ApiProperty()
  public id: number;
}

export class UpdateValueSmartlyInput extends IntersectionType(
  CreateValueInput,
  UpdateValueInput,
  DeleteValueInput,
) {}

export class CreateAttributeInput {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsArray()
  @ApiProperty({
    type: CreateValueInput,
    isArray: true,
  })
  public values: CreateValueInput[];
}

export class UpdateAttributeInput {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsArray()
  @ApiProperty({
    type: UpdateValueSmartlyInput,
    isArray: true,
  })
  public values: UpdateValueSmartlyInput[];
}

export class FindValuesOutput {
  public id: number;
  public title: string;
}

export class FindAttributesOutput {
  public id: number;
  public title: string;
  public values: FindValuesOutput[];
}
