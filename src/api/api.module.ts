import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { FlightRepository } from './flight.repository';

@Module({
  imports: [HttpModule],
  controllers: [ApiController],
  providers: [ApiService, FlightRepository],
})
export class ApiModule {}
