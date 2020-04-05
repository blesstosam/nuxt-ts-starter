import { GetterTree, MutationTree, ActionTree } from 'vuex';

export interface User {
  username: string;
  isAdmin: boolean;
}
let user: User | undefined;

try {
  // in client side
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      user = JSON.parse(userInfo);
      // 改写__NUXT__.state
      // @ts-ignore
      window.__NUXT__.state.user = {
        username: user.username,
        isAdmin: user.isAdmin,
      };
    }
  } else {
    user = { username: '', isAdmin: false };
  }
} catch (e) {
  user = { username: '', isAdmin: false };
  /* eslint-disable-next-line */
  console.error(`parse user_info error in store: ${e}`);
}

export const state = () => ({
  user,
  csrfToken: '',
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  username: (state) => state.user.username,
};

export const mutations: MutationTree<RootState> = {
  UPDATE_USER(state, user: User) {
    state.user.username = user.username;
  },
  UPDATE_CSRF_TOKEN(state, token: string) {
    state.csrfToken = token;
  },
};

// 将服务器的数据传递给客户端
// 如果想把客户端的状态通过服务器还原到客户端（刷新时有这种场景）=>
// 只能客户端通过cookie把信息传到服务器，然后服务器再原样返回
export const actions: ActionTree<RootState, RootState> = {
  // 该方法只能在store/index文件里执行 其他模块不会执行

  // https://www.jianshu.com/p/1f8137a8e7b1
  // 官网例子是基于express的，里面的req是原生的，可以通过req.session 访问session
  // 但是koa里使用koa-session，session在ctx.session上。在nuxtServerInit里获取不到ctx,
  // 那么解决方案就是在render的前面把ctx.session给req.session就好了。

  // 同样 在 csrf中间件里将csrf挂载到req上 才能访问得到
  nuxtServerInit({ commit }, { req }) {
    // console.log('.. nuxtServerInit', '++++++++', req.csrf);
    // 将 csrf 传递给客户端
    commit('UPDATE_CSRF_TOKEN', req.csrf || '');
    // commit('UPDATE_USER', { username: '999', isAdmin: true });
  },
};
