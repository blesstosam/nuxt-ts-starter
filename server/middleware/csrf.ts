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

    await csrf(ctx, next);

    // 将 csrf 挂载到req对象上 nuxt才能访问
    // @ts-ignore
    ctx.req.csrf = ctx.csrf;
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
