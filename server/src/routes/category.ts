import { Hono } from 'hono';
import {CategoryClass} from "../controllers/categories";

const categoryRoute = new Hono();
const categoryClass = new CategoryClass()

// create Post
categoryRoute.post('/auth/create', categoryClass.create);

// find Post
categoryRoute.post('/find', categoryClass.findAll)

// update post
categoryRoute.post('/auth/update', categoryClass.update)

// delete post
categoryRoute.post('/auth/delete', categoryClass.delete)


export default categoryRoute