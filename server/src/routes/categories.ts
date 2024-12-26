import express, {Router} from "express";
import {CategoryClass} from "../controllers/categories";

const router: Router = express.Router();
const category = new CategoryClass();

// create Post
router.post('/auth/category/create', category.create);

// find Post
router.post('/category/find', category.findAll)

// update post
router.post('/auth/category/update', category.update)

// delete post
router.post('/auth/category/delete', category.delete)

export default router