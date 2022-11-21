import { Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('/flights')
  getFlights() {
    return [
      { id: 1, name: 'Flight 1' },
      { id: 2, name: 'Flight 2' },
      { id: 3, name: 'Flight 3' },
    ];
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
