import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from "rxjs";
import { map } from 'rxjs/operators';

import { Constants } from 'src/api/common/spacex.constant';

@Injectable()
export class FlightRepository {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  async getFlights() {
    try {
      return firstValueFrom(
        this.httpService
          .get(`${Constants.SPACEX_API_URL}/launches`)
          .pipe(map((res) => [res.data, res.status])),
      );
    } catch (err) {
      console.log(err);
    }
  }
}
