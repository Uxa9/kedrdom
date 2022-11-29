import { ObjectId } from "mongoose";

export class CreatePresentDto {
    readonly name : string;
    readonly brief : string;
    readonly price : number;
    readonly desc : string;
    readonly containment : string[];
    readonly catId : ObjectId; 
}