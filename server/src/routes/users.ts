import express, {Router} from "express";
import { Users } from "../controllers/users";

const router: Router = express.Router()
const users = new Users()

// Login User
router.post('/login', users.loginUser);

// refresh token
router.post('/refresh', users.refreshToken)

export {
    router
}