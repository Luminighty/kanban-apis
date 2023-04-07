import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  active: boolean;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
