import { Context, Next } from 'koa';

export async function koaRes(ctx: Context, next: Next) {
  await next();

  if (ctx.request.url.includes('/api')) {
    ctx.body = { code: 200, msg: 'success', data: ctx.state };
  }
}
