import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { PFC, PfcSchema } from "./pfc.schema";
import { Variants, VariantsSchema } from "./variants.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop()
    name: string;

    @Prop()
    brief: string;
    
    @Prop()
    description: string;

    @Prop([String])
    compound: string;

    @Prop({ type: PfcSchema })
    pfc: PFC;

    @Prop([String])
    photos: string[];

    @Prop()
    expiredDate: string;

    @Prop()
    storageCondition: string;

    @Prop({ type: [VariantsSchema]})
    variants: Variants[];

    @Prop()
    show: boolean;

    @Prop()
    categoryId: string;

    @Prop()
    isNew: boolean;

    @Prop()
    isPopular: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);