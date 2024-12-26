import { Category } from "../schemas/category.schema";
import { Request, Response } from "express";

/**
 * 注意mongoose的版本问题
 */
export class CategoryClass {
    async create(req: Request, res: Response) {
        const { name, alias } = req.body;
        const createCategory = new Category({
            name,alias
        });
        const data = await createCategory.save();
        res.json(data)
    }


    async findAll(req: Request, res: Response) {
        const { query = {}, options = {} } = req?.body || {};
        const data = await Category.find(query, options)
        res.json(data)
    }


    async update(req: Request, res: Response) {
        const { _id, updateCategoryDto } = req.body;
        const updateData = await Category.updateOne({
            _id
        }, {
            $set: updateCategoryDto
        })
        res.json(updateData);
    }


    async delete(req: Request, res: Response) {
        const { _id } = req.body;
        res.json(await Category.deleteOne({_id}));
    }
}