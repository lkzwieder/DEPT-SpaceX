import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  @Get('/flights')
  getFlights() {
    return this.apiService.getFlights();
  }

  // TODO separate /user endpoints
  @Get('/user/favorites')
  getFavorites() {
    return [
      { id: 1, name: 'Flight 1' },
      { id: 3, name: 'Flight 3' },
    ];
  }

  @Post('/user/favorite/add')
  addFavorite() {
    return { success: true };
  }

  @Post('/user/favorite/remove')
  removeFavorite() {
    return { success: true };
  }
}
