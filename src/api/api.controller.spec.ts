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
      addFavorite: (flightNumber: number, user: any) => Promise.resolve(user),
      removeFavorite: (flightNumber: number, user: any) =>
        Promise.resolve(user),
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
});
