import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Card } from './interfaces/card.schema';
export declare class CardService {
    private readonly httpService;
    private cardModel;
    private readonly logger;
    constructor(httpService: HttpService, cardModel: Model<Card>);
    create(userId: string, createCardDto: any): Promise<Card>;
    getCommanderAndDeck(): Promise<{
        commander: import("mongoose").Document<unknown, {}, Card> & Card & Required<{
            _id: unknown;
        }>;
        deck: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Card> & Card & Required<{
            _id: unknown;
        }>, Omit<any, "_id">>[];
    }>;
    createDeck(userId: string, createDeckDto: any): Promise<import("mongoose").Document<unknown, {}, Card> & Card & Required<{
        _id: unknown;
    }>>;
    updateDeck(userId: string, deckId: string, updateDeckDto: any): Promise<import("mongoose").Document<unknown, {}, Card> & Card & Required<{
        _id: unknown;
    }>>;
    deleteDeck(userId: string, deckId: string): Promise<import("mongoose").Document<unknown, {}, Card> & Card & Required<{
        _id: unknown;
    }>>;
}
