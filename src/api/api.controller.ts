import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { ApiService } from './api.service';
import { UsersService } from '../users/users.service';
import { FavoriteFlightDto } from './dtos/favorite-flight.dto';

@Controller('api')
export class ApiController {
  constructor(
    private apiService: ApiService,
    private userService: UsersService,
  ) {
    this.apiService = apiService;
  }

  @Get('/flights')
  async getFlights() {
    const user = await this.userService.getUser();
    return this.apiService.getFlights(user);
  }

  @Post('/favorite')
  async addFavorite(@Body() favoriteFlight: FavoriteFlightDto) {
    const { flightNumber } = favoriteFlight;
    const user = await this.userService.getUser();
    return this.userService.addFavorite(flightNumber, user);
  }

  @Delete('/favorite')
  async removeFavorite(@Body() favoriteFlight: FavoriteFlightDto) {
    const { flightNumber } = favoriteFlight;
    const user = await this.userService.getUser();
    return this.userService.removeFavorite(flightNumber, user);
  }
}
