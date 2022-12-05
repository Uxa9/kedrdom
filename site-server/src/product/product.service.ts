import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { FilesService } from '../files/files.service';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private categoryService: CategoryService,
        private fileService : FilesService
    ) {}

    async getAllProducts(category: ObjectId): Promise<Product[]> {

        const cats = await this.categoryService.getAllNestedById(category);

        const catsName = cats.map(cat => cat._id);
        

        return await this.productModel.find({categoryId: { $in: catsName }});
    }

}
