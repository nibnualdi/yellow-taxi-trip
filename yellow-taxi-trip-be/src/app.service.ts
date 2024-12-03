import { Injectable, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TaxiTripsBody } from './dto/taxi-trips.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getTaxiTrips() {
    const url =
      'https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=10';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  // async getTaxiTripByCoordinate(request: Request) {
  async getTaxiTripByCoordinate(taxiTripsBody: TaxiTripsBody) {
    const {
      pickup_longitude,
      pickup_latitude,
      dropoff_longitude,
      dropoff_latitude,
    } = taxiTripsBody;
    const url = `https://data.cityofnewyork.us/resource/gkne-dk5s.json`;
    const param = `?pickup_longitude=${pickup_longitude}&pickup_latitude=${pickup_latitude}&dropoff_longitude=${dropoff_longitude}&dropoff_latitude=${dropoff_latitude}`;
    const { data } = await firstValueFrom(this.httpService.get(url + param));
    return data;
  }

  async getAvailableTaxiTripsByPickupCoor(taxiTripsBody: TaxiTripsBody) {
    const { pickup_longitude, pickup_latitude } = taxiTripsBody;
    const url = `https://data.cityofnewyork.us/resource/gkne-dk5s.geojson`;
    const param = `?pickup_longitude=${pickup_longitude}&pickup_latitude=${pickup_latitude}`;
    const { data } = await firstValueFrom(this.httpService.get(url + param));
    return data;
  }
}
