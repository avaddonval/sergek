import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageGateway]
})
export class MessageModule {}
