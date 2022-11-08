import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocumnet } from './schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor (@InjectModel(Category.name) private categoryModel: Model<CategoryDocumnet>) {}
    
    async create(dto: CreateCategoryDto): Promise<Category> {
        try {
            const cat = await this.categoryModel.create({ ...dto, show: false });
            
            return cat;
        } catch (error) {
            throw new HttpException({
                error: "CREATION_FAILED"
            }, HttpStatus.BAD_REQUEST)   
        }
    }

    async getAll(): Promise<Category[]> {
        const cats = await this.categoryModel.find();

        return cats;
    }

    async getById(id: ObjectId): Promise<Category> {
        try {
            const cat = await this.categoryModel.findById(id);
            
            return cat;
        } catch (error) {
            throw new HttpException({
                error: "ID_NOT_FOUND"
            }, HttpStatus.NOT_FOUND)   
        }
    }

    async delete(id: ObjectId): Promise<any> {
        await this.categoryModel.deleteOne({ _id: id });

        return { status: "ok" };
    }
}
