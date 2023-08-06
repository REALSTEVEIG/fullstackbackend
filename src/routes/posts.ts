import express from "express";

export const PostRouter = express.Router();

import { createPost, allPosts, singlePost, updatePost, deletePost } from "../controller/post";

PostRouter.route("/posts").get(allPosts).post(createPost);
PostRouter.route("/post/:id").get(singlePost);
PostRouter.route("/post/:id").put(updatePost).delete(deletePost);