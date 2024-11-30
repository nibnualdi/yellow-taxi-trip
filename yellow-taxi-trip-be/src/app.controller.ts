import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("taxi-trips")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTaxiTrips() {
    return this.appService.getTaxiTrips();
  }
}
