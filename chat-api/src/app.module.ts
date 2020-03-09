import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/room.entity'
import { Message } from './message/message.entity'
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    RoomModule, 
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [Room, Message],
        synchronize: true,
      }),
      inject: [ConfigService],
    }), MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
