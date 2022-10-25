import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PFCDocumnet = PFC & Document;

@Schema()
export class PFC {

    @Prop()
    proteins: number;

    @Prop()
    fats: number;
    
    @Prop()
    carbohydrates: number;
}

export const CategorySchema = SchemaFactory.createForClass(PFC);