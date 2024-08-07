import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/add-car-request')
  addCarRequest(@Body() body) {
    return this.requestService.addCarRequest(body);
  }

  @Get('/requests-your-cars/:id')
  getRequestsForYourCar(@Param('id') id) {
    return this.requestService.getRequestsForYourCars(parseInt(id));
  }

  @Post('/decline-request/:id')
  declineRequest(@Param('id') id) {
    return this.requestService.declineRequest(parseInt(id));
  }

  @Post('/accept-request')
  acceptRequest(@Body() body: { requestId: string; carId: string }) {
    return this.requestService.acceptRequest(body);
  }
}
