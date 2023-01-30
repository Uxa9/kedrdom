import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Present, PresentDocument} from "./schemas/present.schema";
import {Category} from "../category/schemas/category.schema";
import {EditCategoryDto} from "../category/dto/edit-category.dto";
import { FilesService, FileType } from '../files/files.service';
import { CreatePresentDto } from './dto/create-present.dto';

@Injectable()
export class PresentService {
    constructor(
        @InjectModel(Present.name) private presentModel: Model<PresentDocument>,
        private fileService : FilesService
    ) {}

    async create(dto: CreatePresentDto): Promise<Present> {
        try {
            const present = await this.presentModel.create({ ...dto, photos: [] });
            console.log('aboba')
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

    async getAll(): Promise<Category[]> {
        try {
            return this.presentModel.find();
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getById(id: ObjectId): Promise<Category> {
        try {
            return this.presentModel.findById(id);
        }
        catch(e) {
            throw new HttpException({
                status: "not found"
            }, HttpStatus.NOT_FOUND);
        }
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
}
