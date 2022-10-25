import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocumnet } from './schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor (@InjectModel(Category.name) private categoryModel: Model<CategoryDocumnet>) {}
    
    async create(dto: CreateCategoryDto): Promise<Category> {
        const cat = await this.categoryModel.create({ ...dto, show: false });

        return cat;
    }

    async getAll(): Promise<Category[]> {
        const cats = await this.categoryModel.find();

        return cats;
    }

    async getById(id: ObjectId): Promise<Category> {
        const cat = await this.categoryModel.findById(id);

        return cat;
    }

    async delete(id: ObjectId): Promise<any> {
        await this.categoryModel.deleteOne({ _id: id });

        return { status: "ok" };
    }
}
