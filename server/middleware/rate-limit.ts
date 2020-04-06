import crypto from 'crypto';
// @ts-ignore
import { RateLimit } from 'koa2-ratelimit';
import { Context, Middleware } from 'koa';
import { loggerInstance } from '../logger/index';

export type RateLimiterOpts = {
  name?: string;
  generateKey?(ctx: Context): string;
  interval?: number; // ms
  max?: number;
};

export function createRateLimiter(opts: RateLimiterOpts): Middleware {
  return RateLimit.middleware({
    interval: opts.interval || 60 * 1000,
    max: opts.max || 30,
    // 只有restful接口才限制次数
    // 这个条件后面应该可以配置 现在是写死的 不灵活
    skip(ctx: Context) {
      if (!ctx.req.url.includes('/api')) {
        return true;
      }
    },
    keyGenerator(ctx: Context): string {
      const sha1 = crypto.createHash('sha1');
      if (opts.generateKey) {
        sha1.update(opts.generateKey(ctx));
      }
      const shorten = sha1.digest().toString('base64');
      const key = `${opts.name || 'unnamed'}|${shorten}`;
      loggerInstance.debug(`ratelimit key ${key}`);
      return key;
    },
    handler(ctx: Context): void {
      ctx.status = 429;
      ctx.body = {
        ok: false,
        error: { code: 'RATE_LIMIT', message: ctx.i18n.__('rate_limit') },
      };
    },
  });
}
