import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String, // 真实名称
  order: Number,
  alias:  String // 别称
},{
  versionKey: false
});

export const Category = mongoose.model('Category', CategorySchema, 'category');