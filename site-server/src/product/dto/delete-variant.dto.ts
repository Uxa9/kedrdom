import { ObjectId } from "mongoose";

export class DeleteVariantDto {
    readonly _id : ObjectId;
    readonly variantId : ObjectId;
}