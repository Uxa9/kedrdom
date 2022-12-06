import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { EditCategoryDto } from '../category/dto/edit-category.dto';
import { ProductService } from './product.service';
import {CreateProductDto} from "./dto/create-product.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private categoryService: CategoryService
    ) {}

    @Put()
    @UseInterceptors(FilesInterceptor('photos'))
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    getAll(@Query() query: Object) {
        return this.categoryService.getAll(query);
    }

    @Post()
    update(@Body() dto: EditCategoryDto) {
        return this.categoryService.update(dto);
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
        return this.categoryService.delete(id);
    }
}
