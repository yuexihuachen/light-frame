import { Hono } from 'hono';
import {UserClass} from "../controllers/users";

const userRoute = new Hono();
const userClass = new UserClass()

// Login User
userRoute.post('/login', userClass.loginUser);

// refresh token
userRoute.post('/refresh', userClass.refreshToken)

export default userRoute