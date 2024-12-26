import * as mongoose from 'mongoose';
/**
 * 所有内容都源自Schema。
 * 每个架构都映射到 MongoDB 集合并定义该集合中文档的形状。
 * 架构用于定义模型。模型负责从底层 MongoDB 数据库创建和读取文档。
 */
export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
},{
  versionKey: false
});

export const User = mongoose.model('User', UserSchema, 'user');


