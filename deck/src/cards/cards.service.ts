import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Card } from './interfaces/card.schema';
import * as fs from 'fs';  // Importar módulo de sistema de arquivos

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}

  // Método para criar um Card associado a um usuário
  async create(userId: string, createCardDto: any): Promise<Card> {
    const createdCard = new this.cardModel({
      ...createCardDto,
      userId,
    });
    return createdCard.save();
  }

  // Método para buscar o comandante e o deck associado
  async getCommanderAndDeck() {
    try {
      this.logger.log('Fetching commander...');
      const commanderUrl = 'https://api.magicthegathering.io/v1/cards?name=sheoldred';
      const commanderResponse = await firstValueFrom(this.httpService.get(commanderUrl));
      const commanderData = commanderResponse.data.cards[0];

      this.logger.log(`Commander found: ${commanderData.name}`);
      const colors = commanderData.colors;
      const colorQuery = colors.map(color => `colorIdentity=${color}`).join('&');

      this.logger.log('Fetching deck...');
      const deckUrl = `https://api.magicthegathering.io/v1/cards?${colorQuery}&pageSize=99`;
      const deckResponse = await firstValueFrom(this.httpService.get(deckUrl));
      const deckCards = deckResponse.data.cards;

      this.logger.log(`Deck fetched with ${deckCards.length} cards`);

      const deck = {
        commander: {
          name: commanderData.name,
          manaCost: commanderData.manaCost,
          type: commanderData.type,
          rarity: commanderData.rarity,
          text: commanderData.text,
          power: commanderData.power,
          toughness: commanderData.toughness,
        },
        cards: deckCards.map(card => ({
          name: card.name,
          manaCost: card.manaCost,
          type: card.type,
          rarity: card.rarity,
          text: card.text,
          power: card.power,
          toughness: card.toughness,
        })),
      };

      // Salvar o deck completo em um arquivo JSON
      fs.writeFileSync('deck.json', JSON.stringify(deck, null, 2));

      // Salvar no banco de dados
      const createdCommander = new this.cardModel(deck.commander);
      await createdCommander.save();

      const createdDeck = await this.cardModel.insertMany(deck.cards);

      this.logger.log('Commander and deck saved successfully');
      return {
        commander: createdCommander,
        deck: createdDeck,
      };
    } catch (error) {
      this.logger.error('Error fetching commander or deck', error);
      throw error;
    }
  }

  // Método para criar um Deck associado a um usuário
  async createDeck(userId: string, createDeckDto: any) {
    const createdDeck = new this.cardModel({
      ...createDeckDto,
      userId: userId,  // Associando o deck ao usuário autenticado
    });
    return createdDeck.save();
  }

  // Método para atualizar um Deck existente associado a um usuário
  async updateDeck(userId: string, deckId: string, updateDeckDto: any) {
    return this.cardModel.findOneAndUpdate(
      { _id: deckId, userId: userId },  // Garante que o deck pertence ao usuário
      { $set: updateDeckDto },
      { new: true },
    );
  }

  // Método para deletar um Deck existente associado a um usuário
  async deleteDeck(userId: string, deckId: string) {
    return this.cardModel.findOneAndDelete({ _id: deckId, userId: userId });
  }
}
