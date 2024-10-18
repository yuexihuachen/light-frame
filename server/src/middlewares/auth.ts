import type { Context, Next } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { CONSTANTS } from '../constants/constants';

// Protect Route for Authenticated Users
export const authGuard = async (c: Context, next: Next) => {
  let token;
  const msg = CONSTANTS.INVALID_ACCESS_TOKEN;

  if (
    c.req.header('Authorization') &&
    c.req.header('Authorization')?.startsWith('Bearer')
  ) {
    try {
      token = c.req.header('Authorization')?.replace(/Bearer\s+/i, '');
      if (!token) {
        return c.json(msg);
      }

      const user = await Jwt.verify(token, Bun.env['AT_SECRET'] as string);
      c.set('jwtPayload', user);

      await next();
    } catch (err) {
      return c.json(msg);
    }
  }

  if (!token) {
    return c.json(msg);
  }
}
