import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateNluTranscriptionDto } from './dto/update-nlu-transcription.dto';
import { UpdateTaTranscriptionDto } from './dto/update-ta-transcription.dto';
import {
  Transcription,
  TranscriptionDocument,
} from './schemas/transcription.schema';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectModel(Transcription.name)
    private transcriptionModel: Model<TranscriptionDocument>,
  ) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'asr-done',
    queue: 'asr-done',
  })
  async create(createTranscriptionDto: CreateTranscriptionDto) {
    try {
      console.log('Salvar a transcription', createTranscriptionDto);
      this.transcriptionModel.create(createTranscriptionDto);
    } catch (e) {
      console.log('Erro ao salvar a transcription', e);
      return new Nack(true);
    }
  }

  async findAll(): Promise<Transcription[]> {
    return this.transcriptionModel.find();
  }

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'nlu-done',
    queue: 'nlu-done',
  })
  async updateNlu(updateNluTranscriptionDto: UpdateNluTranscriptionDto) {
    try {
      const { _id, nlu } = updateNluTranscriptionDto;
      const transcription = await this.transcriptionModel.findOne({ _id });
      console.log('Vai alterar o NLU', transcription);
      if (transcription) {
        await this.transcriptionModel.updateOne(
          { _id },
          {
            $set: { nlu },
          },
        );

        return;
      }
    } catch (e) {
      console.log('Erro ao atualizar o NLU', e);
    }
    return new Nack(true);
  }

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'ta-done',
    queue: 'ta-done',
  })
  async updateTa(updateTaTranscriptionDto: UpdateTaTranscriptionDto) {
    try {
      const { _id, ta } = updateTaTranscriptionDto;
      const transcription = await this.transcriptionModel.findOne({ _id });
      console.log('Vai alterar o TA', transcription);
      if (transcription) {
        await this.transcriptionModel.updateOne(
          { _id },
          {
            $set: { ta },
          },
        );

        return;
      }
    } catch (e) {
      console.log('Erro ao atualizar o TA', e);
    }
    return new Nack(true);
  }
}
