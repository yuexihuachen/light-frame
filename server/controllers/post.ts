import { Post } from "../models/index";
import type { Context } from "hono";

export const getPosts = async (c: Context) => {
    const body = await c.req.json()
    const posts = await Post.find(body)
    
    return c.json({
        code: 0,
        data: posts,
        message: 'success',
    })
}