import { Category } from '../schemas/index';
import type { Context } from 'hono';
/**
 * 注意mongoose的版本问题
 */
export class CategoryClass {
  async create(cxt: Context) {
    const body = await cxt.req.json();
    const createCategory = new Category({
      name: body.name,
      alias: body.alias,
    });
    const data = await createCategory.save();
    return cxt.json(data);
  }

  async findAll(cxt: Context) {
    const body = await cxt.req.json();
    const data = await Category.find(body.query, body.options);
    return cxt.json(data);
  }

  async update(cxt: Context) {
    const body = await cxt.req.json();
    const updateData = await Category.updateOne(
      {
        _id: body._id,
      },
      {
        $set: body.updateCategoryDto,
      }
    );
    return cxt.json(updateData);
  }

  async delete(cxt: Context) {
    const body = await cxt.req.json();
    return cxt.json(await Category.deleteOne({ _id: body._id }));
  }
}
