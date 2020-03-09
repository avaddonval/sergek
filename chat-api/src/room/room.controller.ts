import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    ) {}
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto){
    return await this.roomService.create(createRoomDto);
  }
  @Get()
  async findAll(){
    return await this.roomService.findAll();
  }
  @Get(':id/messages')
  async findMessages(@Param('id') id: string){
    const room = await this.roomService.findOne(id, { relations: ["messages"] });
    return room.messages
  }
  @Post(':id/message')
  async createMessage(@Param('id') id: string, @Body() createMessageDto: CreateMessageDto){
    const room = await this.roomService.findOne(id);
    let message = await this.messageService.create(createMessageDto, room)
    let toWs = this.roomService.sendMessage(message)
    toWs.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    return message
  }
}
