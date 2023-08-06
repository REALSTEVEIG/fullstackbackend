"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.singleUser = exports.allUsers = exports.Login = exports.Register = void 0;
const auth_1 = require("../model/auth");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'fail',
                error: "Please provide your username, email and password"
            });
        }
        const user = yield auth_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: 'fail',
                error: 'Email already exists'
            });
        }
        const newUser = yield auth_1.User.create(Object.assign({}, req.body));
        const token = yield newUser.createJWT();
        return res.status(201).json({
            status: 'success',
            user: newUser,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'fail',
            erorr: error
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        const user = yield auth_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: 'Email does not exist!'
            });
        }
        const comparePassword = yield user.comparePasswords(password);
        if (!comparePassword) {
            return res.status(400).json({
                status: "fail",
                message: "Incorrect password"
            });
        }
        const token = yield user.createJWT();
        return res.status(200).json({
            status: "Success",
            user: user,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error: error
        });
    }
});
exports.Login = Login;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield auth_1.User.find({});
        if (!users) {
            return res.status(404).json({
                status: 'fail',
                message: "No user found!"
            });
        }
        return res.status(200).json({
            status: 'success',
            users
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error: error
        });
    }
});
exports.allUsers = allUsers;
const singleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide the user's ID"
            });
        }
        const user = yield auth_1.User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!"
            });
        }
        return res.status(200).json({
            status: "success",
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        });
    }
});
exports.singleUser = singleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield auth_1.User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!"
            });
        }
        const updateUser = yield auth_1.User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updateUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!"
            });
        }
        return res.status(200).json({
            status: "success",
            user: updateUser
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide the user's ID"
            });
        }
        const deleteUser = yield auth_1.User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        });
    }
});
exports.deleteUser = deleteUser;
