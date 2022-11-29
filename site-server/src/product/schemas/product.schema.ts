import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { PFC } from "./pfc.schema";
import { Variants } from "./variants.schema";

export type ProductDocumnet = Product & Document;

@Schema()
export class Product {

    @Prop()
    name: string;

    @Prop()
    brief: string;
    
    @Prop()
    description: string;

    @Prop([String])
    compound: string[];

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'PFC' }})
    pfc: PFC;

    @Prop([String])
    photos: string[];

    @Prop()
    expiredDate: string;

    @Prop()
    storageCondition: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variants' }]})
    variants: Variants[];

    @Prop()
    categoryId: mongoose.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Product);