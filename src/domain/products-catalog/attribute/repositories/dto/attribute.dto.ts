import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AttributeEntity } from '../../entities/attribute.entity';

export class AttributeDto extends AttributeEntity {}

export class CreateAttributeInput {
  @IsString()
  public title: string;
}

export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
  @IsNumber()
  public id: number;
}
