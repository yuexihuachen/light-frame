import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import * as nunjucks from "nunjucks";

const app = new Hono();
const env = import.meta.env;
const pwd = env['PWD'];
nunjucks.configure(`${pwd}/src/views`, { autoescape: true });

app.use('*', serveStatic({ root: './' }));

app.get('/', async (c) => {
    const file = Bun.file(`${pwd}/static/.vite/manifest.json`);
    const manifest = await file.json();
    const staticName ="src/main.tsx"
    const html = nunjucks.render('index.html', {
      css: `/static/${manifest[staticName].css}`,
      js: `/static/${manifest[staticName].file}`
    });
    console.log('hello')
    return c.html(html)
})


export default app