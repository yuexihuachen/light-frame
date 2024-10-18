import { Hono, type Context } from 'hono';
import {user} from "../controllers/index";

const users = new Hono()

// Login User
users.post('/login', (c:Context) => user.loginUser(c));

// refresh token
users.post('/refresh', c => user.refreshToken(c))

export default users