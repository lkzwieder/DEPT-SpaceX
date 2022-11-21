/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

describe('ApiController', () => {
  let controller: ApiController;
  let fakeUsersService: Partial<UsersService>;
  let fakeApiService: Partial<ApiService>;

  beforeEach(async () => {
    fakeUsersService = {
      getUser: () => Promise.resolve({ userId: 1, favorites: '[]' }),
      addFavorite: (flightNumber: number) =>
        Promise.resolve({ userId: 1, favorites: '[1]' }),
      removeFavorite: (flightNumber: number) =>
        Promise.resolve({ userId: 1, favorites: '[]' }),
    };

    fakeApiService = {
      getFlights: (user: any) => Promise.resolve([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ApiService, useValue: fakeApiService },
      ],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get flights', async () => {
    const flights = await controller.getFlights();
    expect(flights).toBeDefined();
  });

  it('should add a favorite', async () => {
    const user = await controller.addFavorite({ flightNumber: 1 });
    expect(user).toBeDefined();
    expect(JSON.parse(user.favorites).includes(1)).toBeTruthy();
  });

  it('should remove a favorite', async () => {
    const user = await controller.removeFavorite({ flightNumber: 1 });
    expect(user).toBeDefined();
    expect(JSON.parse(user.favorites).includes(1)).toBeFalsy();
  });
});
