import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { S3Module } from './s3/s3.module';
import { S3Service } from './s3/s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { RequestModule } from './request/request.module';

@Module({
  imports: [UserModule, CarModule, S3Module, RequestModule],
  providers: [S3Service, S3Client],
})
export class AppModule {}
