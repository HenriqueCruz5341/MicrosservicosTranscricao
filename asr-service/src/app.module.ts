import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UuidService } from './uuid/uuid.service';

@Module({
  controllers: [AppController],
  providers: [AppService, UuidService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
})
export class AppModule {}
