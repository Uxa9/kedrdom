import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { FilesService, FileType } from '../files/files.service';
import { Product, ProductDocument } from './schemas/product.schema';
import {CreateProductDto} from "./dto/create-product.dto";
import { EditProductDto } from './dto/edit-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Variants, VariantsDocumnet } from './schemas/variants.schema';
import { DeleteVariantDto } from './dto/delete-variant.dto';
import { EditVariantDto } from './dto/edit-variant.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Variants.name) private variantsModel: Model<VariantsDocumnet>,
        private categoryService: CategoryService,
        private fileService : FilesService
    ) {}

    async getById(id: ObjectId): Promise<Product> {

        return await this.productModel.findById(id);
    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find({}, {}, {
            limit: 30
        })
    }

    async getAllProducts(category: ObjectId): Promise<Product[]> {

        const cats = await this.categoryService.getAllNestedById(category);

        const catsName = cats.map(cat => cat._id);
        

        return this.productModel.find({categoryId: { $in: catsName }});
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const product = await this.productModel.create({ ...dto });

        return product._id;
    }

    async uploadPhoto(id: ObjectId, files): Promise<string> {        
        const fileNames = this.fileService.createFiles(FileType.PRODUCT, files);
        
        await this.productModel.findByIdAndUpdate(id, {
            $push: {"photos": fileNames }
        });

        return fileNames[0];
    }

    async update(dto: EditProductDto): Promise<any> {       
        try {
            await this.productModel.findByIdAndUpdate(dto._id, dto);

            return { status: "updated" }
        }
        catch(e) {
            throw new HttpException({
                status: "error"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: ObjectId): Promise<any> {
        await this.productModel.findByIdAndDelete(id);

        return;
    }

    async addVariant(dto: CreateVariantDto): Promise<any> {
        try {
            const product = await this.productModel.findById(dto._id);

            const variant = await this.variantsModel.create({
                weight: dto.weight,
                price: dto.price,
                supplyDate: dto.supplyDate,
                available: dto.available
            });

            await product.update({ $push: { variants: variant }});

            return product;
        }
        catch(e) {
            console.log(e);
            
            throw new HttpException({
                status: "error"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteVariant(dto: DeleteVariantDto): Promise<any> {
        
        await this.productModel.findByIdAndUpdate(dto._id, {
            $pull: {"variants": { _id: dto.variantId }}
        });

        return;
    }

    async updateVariant(dto: EditVariantDto): Promise<any> {

        const variant = await this.variantsModel.create({
            weight: dto.weight,
            price: dto.price,
            supplyDate: dto.supplyDate,
            available: dto.available
        });

        await this.productModel.findByIdAndUpdate(dto._id, {
            $pull: {"variants": { _id: dto.variantId }}
        });

        await this.productModel.findByIdAndUpdate(dto._id, {
            $push: {"variants": variant }
        });

        // cringe

        return;
    }

}
