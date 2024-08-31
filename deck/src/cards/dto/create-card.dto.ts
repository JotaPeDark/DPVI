import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do card é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do card é obrigatória' })
  description: string;

  @IsArray()
  tags: string[];
}
