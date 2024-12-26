
import express, {Express} from "express";
import dotenv from "dotenv";
import { Category } from "./schemas/category.schema";
import nunjucks from "nunjucks";
import categoryRouter from "./routes/categories";
import {router as postRouter} from "./routes/posts";
import {router as userRouter} from "./routes/users";
import connectDB from "./db/db";
import { authGuard } from "./middlewares/auth";
import path from "path";

dotenv.config({ path: [`.env.${process.env.NODE_ENV}`] });

const app: Express = express();
const port = process.env.PORT || 3000;
const nunjuckEnv = nunjucks.configure("views");

nunjuckEnv.express(app);
connectDB();

// 解析请求体数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态资源
app.use(express.static('.'));
app.use(express.static('static'));

app.set('views', '/views');
app.set("view engine", "html");

app.use('/auth', authGuard);

app.use(categoryRouter);
app.use(postRouter);
app.use(userRouter);

app.get(['/*'], async (req, res) => {
  const { default: manifest } = await import(path.resolve('./static/.vite/manifest.json'), {
    assert: {
      type: "json",
    },
  });
  const category = await Category.find({},{})
  res.render('index.html', {
    js: `${manifest['src/index.tsx'].file}`,
    css: `${manifest['src/index.tsx'].css}`,
    category: JSON.stringify(category)
  });
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});