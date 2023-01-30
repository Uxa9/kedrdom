import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import { ObjectId } from 'mongoose';
import { EditCategoryDto } from '../category/dto/edit-category.dto';
import { CreatePresentDto } from './dto/create-present.dto';
import { EditPresentDto } from './dto/edit-present.dto';
import { PresentService } from './present.service';

@Controller('present')
export class PresentController {
    constructor(private presentService: PresentService) { }

    @Put()
    createPresent(@Body() dto: CreatePresentDto) {
        return this.presentService.create(dto);
    }

    @Get()
    getAll() {
        return this.presentService.getAll();
    }

    @Get('/pageAmount/')
    getPagesAmount(@Query() query: any) {
        return this.presentService.getPagesAmount(query);
    }

    @Get('/page=:page')
    getAllByPage(@Param('page') page: number) {
        return this.presentService.getAll(page);
    }

    @Get('/:id')
    getById(@Param('id') id: ObjectId) {
        return this.presentService.getById(id);
    }

    @Get('/:id/page=:page')
    getByIdByPage(@Param('id') id: ObjectId, @Param('page') page: number) {        
        return this.presentService.getByIdByPage(id, page);
    }

    @Post()
    update(@Body() dto: EditCategoryDto) {
        return this.presentService.update(dto);
    }

    @Post('uploadPhoto/:id')
    @UseInterceptors(FilesInterceptor('photos'))
    uploadPhoto(@UploadedFiles() photos: Array<Express.Multer.File>, @Param('id') id: ObjectId) {
        return this.presentService.uploadPhoto(id, photos);
    }

    @Get('photos/:id')
    getPhotosById(@Param('id') id: ObjectId) {
        return this.presentService.getById(id);
    }

    @Get('category/:id')
    getAllNestedById(@Param('id') id: ObjectId) {
        return this.presentService.getAllProducts(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.presentService.delete(id);
    }
}
