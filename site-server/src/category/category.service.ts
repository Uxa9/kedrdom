import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor (@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}
    
    async create(dto: CreateCategoryDto): Promise<Category> {
        try {
            return this.categoryModel.create({ upCategory: "", ...dto, show: true });
        }
        catch(e) {
            throw new HttpException({
                status: "not created"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getAll(params: Object): Promise<Category[]> {
        try {
            return this.categoryModel.find(params)
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getById(id: ObjectId): Promise<Category> {
        try {
            return this.categoryModel.findById(id);
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
    }

    async update(dto: EditCategoryDto): Promise<any> {
        try {
            await this.categoryModel.findByIdAndUpdate(dto._id, dto);

            return { status: "updated" }
        }
        catch(e) {
            throw new HttpException({
                status: "error"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: ObjectId): Promise<any> {
        try {
            await this.categoryModel.deleteOne({ _id : id });

            return { status: "deleted" }
        }
        catch(e) {
            throw new HttpException({
                status: "error"
            }, HttpStatus.BAD_GATEWAY);
        }
    }
}
