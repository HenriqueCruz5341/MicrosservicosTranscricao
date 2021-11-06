import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message';
import { UuidService } from './uuid/uuid.service';

@Injectable()
export class AppService {
  constructor(
    private uuidService: UuidService,
    private amqpConnection: AmqpConnection,
  ) {}

  sendToExchange(sendMessageDto: SendMessageDto) {
    return this.amqpConnection.publish('amq.direct', 'asr-done', {
      text: sendMessageDto.text,
      _id: this.uuidService.generate(),
    });
  }
}
