import { Hono, type Context } from 'hono';
import {posts} from "../controllers/index";

const post = new Hono()

// Login User
post.get('/find', (c: Context) => posts.getPosts(c))

export default post