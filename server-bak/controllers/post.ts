import { Post } from "../models/index";
import type { Context } from "hono";

export const getPosts = async (c: Context) => {
    const id = await c.req.query('id');
    let body = {}, options= {}
    if (id) {
        body = {
            _id: id
        }
    } else {
        options = {"_id":1,"title":1,"categoryId":1,"published":1}
    }
    const posts = await Post.find(body, options);
    
    return c.json({
        code: 0,
        data: posts,
        message: 'success',
    })
}