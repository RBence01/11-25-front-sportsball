import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsInt } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {  
  @IsInt()
  goalCount?: number;
}
