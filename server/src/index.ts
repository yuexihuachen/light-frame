import { Hono, type Context } from 'hono';
import { serveStatic } from 'hono/bun';
import * as nunjucks from "nunjucks";
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { Env } from './interface/env';
import { CONSTANTS } from './constants/constants';
import { jwt } from 'hono/jwt'
import { authGuard } from './middlewares/auth';
import connectDB from './db/db';
import users from './routes/users';
import template from "./views/index.html" with { type: "html" };
import manifest from "../static/.vite/manifest.json" with { type: "json" };

const app = new Hono()
const port = Bun.env['PORT'] || 3000;

connectDB();

if (Bun.env.NODE_ENV === Env.dev) {
  app.use(logger())
}

// cors
app.use(
  '*',
  cors({
    origin: ['https://kongzi.eu.org'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

// csrf跨站请求伪造
app.use(csrf());

// 美化 json
app.use(prettyJSON());

app.use(
  '/auth/*',
  jwt({
    secret: Bun.env['AT_SECRET'] as string,
  })
)

app.route('/user', users);

app.get('/auth/page', (c) => {
  const payload = c.get('jwtPayload');
  return c.json(payload) 
})

// 静态资源目录
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c: Context) => {
    const staticName ="src/main.tsx";
    const html = nunjucks.render(template, {
      css: `/static/${manifest[staticName].css}`,
      js: `/static/${manifest[staticName].file}`
    });
    return c.html(html)
})

// 自定义“未找到响应” /page 路由不存在
app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

// 错误返回,jwt验证错误返回
app.onError((err, c) => {
  const msg = {
    ...CONSTANTS.INVALID_ACCESS_TOKEN,
    data: err
  };
  return c.json(msg);
})

export default {
    port,
    fetch: app.fetch,
}