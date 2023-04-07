import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Board } from 'src/board/schemas/board.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Board | string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
