import session from 'koa-session';
import Koa, { Middleware } from 'koa';

export interface SessionCfg {
  key?: string;
  maxAge?: number;
  autoCommit?: boolean;
  overwrite?: boolean;
  httpOnly?: boolean;
  signed?: boolean;
  rolling?: boolean;
  renew?: boolean;
  sameSite?: any;
}

export function sessionMiddleware(app: Koa, cfg: SessionCfg = {}): Middleware {
  app.keys = ['some secret hurr'];

  const CONFIG: SessionCfg = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */,
    // sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,

    // merge other options
    ...cfg,
  };

  // app.use(async (ctx, next) => {
  //   let n = ctx.session.views || 0;
  //   ctx.session.views = ++n;
  //   await next();
  // });

  // or if you prefer all default config, just use => app.use(session(app));
  return session(CONFIG, app);
}
