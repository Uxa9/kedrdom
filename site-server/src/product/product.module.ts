import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from 'src/files/files.service';
import { CategoryModule } from '../category/category.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductShema } from './schemas/product.schema';

@Module({
    imports: [
        CategoryModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductShema }])
    ],
    controllers: [ProductController],
    providers: [ProductService, FilesService]
})
export class ProductModule { }
