import { Hono, type Context } from 'hono';
import {categories} from "../controllers/index";

const category = new Hono()

// Login User
category.get('/find', (c: Context) => categories.getCategories(c))


export default category