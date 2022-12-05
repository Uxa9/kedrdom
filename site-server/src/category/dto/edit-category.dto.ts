import { ObjectId } from "mongoose";

export class EditCategoryDto {
    readonly _id : ObjectId;
    readonly name : string;
    readonly upCategory : string;
    readonly show : boolean;
}