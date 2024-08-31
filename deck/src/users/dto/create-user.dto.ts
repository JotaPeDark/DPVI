// src/users/dto/create-user.dto.ts
import { IsString, IsArray, IsEnum, MinLength } from 'class-validator';
import { Role } from '../enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: 'O nome de usuário deve ter pelo menos 4 caracteres' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsArray()
  @IsEnum(Role, { each: true, message: 'Roles inválidas' })
  roles: Role[];
}
