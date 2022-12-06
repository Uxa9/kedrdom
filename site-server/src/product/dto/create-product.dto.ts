import { ObjectId } from "mongoose";

export class CreateProductDto {
    readonly name : string;
    readonly brief : string;
    readonly description : number;
    readonly compound : string[];
    readonly proteins : string;
    readonly fats : string;
    readonly carbohydrates : string;
    readonly expiredDate : string;
    readonly storageCondition : string;
    readonly show : boolean
    readonly categoryId : ObjectId;
}