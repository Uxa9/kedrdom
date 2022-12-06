import { ObjectId } from "mongoose";

export class CreateVariantDto {
    readonly _id : ObjectId;
    readonly weight : number;
    readonly price : number;
    readonly available : boolean;
    readonly supplyDate : string;
}