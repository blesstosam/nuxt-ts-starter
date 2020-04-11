import Koa from 'koa';
import Router from 'koa-router';
import { useUser } from './router/use-user';
import { initMiddlewre } from './middleware/index';
import { initDb } from './db/index';
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');

// load env from .env file
const dotenv = require('dotenv');
dotenv.config();

const app = new Koa();
const router = new Router();

initMiddlewre(app);

useUser(router);
app.use(router.routes()).use(router.allowedMethods());

// init db
initDb();

const config = require('../nuxt.config.js');
config.dev = app.env !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT } = nuxt.options.server;

  // nuxt.ready() 方法一定要放在前面先执行
  // 否则 middleware和store的ts文件无效
  await nuxt.ready();

  // Build in development
  // dev 模式下不需要先npm run build 是因为这里的代码写了
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // nuxt处理请求渲染成字符串的中间件
  app.use((ctx: any) => {
    ctx.status = 200;

    // 该设置会绕过koa的response对象 所以在该中间件后面的中间件都无效
    // 所以其他中间件都需要放到前面
    ctx.respond = false; // Bypass Koa's built-in response handling

    // 将原生ctx对象挂载到req上 可以在nuxt的ctx上访问koa原生上下文 => context(Nuxt).req.ctx
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);

    // 在给csp的header赋值的时候 需要判断响应类型为text/html才设置
    // 默认的是没有设置的
    // 经过nuxt.render 渲染的都是html
    // ctx.type = 'text/html';
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
