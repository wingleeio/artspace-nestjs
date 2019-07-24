import {
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
// import {  } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('api/image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('upload')
  @UseInterceptors()
  async create(@UploadedFile() upload) {
    console.log(upload);
    // try {
    //   await this.imagesService.fileupload(request, response);
    // } catch (error) {
    //   return response
    //     .status(500)
    //     .json(`Failed to upload image file: ${error.message}`);
    // }
  }
}
