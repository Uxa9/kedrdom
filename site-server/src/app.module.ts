import { Module } from "@nestjs/common";
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PresentModule } from './present/present.module';
import { MongooseModule } from "@nestjs/mongoose";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';


@Module({
  imports: [
    CategoryModule, 
    ProductModule, 
    PresentModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/kedrdom'),
    FilesModule,
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
]
})
export class AppModule {}