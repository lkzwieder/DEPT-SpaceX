import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { SpacexService } from './spacex.service';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, SpacexService],
})
export class ApiModule {}
