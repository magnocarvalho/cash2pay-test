import { IsArray, IsOptional, IsString } from 'class-validator';

export class University {
  @IsString()
  alpha_two_code: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsArray()
  web_pages?: string[];
  @IsOptional()
  @IsArray()
  domains?: string[];
  @IsOptional()
  @IsString()
  country?: string;
  @IsOptional()
  @IsString()
  'state-province'?: string;
}
