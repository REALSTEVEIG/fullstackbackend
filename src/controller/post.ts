import {Post, IPost} from "../model/posts"
import {User, IUser} from "../model/auth"
import {Request, Response} from "express"


export const createPost = async (req: Request, res: Response) => {
    try {
      const { title, body, authorId } = req.body;
  
      // Find the user by their ID
      const author: IUser | null = await User.findById(authorId);
      if (!author) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found!',
        });
      }
  
      // Create the post with the user as the author
      const post: IPost = await Post.create({ title, body, author: author._id });
  
      return res.status(201).json({
        status: 'success',
        post,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        error,
      });
    }
  };

  export const allPosts = async (req: Request, res: Response) => {
    try {
        console.log(`Testing nginx.`)
        const posts = await Post.find().populate('author');

        return res.status(200).json({
            status: "Success!",
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error,
        });
    }
};

export const singlePost = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        const post = await Post.findById(id).populate('author')

        if (!post) {
            return res.status(404).json({
                status : "fail",
                message : "Post not found!"
            })
        }

        return res.status(200).json({
            status : "success",
            post
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error
        })
    }
}


export const updatePost = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                status : "fail",
                message : "Post not found!"
            })
        }

        const updatePost = await Post.findByIdAndUpdate(id, req.body, {new : true, runValidators : true})

        if (!updatePost) {
            return res.status(404).json({
                status : "fail",
                message : "Post not found!"
            })
        }

        return res.status(200).json({
            status : "success",
            post : updatePost
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error
        })
    }
}

export const deletePost = async (req : Request, res : Response) => {
    try {
        const {id} = req.params

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                status : "fail",
                message : "Post not found!"
        })

        }
        await Post.findByIdAndDelete(id)

        return res.status(200).json({
            status : "success",
            message : "Post deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            error
        })
    }
}