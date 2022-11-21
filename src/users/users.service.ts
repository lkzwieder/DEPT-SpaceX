import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(userId: number) {
    const user = this.usersRepository.create({
      userId: userId,
      favorites: JSON.stringify([]),
    });
    return await this.usersRepository.save(user);
  }

  async getUser() {
    const userId = this.getRandomInt();
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      return this.createUser(userId);
    }
    return user;
  }

  async addFavorite(flightNumber: number, user: User) {
    this.ensureFavorite(flightNumber, user);
    const favorites = JSON.parse(user.favorites);
    favorites.push(flightNumber);
    user.favorites = JSON.stringify(favorites);
    return await this.usersRepository.save(user);
  }

  private async ensureFavorite(flightNumber: number, user: User) {
    const favorites = JSON.parse(user.favorites);
    if (favorites.includes(flightNumber)) {
      throw new BadRequestException('Flight already favorited');
    }
  }

  async removeFavorite(flightNumber: number, user: User) {
    const favorites = JSON.parse(user.favorites);
    const index = favorites.indexOf(flightNumber);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    user.favorites = JSON.stringify(favorites);
    return await this.usersRepository.save(user);
  }

  private getRandomInt() {
    return Math.floor(Math.random() * Math.floor(10));
  }
}
