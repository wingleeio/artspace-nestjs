import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('upload')
  @UseGuards(AuthGuard())
  async create(@Req() request, @Res() response) {
    try {
      await this.imagesService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
