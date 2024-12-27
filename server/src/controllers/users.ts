import type { Context } from 'hono';
import { User } from '../schemas/index';
import { CONSTANTS } from '../constants/constants';
import * as Jwt from 'jsonwebtoken';
import { setCookie } from 'hono/cookie';

const getTokens = (user: any) => {
  // at Token expires 6 hours
  const atExpires: string = '6 h';
  // const atExpires: number =  Math.floor(Date.now() / 1000) + 60 * 1;
  // rt Token expires 7 days
  const rtExpires: string = '7 d';
  // const rtExpires: number = Math.floor(Date.now() / 1000) + 60 * 7;

  const payload = { _id: user._id, username: user.username };

  const at: string = Jwt.sign(payload, Bun.env.AT_SECRET as string, {
    expiresIn: atExpires,
  });

  const rt: string = Jwt.sign(payload, Bun.env.RT_SECRET as string, {
    expiresIn: rtExpires,
  });

  return {
    at,
    rt,
  };
};

export class UserClass {
  async loginUser(cxt: Context) {
    
    const body = await cxt.req.json();
    
    const user = await User.findOne({ username: body.username, password: body.password });

    let response: any = CONSTANTS.FAILURE;
    if (user) {
      const tokenUser = {
        _id: user._id,
        username: user.username,
      };

      const { at, rt } = getTokens(tokenUser);

      setCookie(cxt, 'at', at);
      setCookie(cxt, 'rt', rt);
      response = CONSTANTS.SUCCESS;
      response.data = {
        at,
        rt,
      };
    }

    return cxt.json(response);
  }

  async refreshToken(cxt: Context) {
    const body = await cxt.req.json();
    let newToken = CONSTANTS.INVALID_REFRESH_TOKEN;
    if (body?.refreshToken) {
      const verifyUser: any = await Jwt.verify(
        body.refreshToken,
        Bun.env.RT_SECRET as string
      );
      if (verifyUser && verifyUser?.username) {
        try {
          const { at, rt } = getTokens(verifyUser);
  
          setCookie(cxt, 'at', at);
          setCookie(cxt, 'rt', rt);
          newToken = CONSTANTS.SUCCESS;
          newToken.data = {
            at,
            rt
          }
        } catch (err) {
          newToken = CONSTANTS.INVALID_REFRESH_TOKEN;
        }
      }
    }


    return cxt.json(newToken);
  }
}
