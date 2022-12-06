import { ObjectId } from "mongoose";

export class EditVariantDto {
    readonly _id : ObjectId;
    readonly variantId : ObjectId;
    readonly weight : number;
    readonly price : number;
    readonly available : boolean;
    readonly supplyDate : string;
}