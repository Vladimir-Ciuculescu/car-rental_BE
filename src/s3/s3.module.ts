import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, S3Client],
})
export class S3Module {}
