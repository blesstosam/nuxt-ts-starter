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
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  username: (state) => state.user.username,
};

export const mutations: MutationTree<RootState> = {
  UPDATE_USER(state, user: User) {
    state.user.username = user.username;
  },
};

// 将服务器的数据传递给客户端
// 如果想把客户端的状态通过服务器还原到客户端（刷新时有这种场景）=>
// 只能客户端通过cookie把信息传到服务器，然后服务器再原样返回 =>
// 但是服务器使用session会有额外的开销
export const actions: ActionTree<RootState, RootState> = {
  /* eslint-disable-next-line */
  nuxtServerInit({ commit }, { req }) {
    // if (req.session.user) {
    commit('UPDATE_USER', { username: '999', isAdmin: true });
    // }
  },
};
