import { Context, Next } from 'koa';
// import {loggerInstance} from '../logger/index'

export async function koaRes(ctx: Context, next: Next) {
  await next();

  // loggerInstance.warn(1, {meta: {test: 'test log meta'}})

  if (ctx.request.url.includes('/api')) {
    ctx.body = { code: 200, msg: 'success', data: ctx.state };
  }
}
