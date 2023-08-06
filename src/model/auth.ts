import {Document, Schema, model} from "mongoose"
import bcryt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface IUser extends Document {
    username : string,
    email : string,
    password : string,
    createJWT : () => string,
    comparePasswords : (password : string) => boolean
}

const authSchema = new Schema<IUser>({
    username : {
        type : String,
    },

    email : {
        type : String,
    },
    password : {
        type : String
    }
})

authSchema.pre('save', async function () {
    const salt = await bcryt.genSalt(10)
    this.password = await bcryt.hash(this.password, salt)
})

authSchema.methods.createJWT = function () {
    return jwt.sign({id : this._id, username : this.username, email : this.email},
        process.env.JWT_SECRET as string, {expiresIn : process.env.JWT_EXPIRES as string}    
    )
}

authSchema.methods.comparePasswords = async function (password : string) {
    const isMatched = await bcryt.compare(password, this.password)
    return isMatched
}

export const User = model<IUser>("User", authSchema)