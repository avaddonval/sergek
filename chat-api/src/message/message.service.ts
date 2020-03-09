import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Room } from '../room/room.entity'
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  create(data: CreateMessageDto, room: Room): Promise<Message> {

    let message = new Message();
    message.message = data.message;
    message.room = room;
    return this.messagesRepository.save(message);
  }
}

