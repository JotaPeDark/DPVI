"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const card_schema_1 = require("./interfaces/card.schema");
const fs = require("fs");
let CardService = CardService_1 = class CardService {
    constructor(httpService, cardModel) {
        this.httpService = httpService;
        this.cardModel = cardModel;
        this.logger = new common_1.Logger(CardService_1.name);
    }
    async create(userId, createCardDto) {
        const createdCard = new this.cardModel({
            ...createCardDto,
            userId,
        });
        return createdCard.save();
    }
    async getCommanderAndDeck() {
        try {
            this.logger.log('Fetching commander...');
            const commanderUrl = 'https://api.magicthegathering.io/v1/cards?name=sheoldred';
            const commanderResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(commanderUrl));
            const commanderData = commanderResponse.data.cards[0];
            this.logger.log(`Commander found: ${commanderData.name}`);
            const colors = commanderData.colors;
            const colorQuery = colors.map(color => `colorIdentity=${color}`).join('&');
            this.logger.log('Fetching deck...');
            const deckUrl = `https://api.magicthegathering.io/v1/cards?${colorQuery}&pageSize=99`;
            const deckResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(deckUrl));
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
            fs.writeFileSync('deck.json', JSON.stringify(deck, null, 2));
            const createdCommander = new this.cardModel(deck.commander);
            await createdCommander.save();
            const createdDeck = await this.cardModel.insertMany(deck.cards);
            this.logger.log('Commander and deck saved successfully');
            return {
                commander: createdCommander,
                deck: createdDeck,
            };
        }
        catch (error) {
            this.logger.error('Error fetching commander or deck', error);
            throw error;
        }
    }
    async createDeck(userId, createDeckDto) {
        const createdDeck = new this.cardModel({
            ...createDeckDto,
            userId: userId,
        });
        return createdDeck.save();
    }
    async updateDeck(userId, deckId, updateDeckDto) {
        return this.cardModel.findOneAndUpdate({ _id: deckId, userId: userId }, { $set: updateDeckDto }, { new: true });
    }
    async deleteDeck(userId, deckId) {
        return this.cardModel.findOneAndDelete({ _id: deckId, userId: userId });
    }
};
exports.CardService = CardService;
exports.CardService = CardService = CardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], CardService);
//# sourceMappingURL=cards.service.js.map