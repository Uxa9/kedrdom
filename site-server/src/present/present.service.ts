import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Present, PresentDocument} from "./schemas/present.schema";
import {Category} from "../category/schemas/category.schema";
import {EditCategoryDto} from "../category/dto/edit-category.dto";
import { FilesService, FileType } from '../files/files.service';
import { CreatePresentDto } from './dto/create-present.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PresentService {
    constructor(
        @InjectModel(Present.name) private presentModel: Model<PresentDocument>,
        private fileService : FilesService,
        private categoryService: CategoryService,
    ) {}

    async create(dto: CreatePresentDto): Promise<Present> {
        try {
            const present = await this.presentModel.create({ ...dto, photos: [] });
            return present._id;
        }
        catch(e) {
            throw new HttpException({
                status: "not created"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async uploadPhoto(id: ObjectId, files): Promise<string> {        
        const fileNames = this.fileService.createFiles(FileType.PRODUCT, files);
        
        await this.presentModel.findByIdAndUpdate(id, {
            $push: {"photos": fileNames }
        });

        return fileNames[0];
    }

    async getAll(page: number = 0): Promise<Present[]> {
        try {
            return this.presentModel.find();
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getById(id: ObjectId): Promise<Present> {
        try {
            return this.presentModel.findById(id);
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getByIdByPage(category: ObjectId, page: number = 0): Promise<Present[]> {

        const cats = (await this.categoryService.getAllNestedById(category)).map(cat => cat._id);
        
        if (page !== 0) return this.presentModel.find({categoryId: { $in: cats }}).limit(9).skip(--page * 9);
        else return this.presentModel.find({categoryId: { $in: cats }});

    }

    async getAllProducts(category: ObjectId): Promise<Present[]> {

        const cats = await this.categoryService.getAllNestedById(category);

        const catsName = cats.map(cat => cat._id);
        

        return this.presentModel.find({categoryId: { $in: catsName }});
    }

    async update(dto: EditCategoryDto): Promise<any> {
        try {
            await this.presentModel.findByIdAndUpdate(dto._id, dto);

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
            await this.presentModel.deleteOne({ _id : id });

            return { status: "deleted" }
        }
        catch(e) {
            throw new HttpException({
                status: "error"
            }, HttpStatus.BAD_GATEWAY);
        }
    }

    async getPagesAmount(query: any): Promise<Number> {

        if (query.categoryId !== undefined) {
            const categories = (await this.categoryService.getAllNestedById(query.categoryId)).map(item => item._id.toString());
            
            return Math.ceil((await this.presentModel.find({ categoryId : { $in : categories }}).select('_id')).length / 9);
        
        } else {
            return Math.ceil((await this.presentModel.find().select('_id')).length / 9);
        }        
    }
}
