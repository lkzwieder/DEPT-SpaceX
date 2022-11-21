import { IsNumber } from 'class-validator';

export class FavoriteFlightDto {
  @IsNumber()
  flightNumber: number;
}