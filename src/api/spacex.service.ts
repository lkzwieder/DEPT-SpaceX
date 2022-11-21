import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants } from 'src/common/spacex.constant';

@Injectable()
export class SpacexService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  private getter(url: string) {
    try {
      return firstValueFrom(
        this.httpService
          .get(`${Constants.SPACEX_API_URL}/${url}`)
          .pipe(map((res) => [res.status, res.data])),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getRockets() {
    return this.getter('rockets');
  }

  async getFlights() {
    return this.getter('launches');
  }
}
