import { Hono, type Context } from 'hono';
import { serveStatic } from 'hono/bun';
import * as nunjucks from "nunjucks";
import connectDB from './db/db';
import template from "./views/index.html" with { type: "html" };
import manifest from "./static/.vite/manifest.json" with { type: "json" };
import {post, category} from "./routes/index";

const app = new Hono();
const port = Bun.env['PORT'] || 3000;

connectDB();

app.use('/static/*', serveStatic({ root: './' }));
app.use('*', serveStatic({ root: '/static/' }));

app.route('/post', post);
app.route('/category', category);

app.get('*', async (c: Context) => {
    const staticName ="src/index.tsx";
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