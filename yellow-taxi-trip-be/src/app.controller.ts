import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TaxiTripsBody } from './dto/taxi-trips.dto';

@Controller('taxi-trips')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTaxiTrips() {
    return this.appService.getTaxiTrips();
  }

  @Post('coordinate')
  getTaxiTripByCoordinate(@Body() taxiTripsBody: TaxiTripsBody) {
    return this.appService.getTaxiTripByCoordinate(taxiTripsBody);
  }
  @Post('available-dropoff')
  getAvailableTaxiTripsByPickupCoor(@Body() taxiTripsBody: TaxiTripsBody) {
    return this.appService.getAvailableTaxiTripsByPickupCoor(taxiTripsBody);
  }
}
