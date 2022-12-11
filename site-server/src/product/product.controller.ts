import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';
import {CreateProductDto} from "./dto/create-product.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import { EditProductDto } from './dto/edit-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { DeleteVariantDto } from './dto/delete-variant.dto';
import { EditVariantDto } from './dto/edit-variant.dto';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private categoryService: CategoryService
    ) {}

    @Put()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    getAll() {
        return this.productService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: ObjectId) {
        return this.productService.getById(id);
    }

    @Post()
    update(@Body() dto: EditProductDto) {
        return this.productService.update(dto);
    }

    @Post('uploadPhoto/:id')
    @UseInterceptors(FilesInterceptor('photos'))
    uploadPhoto(@UploadedFiles() photos: Array<Express.Multer.File>, @Param('id') id: ObjectId) {
        return this.productService.uploadPhoto(id, photos);
    }

    @Get('photos/:id')
    getPhotosById(@Param('id') id: ObjectId) {
        return this.productService.getById(id);
    }

    // @Get(':id')
    // getById(@Param('id') id: ObjectId) {
    //     return this.categoryService.getById(id);
    // }

    @Get('category/:id')
    getAllNestedById(@Param('id') id: ObjectId) {
        return this.productService.getAllProducts(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.productService.delete(id);
    }

    @Put('variant')
    addVariant(@Body() dto: CreateVariantDto) {
        return this.productService.addVariant(dto);
    }

    @Post('variant/delete')
    deleteVariant(@Body() dto: DeleteVariantDto) {
        return this.productService.deleteVariant(dto);
    }

    @Post('variant/update')
    updateVariant(@Body() dto: EditVariantDto) {
        return this.productService.updateVariant(dto);
    }
}
