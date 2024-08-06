import { Body, Controller, Post } from '@nestjs/common';
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
}
