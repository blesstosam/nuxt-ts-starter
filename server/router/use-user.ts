import { Context } from 'koa';

export function useUser(router: any) {
  router.get('/api/user/:username', (ctx: Context) => {
    // 可以使用i18n对接口进行国际化
    ctx.state = { username: ctx.i18n.__('title'), age: 18, salary: 10000 };
  });

  router.post('/api/user/new', (ctx: Context) => {
    // @ts-ignore
    const { username } = ctx.request.body;
    ctx.state = { username };
  });
}
