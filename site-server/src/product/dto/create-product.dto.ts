import { ObjectId } from "mongoose";

export class CreateProductDto {
    readonly name : string;
    readonly brief : string;
    readonly description : number;
    readonly compound : string[];
    readonly proteins : string;
    readonly pfc : object;
    readonly storageCondition : string;
    readonly show : boolean
    readonly categoryId : ObjectId;
}