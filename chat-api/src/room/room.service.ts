import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Message } from 'src/message/message.entity';
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    @Inject('MESSAGE_SERVICE') private readonly client: ClientProxy,
  ) {}

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }
  create(data: CreateRoomDto): Promise<Room> {
    let room = new Room();
    room.title = data.title;
    return this.roomsRepository.save(room);
  }
  findOne(id: string, options: any = {}): Promise<Room> {
    return this.roomsRepository.findOne(id, options);
  }
  sendMessage(message:any): Observable<string>{
    return this.client.send('message', message)
  }
}
