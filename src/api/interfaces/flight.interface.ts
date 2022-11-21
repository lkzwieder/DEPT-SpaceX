interface RocketFlight {
  rocket_id:    string;
  rocket_name:  string;
}

interface Links {
    mission_patch: string;
}

export interface Flight {
  flight_number:           number;
  mission_name:            string;
  rocket:                  RocketFlight;
  links:                   Links;
  details:                 string;
}