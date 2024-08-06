import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async listACar(payload) {
    const { brand, model, image, year, cost, description, userId } = payload;

    await this.prismaService.car.create({
      data: {
        brand,
        model,
        image,
        yearOfProduction: year,
        costPerHour: cost,
        description,
        owner: { connect: { id: userId } },
      },
    });

    return { message: 'Car listed succesfully !' };
  }
}
