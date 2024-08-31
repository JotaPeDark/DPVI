import { Document } from 'mongoose';
export declare class Card extends Document {
    name: string;
    manaCost: string;
    type: string;
    rarity: string;
    text: string;
    power: string;
    toughness: string;
}
export declare const CardSchema: import("mongoose").Schema<Card, import("mongoose").Model<Card, any, any, any, Document<unknown, any, Card> & Card & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Card, Document<unknown, {}, import("mongoose").FlatRecord<Card>> & import("mongoose").FlatRecord<Card> & Required<{
    _id: unknown;
}>>;
