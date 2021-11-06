import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionController } from './transcription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transcription,
  TranscriptionSchema,
} from './schemas/transcription.schema';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transcription.name, schema: TranscriptionSchema },
    ]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'amq.direct',
            type: 'direct',
          },
        ],
        uri: configService.get<string>('RABBITMQ_URI'),
      }),
    }),
  ],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
})
export class TranscriptionModule {}
