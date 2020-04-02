import { Context } from 'koa';

export function useUser(router: any) {
  router.get('/api/user/:username', (ctx: Context) => {
    ctx.state = { username: ctx.params.username, age: 18, salary: 10000 };
  });

  router.post('/api/user/new', (ctx: Context) => {
    // @ts-ignore
    const { username } = ctx.request.body;
    ctx.state = { username };
  });
}
