// import dotty from 'dottie';
import CSRF from 'koa-csrf';
import Koa, { Middleware, Context, Next } from 'koa';

type Prefixes = { [prefix: string]: boolean };

/* eslint-disable-next-line */
export function csrfMiddleware(app: Koa): Middleware {
  const csrf = new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false,
  });

  // const noCsrfRoutes = dotty.get(server, "config.server.noCsrfRoutes") || {};

  return async (ctx: Context, next: Next) => {
    // @ts-ignore
    // if (isPrefixMatched(noCsrfRoutes, ctx.path)) {
    //   return next();
    // }

    // todo 增加一个配置开关 可以开启和关闭csrf

    await csrf(ctx, next);
  };
}

export function isPrefixMatched(prefixes: Prefixes, target: string): boolean {
  for (const prefix of Object.keys(prefixes)) {
    if (String(target).startsWith(prefix) && prefixes[prefix]) {
      return true;
    }
  }
  return false;
}
