import Koa, { Context } from 'koa';
import { koaRes } from './middleware/res';
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// load env from .env file
const dotenv = require('dotenv');
dotenv.config();

const app = new Koa();

app.use(bodyParser());

app.use(koaRes);

const router = new Router();

/* eslint-disable-next-line */
router.get('/api/user/:username', async (ctx: Context, next: Function) => {
  ctx.state = { username: ctx.params.username, age: 18, salary: 10000 };
});

router.post('/api/user/new', (ctx: Context) => {
  // @ts-ignore
  const { username } = ctx.request.body;
  ctx.state = { username };
});

app.use(router.routes()).use(router.allowedMethods());

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
