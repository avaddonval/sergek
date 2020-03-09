import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';
import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Room]), 
    MessageModule,

  ],
  providers: [
    RoomService, 
    MessageService,
    {
      provide: 'MESSAGE_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${configService.get('rabbitmq.user')}:${configService.get('rabbitmq.password')}@${configService.get('rabbitmq.host')}:${configService.get('rabbitmq.port')}`],
            queue: 'message_queue'
          },
        });
      },
      inject: [ConfigService],
    }
  ],
  controllers: [RoomController],
  exports: [TypeOrmModule]
})
export class RoomModule {}
