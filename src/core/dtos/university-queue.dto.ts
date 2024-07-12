import { IsArray, IsString } from "class-validator";

export class UniversityQueueDto {
  @IsArray()
  @IsString({ each: true })
  countries: string[];
}
