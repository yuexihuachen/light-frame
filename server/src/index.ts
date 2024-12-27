import { type Context, Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { csrf } from 'hono/csrf';
import * as nunjucks from 'nunjucks';
import { jwt } from 'hono/jwt'
import connectDB from './DB/db';
import { userRoute, categoryRoute, postRoute } from './routes/index';
import {CONSTANTS} from './constants/constants';
import { HTTPException } from 'hono/http-exception';
import { serveStatic } from 'hono/bun';
import indexTemp from "./views/index.html" with { type: "text" };
import manifest from "../static/.vite/manifest.json" with { type: "json" };
import { Category } from './schemas/index';

const app = new Hono();
const port = Bun.env['PORT'] || 3000;

connectDB();

// csrf跨站请求伪造
app.use(csrf());
// 美化 json
app.use(prettyJSON());

app.use(
  '/:name/auth/*',
  jwt({
    secret: Bun.env.AT_SECRET as string,
  })
)

app.route('/user', userRoute);
app.route('/category', categoryRoute);
app.route('/post', postRoute);

// 静态资源目录
app.use('/static/*', serveStatic({ root: '/' }));
app.use('*', serveStatic({ root: '/static/' }));

app.get('/:name?', async (cxt: Context) => {
  let manifestFile = manifest;
  if (Bun.env.NODE_ENV !== 'production') {
    const filePath = Bun.resolveSync("./static/.vite/manifest.json", process.cwd());
    const file = Bun.file(filePath);
    manifestFile = await file.json();
  }
  const staticName = "src/index.tsx";
  const category = await Category.find({},{});
  const html = nunjucks.renderString(indexTemp, {
    css: `/static/${manifestFile[staticName].css}`,
    js: `/static/${manifestFile[staticName].file}`,
    category: JSON.stringify(category),
  });
  return cxt.html(html);
});

app.notFound(async (cxt: Context) => {
  const staticName = "src/error/error.tsx";
  const html = nunjucks.renderString(indexTemp, {
    css: `/static/${manifest[staticName].css}`,
    js: `/static/${manifest[staticName].file}`
  });
  return cxt.html(html);
})

// 错误返回,jwt验证错误返回
app.onError((err, c) => {
  let msg = CONSTANTS.FAILURE;
  if (err instanceof HTTPException && err.message === 'Unauthorized') {
    msg = {
      ...CONSTANTS.INVALID_ACCESS_TOKEN,
      data: err
    };
  }
  return c.json(msg, 404);
})

export default { 
  port, 
  fetch: app.fetch, 
}
