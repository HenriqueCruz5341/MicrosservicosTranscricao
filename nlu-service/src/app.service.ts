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
    queue: 'nlu-do',
  })
  public async readMessage(msg: Message) {
    console.log(`Vou fazer o NLU de: ${JSON.stringify(msg)}`);
    const result = { _id: msg._id, nlu: `NLU de: ${msg.text}` };

    return this.client.publish('amq.direct', 'nlu-done', result);
  }
}
