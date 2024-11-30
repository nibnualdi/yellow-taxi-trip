import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getTaxiTrips() {
    const url =
      'https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=10';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
