import { Post } from "../schemas/index";
import type { Context } from "hono";

export class PostClass {
    async create(cxt: Context) {
        const body = await cxt.req.json();
        const createPost = new Post({
            title: body.title, 
            content: body.content, 
            categoryId: body.categoryId,  
            published: body.published
        });
        const data = await createPost.save()
        return cxt.json(data)
    }


    async find(cxt: Context) {
        const body = await cxt.req.json();
        let titleRegex = {}
        if (body.query.title) {
            titleRegex = {
                title:  {
                    $regex: new RegExp(`${body.query.title}`)
                }
            }
            delete body.query.title;
        }
        const data = await Post.find({
            ...body.query,
            ...titleRegex
        }, body.options);
        return cxt.json(data);
    }


    async update(cxt: Context) {
        const body = await cxt.req.json();
        const updateData = await Post.updateOne({
            _id: body._id
        }, {
            $set: body.updatePostDto
        })
        return cxt.json(updateData);
    }


    async delete(cxt: Context) {
        const body = await cxt.req.json();
        return cxt.json(await Post.deleteOne({_id:body._id}));
    }
}