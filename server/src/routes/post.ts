import { Hono } from 'hono';
import {PostClass} from "../controllers/posts";

const postRoute = new Hono()
const postClass = new PostClass()

// create Post
postRoute.post('/auth/create', postClass.create)

// find Post
postRoute.post('/find', postClass.find)

// update post
postRoute.post('/auth/update', postClass.update)

// delete post
postRoute.post('/auth/delete', postClass.delete)

export default postRoute