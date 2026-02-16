import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  phone?: string | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country?: string | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string | undefined;

  @IsOptional()
  @IsEmail()
  email?: string | undefined;

  @IsString()
  @IsNotEmpty()
  createdBy?: string;
}
