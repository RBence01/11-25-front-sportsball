import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;
}
