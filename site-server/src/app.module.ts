import { Module } from "@nestjs/common";
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PresentModule } from './present/present.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    CategoryModule, 
    ProductModule, 
    PresentModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017')
]
})
export class AppModule {}