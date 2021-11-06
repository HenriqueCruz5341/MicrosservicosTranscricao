import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

type Message = {
  _id: string;
  text: string;
};

@Injectable()
export class AppService {
  constructor(private client: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'asr-done',
    queue: 'ta-do',
  })
  public async readMessage(msg: Message) {
    console.log(`Vou fazer o TA de: ${JSON.stringify(msg)}`);
    const result = { _id: msg._id, ta: `TA de: ${msg.text}` };

    return this.client.publish('amq.direct', 'ta-done', result);
  }
}
