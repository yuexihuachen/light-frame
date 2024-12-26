import express, {Router} from "express";
import {PostClass} from "../controllers/posts";

const router: Router = express.Router()

const post = new PostClass()

// create Post
router.post('/auth/post/create', post.create)

// find Post
router.post('/post/find', post.find)

// update post
router.post('/auth/post/update', post.update)

// delete post
router.post('/auth/post/delete', post.delete)

export {
    router
}