import { Body, Controller, Put, Get, Post, Delete, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Put()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Post()
    update(@Body() dto: EditCategoryDto) {
        return this.categoryService.update(dto);
    }

    @Get(':id')
    getById(@Param('id') id: ObjectId) {
        return this.categoryService.getById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.categoryService.delete(id);
    }
}
