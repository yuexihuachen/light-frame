import { Hono, type Context } from 'hono';
import { serveStatic } from 'hono/bun';
import * as nunjucks from "nunjucks";
import connectDB from './db/db';
import template from "./views/index.html" with { type: "html" };
import manifest from "./static/.vite/manifest.json" with { type: "json" };
import post from "./routes/post";

const app = new Hono();
const port = Bun.env['PORT'] || 3000;

connectDB();

app.use('/static/*', serveStatic({ root: './' }));

app.route('/post', post);

app.get('/', async (c: Context) => {
    const staticName ="src/main.tsx";
    const html = nunjucks.render(template, {
      css: `/static/${manifest[staticName].css}`,
      js: `/static/${manifest[staticName].file}`
    });
    return c.html(html)
})

export default {
    port,
    fetch: app.fetch,
}