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
exports.deletePost = exports.updatePost = exports.singlePost = exports.allPosts = exports.createPost = void 0;
const posts_1 = require("../model/posts");
const auth_1 = require("../model/auth");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, authorId } = req.body;
        // Find the user by their ID
        const author = yield auth_1.User.findById(authorId);
        if (!author) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!',
            });
        }
        // Create the post with the user as the author
        const post = yield posts_1.Post.create({ title, body, author: author._id });
        return res.status(201).json({
            status: 'success',
            post,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'fail',
            error,
        });
    }
});
exports.createPost = createPost;
const allPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Testing nginx for load-balancing..`);
        const posts = yield posts_1.Post.find().populate('author');
        return res.status(200).json({
            status: "Success!",
            posts,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error,
        });
    }
});
exports.allPosts = allPosts;
const singlePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_1.Post.findById(id).populate('author');
        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found!"
            });
        }
        return res.status(200).json({
            status: "success",
            post
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        });
    }
});
exports.singlePost = singlePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_1.Post.findById(id);
        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found!"
            });
        }
        const updatePost = yield posts_1.Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatePost) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found!"
            });
        }
        return res.status(200).json({
            status: "success",
            post: updatePost
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_1.Post.findById(id);
        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found!"
            });
        }
        yield posts_1.Post.findByIdAndDelete(id);
        return res.status(200).json({
            status: "success",
            message: "Post deleted successfully!"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        });
    }
});
exports.deletePost = deletePost;
