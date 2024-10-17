import { Hono, Context } from 'hono';
import { serveStatic } from 'hono/bun';
import * as nunjucks from "nunjucks";
import template from "./views/index.html" with { type: "html" };
import manifest from "../static/.vite/manifest.json" with { type: "json" };

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c: Context) => {
    const staticName ="src/main.tsx";
    const html = nunjucks.render(template, {
      css: `/static/${manifest[staticName].css}`,
      js: `/static/${manifest[staticName].file}`
    });
    return c.html(html)
})

export default app