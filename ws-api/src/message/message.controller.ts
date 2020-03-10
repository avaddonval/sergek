import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
import { MessageGateway } from './message.gateway';
@Controller('message')
export class MessageController {
  constructor(private readonly messageGateway: MessageGateway,
    ) {}
  @MessagePattern('message')
  getMessagess(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    this.messageGateway.server.emit("new:message",data)
    return 'OK'
  }
}
