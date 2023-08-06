import {Document, Schema, model, Types} from "mongoose"
import { User } from "./auth"

export interface IPost extends Document {
    title : string,
    body : string,
    author : Types.ObjectId
}

const postSchema = new Schema<IPost>({
    title : {
        type : String
    },

    body : {
        type : String
    },

    author : {
        type : Schema.Types.ObjectId,
        ref : User
    }
})

export const Post = model<IPost>("Post", postSchema)