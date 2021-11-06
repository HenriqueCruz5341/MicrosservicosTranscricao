import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMessageDto } from './dto/send-message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  sendToExchange(@Body() sendMessageDto: SendMessageDto) {
    return this.appService.sendToExchange(sendMessageDto);
  }
}
