import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async addCarRequest(body) {
    const { startDate, endDate, totalPrice, carId, userId } = body;

    try {
      await this.prismaService.rentalRequest.create({
        data: { startDate, endDate, totalPrice, carId, userId },
      });

      return { message: 'Request sent succesfully !' };
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async getRequestsForYourCars(id: number) {
    try {
      const requests = await this.prismaService.rentalRequest.findMany({
        where: {
          car: {
            ownerId: id,
          },
          userId: {
            not: id,
          },
        },
        include: {
          car: true,
          user: true,
        },
      });

      return requests;
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async declineRequest(id: number) {
    try {
      await this.prismaService.rentalRequest.update({
        data: { status: 'DECLINED' },
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async acceptRequest(body) {
    const { carId, requestId } = body;

    try {
      await this.prismaService.$transaction(async (tsx) => {
        await tsx.rentalRequest.update({
          data: { status: 'ACCEPTED' },
          where: { id: parseInt(requestId) },
        });

        await tsx.rentalRequest.deleteMany({
          where: { AND: [{ carId }, { id: { not: requestId } }] },
        });
      });
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }
}
