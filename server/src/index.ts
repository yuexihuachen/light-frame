import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.use('*', serveStatic({ root: './' }));

app.get('/', async (c) => {
    const file = Bun.file(import.meta.env.PWD + '/dist/.vite/manifest.json');
    const manifest = await file.json();
    return c.html(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/client/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React + TS</title>
            <link rel="stylesheet" crossorigin href="/dist/${manifest["client/src/main.tsx"].css}">
          </head>
          <body>
            <div id="root"></div>
             <script type="module" crossorigin src="/dist/${manifest["client/src/main.tsx"].file}"></script>
          </body>
        </html>
            `)
})


export default app