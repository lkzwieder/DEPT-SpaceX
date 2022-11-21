import { Injectable } from "@nestjs/common";

import { SpacexService } from "./spacex.service";
import { Flight } from "./interfaces/flight.interface";
import { Rocket } from "./interfaces/rocket.interface";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ApiService {
  constructor(
    private spacexService: SpacexService,
  ) {
    this.spacexService = spacexService;
  }

  async getFlights(user: User) {
    const [statusRockets, rockets] = await this.spacexService.getRockets();
    const [statusFlights, flights] = await this.spacexService.getFlights();

    // if there is a problem with the SpaceX API, return an empty array
    if (statusRockets !== 200 || statusFlights !== 200) {
      return [];
    }

    return flights.map((flight: Flight) => {
      const rocket = rockets.find((rocket: Rocket) => rocket.rocket_id === flight.rocket.rocket_id);

      return {
        "flight_number": flight.flight_number,
        "mission_name": flight.mission_name,
        "mission_patch": flight.links.mission_patch,
        "details": flight.details,
        "rocket": {
          "rocket_id": flight.rocket.rocket_id,
          "rocket_name": flight.rocket.rocket_name,
          "active": rocket.active,
          "cost_per_launch": rocket.cost_per_launch,
          "company": rocket.company,
        },
        "favorite": JSON.parse(user.favorites).includes(flight.flight_number),
      };
    });
  }
}
