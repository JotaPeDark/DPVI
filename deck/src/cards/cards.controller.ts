import { Controller, Get, Post, Body, UseGuards, Request, Put, Param, Delete } from '@nestjs/common';
import { CardService } from './cards.service';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';  // Importando o JwtAuthGuard
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/roles.enum';
import { RolesGuard } from '../users/guards/roles.guard';

@Controller('commander')
@UseGuards(JwtAuthGuard, RolesGuard)  // Aplicando os guards globalmente
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // Rota GET pública para buscar detalhes do comandante
  @Get('get-deck')
  async getCard() {
    return this.cardService.getCommanderAndDeck(); // Usar o método atualizado
  }

  // Rota POST protegida para criar um deck (apenas usuários autenticados)
  @Roles(Role.User, Role.Admin)  // Usuários e admins podem acessar essa rota
  @Post('create-deck')
  async createDeck(@Request() req, @Body() createDeckDto: any) {
    // Acessar os detalhes do usuário através de req.user
    return this.cardService.createDeck(req.user.userId, createDeckDto);
  }

  // Rota PUT protegida para editar um deck (apenas usuários autenticados)
  @Roles(Role.User, Role.Admin)  // Usuários e admins podem acessar essa rota
  @Put('update-deck/:id')
  async updateDeck(@Param('id') id: string, @Request() req, @Body() updateDeckDto: any) {
    return this.cardService.updateDeck(req.user.userId, id, updateDeckDto);
  }

  // Rota DELETE protegida para deletar um deck (apenas usuários autenticados)
  @Roles(Role.User, Role.Admin)  // Usuários e admins podem acessar essa rota
  @Delete('delete-deck/:id')
  async deleteDeck(@Param('id') id: string, @Request() req) {
    return this.cardService.deleteDeck(req.user.userId, id);
  }

  // Rota POST protegida para criar um card (apenas admins)
  @Roles(Role.Admin)  // Apenas admins podem acessar essa rota
  @Post('create-card')
  async createCard(@Request() req, @Body() createCardDto: any) {
    return this.cardService.create(req.user.userId, createCardDto);
  }
}
