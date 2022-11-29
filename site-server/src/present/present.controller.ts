import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {Express} from "express";

@Controller('present')
export class PresentController {

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    createPresent(@UploadedFile() files: Array<Express.Multer.File>) {

    }

}
