"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const auth_1 = require("./auth");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: auth_1.User
    }
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
