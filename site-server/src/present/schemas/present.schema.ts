import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PresentDocumnet = Present & Document;

@Schema()
export class Present {

    @Prop()
    name: string;

    @Prop()
    brief: string;

    @Prop()
    price: number;    
    
    @Prop()
    description: string;

    @Prop([String])
    containment: string[];

    @Prop()
    categoryId: string;

    @Prop()
    show: boolean;
}

export const PresentSchema = SchemaFactory.createForClass(Present);