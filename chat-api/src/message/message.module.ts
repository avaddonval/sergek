import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  exports: [TypeOrmModule]
})
export class MessageModule {}
