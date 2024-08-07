import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/add')
  async listACar(
    @Body()
    body: {
      brand: string;
      model: string;
      image: string;
      year: number;
      cost: number;
      description: string;
    },
  ) {
    return this.carService.listACar(body);
  }

  @Get('/get-available-cars')
  async getAvailableCars(@Query() query) {
    return this.carService.getAvailableCars(query);
  }

  @Get('/car-details/:id')
  async getCarDetails(@Param('id') id) {
    return this.carService.getCarDetails(parseInt(id));
  }
}
