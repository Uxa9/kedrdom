import { ObjectId } from "mongoose";

export class EditPresentDto {
    readonly _id : ObjectId;
    readonly name : string;
    readonly brief : string;
    readonly price : number;
    readonly desc : string;
    readonly containment : string[];
    readonly catId : ObjectId; 
}