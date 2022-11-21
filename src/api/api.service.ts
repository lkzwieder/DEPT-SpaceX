import { Injectable } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";

@Injectable()
export class ApiService {
  constructor(private flightRepository: FlightRepository) {
    this.flightRepository = flightRepository;
  }

  getFlights() {
    return this.flightRepository.getFlights();
  }
}
