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

  app.use((ctx: any) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
