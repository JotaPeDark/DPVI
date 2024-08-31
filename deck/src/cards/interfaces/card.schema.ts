import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  manaCost: string;

  @Prop()
  type: string;

  @Prop()
  rarity: string;

  @Prop()
  text: string;

  @Prop()
  power: string;

  @Prop()
  toughness: string;

  // Adicione mais propriedades conforme necessário
}

export const CardSchema = SchemaFactory.createForClass(Card);
