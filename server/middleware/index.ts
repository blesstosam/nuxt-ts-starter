import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { koaRes } from './api-res';
import { sessionMiddleware } from './session';
import { initI18n } from './i18n';
import { csrfMiddleware } from './csrf';
import { createRateLimiter } from './rate-limit';

export function initMiddlewre(app: Koa) {
  app.use(bodyParser());

  /**
   * api 接口请求经过的一层封装
   * 只需要 ctx.state = {name: 'sam'} => ctx.body = {code: 200, msg: 'success', data: {name: 'sam'}}
   */
  app.use(koaRes);

  /**
   * session
   * 可以传递cfg配置session
   */
  app.use(sessionMiddleware(app));

  /**
   * csrf 拦截
   * 需要和koa-session一起使用
   * 每次请求都将生成好的csrfToken通过vuex的state下发到客户端
   * 客户端存储在vuex里 每次发送请求都从state里获取csrfToken 发送到服务端验证
   */
  app.use(csrfMiddleware(app));

  /**
   * 限制接口调用次数
   */
  app.use(createRateLimiter({}));

  initI18n(app);
}
