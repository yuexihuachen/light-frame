import { Post } from "../schemas/index";
import { Request, Response } from "express";
import APIResponse from "./response";

export class PostClass extends APIResponse {
    constructor() {
        super()
    }

    async create(req: Request, res: Response) {
        const { title, content, categoryId, published } = req.body;
        const createPost = new Post({
            title, content, categoryId, published
        });
        const data = await createPost.save()
        res.json(data)
    }


    async find(req: Request, res: Response) {
        const { query = {}, options = {} } = req.body;
        let titleRegex = {}
        if (query.title) {
            titleRegex = {
                title:  {
                    $regex: new RegExp(`${query.title}`)
                }
            }
            delete query.title;
        }
        const data = await Post.find({
            ...query,
            ...titleRegex
        }, options);
        res.json(data)
    }


    async update(req: Request, res: Response) {
        const { _id, updatePostDto } = req.body;
        const updateData = await Post.updateOne({
            _id
        }, {
            $set: updatePostDto
        })
        res.json(updateData);
    }


    async delete(req: Request, res: Response) {
        const { _id } = req.body;
        res.json(await Post.deleteOne({_id}));
    }
}