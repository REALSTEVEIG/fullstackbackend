import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connect';
import { UserRouter } from './routes/auth';
import { PostRouter } from './routes/posts';
import { authMiddleware } from './middleware/auth';

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const port = parseInt(process.env.PORT as string) || 3000

app.use('/api/v1', UserRouter)
app.use('/api/v1', authMiddleware, PostRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI as string)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()