import { CardService } from './cards.service';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    getCard(): Promise<{
        commander: import("mongoose").Document<unknown, {}, import("./interfaces/card.schema").Card> & import("./interfaces/card.schema").Card & Required<{
            _id: unknown;
        }>;
        deck: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./interfaces/card.schema").Card> & import("./interfaces/card.schema").Card & Required<{
            _id: unknown;
        }>, Omit<any, "_id">>[];
    }>;
    createDeck(req: any, createDeckDto: any): Promise<import("mongoose").Document<unknown, {}, import("./interfaces/card.schema").Card> & import("./interfaces/card.schema").Card & Required<{
        _id: unknown;
    }>>;
    updateDeck(id: string, req: any, updateDeckDto: any): Promise<import("mongoose").Document<unknown, {}, import("./interfaces/card.schema").Card> & import("./interfaces/card.schema").Card & Required<{
        _id: unknown;
    }>>;
    deleteDeck(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./interfaces/card.schema").Card> & import("./interfaces/card.schema").Card & Required<{
        _id: unknown;
    }>>;
    createCard(req: any, createCardDto: any): Promise<import("./interfaces/card.schema").Card>;
}
