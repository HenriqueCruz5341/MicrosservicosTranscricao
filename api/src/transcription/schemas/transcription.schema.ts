import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TranscriptionDocument = Transcription & Document;

@Schema()
export class Transcription {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String })
  nlu: string;

  @Prop({ type: String })
  ta: string;
}

export const TranscriptionSchema = SchemaFactory.createForClass(Transcription);
