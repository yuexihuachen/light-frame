import * as mongoose from 'mongoose';
/**
 * 所有内容都源自Schema。
 * 每个架构都映射到 MongoDB 集合并定义该集合中文档的形状。
 * 架构用于定义模型。模型负责从底层 MongoDB 数据库创建和读取文档。
 */
export const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    categoryId: String,
    published: Number
},{
  versionKey: false
});

export const Post = mongoose.model('Post', PostSchema, 'post');


