import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VariantsDocumnet = Variants & Document;

@Schema()
export class Variants {

    @Prop()
    weight: number;

    @Prop()
    price: number;
    
    @Prop()
    available: boolean;

    @Prop()
    supplyDate: string;

}

export const VariantsSchema = SchemaFactory.createForClass(Variants);