import { User } from "../schemas/index";
import type { Context } from "hono";
import { generatesToken, verifyToken } from "../utils/utils";
import { setCookie } from 'hono/cookie';
import { CONSTANTS } from '../constants/constants';

export const getTokens = async (user: any) => {
    // at Token expires 6 hours
    // const atExpires: number =  Math.floor(Date.now() / 1000) + 60 * 60 * 6;
    const atExpires: number =  Math.floor(Date.now() / 1000) + 60 * 1;
    // rt Token expires 7 days
    // const rtExpires: number = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const rtExpires: number = Math.floor(Date.now() / 1000) + 60 * 7;

    const payload = { _id: user._id, username: user.username };

    const [at, rt] = await Promise.all([
        generatesToken({
            ...payload,
            exp: atExpires
        }, Bun.env["AT_SECRET"] as string),
        generatesToken({
            ...payload,
            exp: rtExpires
        }, Bun.env["RT_SECRET"] as string)
    ]);

    return {
        at,
        rt
    };
}

// 登录
export const loginUser = async (c: Context) => {
    const { username, password } = await c.req.json();

    const user = await User.findOne({ username, password })
    if (!user) {
        return c.json({
            code: -1,
            data: 'No user found with this username',
            message: 'failed'
        })
    }

    const tokenUser = {
        _id: user._id,
        username: user.username
    }

    const {at, rt} = await getTokens(tokenUser);

    setCookie(c, 'at', at);
    setCookie(c, 'rt', rt);

    return c.json({
        code: 0,
        data: {
            ...tokenUser,
            at,
            rt,
        },
        message: 'success',
    })
}

// refresh token
export const refreshToken = async (c: Context) => {
  let newToken: any = {};
  if (
    c.req.header("Authorization") &&
    c.req.header("Authorization")?.startsWith("Bearer")
  ) {
    try {
      const token = c.req.header("Authorization")?.replace(/Bearer\s+/i, "");
      if (!token) {
        return c.json(CONSTANTS.INVALID_REFRESH_TOKEN);
      }

      const verifyUser = await verifyToken(token, Bun.env["RT_SECRET"] as string);

      if (!verifyUser) {
        return c.json(CONSTANTS.INVALID_REFRESH_TOKEN);
      }
      newToken = await getTokens(verifyUser);
    } catch (err) {
      return c.json(CONSTANTS.INVALID_REFRESH_TOKEN);
    }
  }

  return c.json(newToken);
};