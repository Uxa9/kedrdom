import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from 'src/files/files.service';
import { CategoryModule } from '../category/category.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { Variants, VariantsSchema } from './schemas/variants.schema';

@Module({
    imports: [
        CategoryModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: Variants.name, schema: VariantsSchema }])
    ],
    controllers: [ProductController],
    providers: [ProductService, FilesService]
})
export class ProductModule { }
