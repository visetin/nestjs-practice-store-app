import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateValueSubRequest {
  @IsString()
  @ApiProperty()
  title: string;
}

class UpdateValueSubRequest {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiPropertyOptional()
  title?: string;
}

class DeleteValueSubRequest {
  @IsNumber()
  @ApiProperty()
  id: number;
}

export class CreateRequest {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  values: CreateValueSubRequest[];
}

export class UpdateRequest {
  @IsString()
  @ApiPropertyOptional()
  title: string;

  @IsArray()
  @ApiPropertyOptional()
  values: UpdateValueSubRequest[] &
    CreateValueSubRequest[] &
    DeleteValueSubRequest[];
}
