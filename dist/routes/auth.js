"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.route('/register').post(user_1.Register);
exports.UserRouter.route('/login').post(user_1.Login);
exports.UserRouter.route('/users').get(user_1.allUsers);
exports.UserRouter.route('/user/:id').get(user_1.singleUser).put(user_1.updateUser).delete(user_1.deleteUser);
