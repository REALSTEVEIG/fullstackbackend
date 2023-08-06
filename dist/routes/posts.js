"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.PostRouter = express_1.default.Router();
const post_1 = require("../controller/post");
exports.PostRouter.route("/posts").get(post_1.allPosts).post(post_1.createPost);
exports.PostRouter.route("/post/:id").get(post_1.singlePost);
exports.PostRouter.route("/post/:id").put(post_1.updatePost).delete(post_1.deletePost);
