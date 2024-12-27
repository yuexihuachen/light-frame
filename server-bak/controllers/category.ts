import { Category } from "../models/index";
import type { Context } from "hono";

export const getCategories = async (c: Context) => {
    const id = await c.req.query('id');
    let body = {}
    if (id) {
        body = {
            _id: id
        }
    }
    const categories = await Category.find(body)
    
    return c.json({
        code: 0,
        data: categories,
        message: 'success',
    })
}