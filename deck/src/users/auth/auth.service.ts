// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcryptjs';  // Importando bcrypt para verificar a senha

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {  // Comparando a senha com bcrypt
      const { password, ...result } = user.toObject();  // Convertendo o usuário para um objeto plano e excluindo a senha
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, roles: user.roles }; // Incluindo roles no payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
