import express from "express"
import {Register, Login, allUsers, singleUser, updateUser, deleteUser} from "../controller/user"

export const UserRouter = express.Router()

UserRouter.route('/register').post(Register)
UserRouter.route('/login').post(Login)
UserRouter.route('/users').get(allUsers)
UserRouter.route('/user/:id').get(singleUser).put(updateUser).delete(deleteUser)
