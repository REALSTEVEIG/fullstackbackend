import mongoose from "mongoose"

export const connectDB = (url : string) => {
    mongoose.connect(url)
    .then(() => {
        console.log(`Connected to MongoDB`)
    })
    .catch((error) => {
        console.log(error)
    })
}