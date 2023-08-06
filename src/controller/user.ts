import {Request, Response} from "express"
import { User } from "../model/auth"

export const Register = async (req : Request, res : Response) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                status : 'fail',
                error : "Please provide your username, email and password"
            })
        }

        const user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                status : 'fail',
                error : 'Email already exists'
            })
        }

        const newUser = await User.create({...req.body})

        const token = await newUser.createJWT()

        return res.status(201).json({
            status : 'success',
            user : newUser,
            token
        })
    } catch (error) {
        return res.status(500).json({
            status : 'fail',
            erorr : error
        })
    }
}

export const Login = async (req : Request, res : Response) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                status : 'fail',
                message : 'Please provide email and password'
            })
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                status : "fail",
                message : 'Email does not exist!'
            })
        }

        const comparePassword = await user.comparePasswords(password)

        if (!comparePassword) {
            return res.status(400).json({
                status : "fail",
                message : "Incorrect password"
            })
        }

        const token = await user.createJWT()

        return res.status(200).json({
            status : "Success",
            user : user,
            token
        })

    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error : error
        })
    }
}

export const allUsers = async (req : Request, res : Response) => {
    try {
        const users = await User.find({})
        
        if (!users) {
            return res.status(404).json({
                status : 'fail',
                message : "No user found!"
            })
        }
        return res.status(200).json({
            status : 'success',
            users
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error : error
        })
    }
}

export const singleUser = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(400).json({
                status : "fail",
                message : "Please provide the user's ID"
            }) 
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                status : "fail",
                message : "User not found!"
            })
        }

        return res.status(200).json({
            status : "success",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error
        })
    }
}

export const updateUser = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        const user = await User.findById(id)
        
        if (!user) {
            return res.status(404).json({
                status : "fail",
                message : "User not found!"
            })
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true, runValidators : true})

        if (!updateUser) {
            return res.status(404).json({
                status : "fail",
                message : "User not found!"
            })
        }

        return res.status(200).json({
            status : "success",
            user : updateUser
        })
    } catch (error : any) {
        return res.status(500).json({
            status : "fail",
            error : error.message
        })
    }
}

export const deleteUser = async (req : Request, res : Response) => {
    try {
      const {id} = req.params
        if (!id) {
            return res.status(400).json({
                status : "fail",
                message : "Please provide the user's ID"
            }) 
        }
        
        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json({
                status : "fail",
                message : "User not found!"
            })
        }

        return res.status(200).json({
            status : "success",
            message : "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error
        })
    }
}