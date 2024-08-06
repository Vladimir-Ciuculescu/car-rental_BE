import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { buffer } from 'stream/consumers';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @HttpCode(201)
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.s3Service.uploadImage(file, file.buffer);
  }
}
