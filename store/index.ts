import { GetterTree, MutationTree } from 'vuex';

export interface User {
  username: string;
  isAdmin: boolean;
}
let user: User | undefined;

try {
  // in client side
  if (window) {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
  } else {
    user = { username: '', isAdmin: false };
  }
} catch (e) {
  user = { username: '', isAdmin: false };
  throw new Error(`parse user_info error in store: ${e}`);
}

export const state = () => ({
  user
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  username: (state) => state.user.username
};

export const mutations: MutationTree<RootState> = {
  UPDATE_USER(state, user: User) {
    state.user.username = user.username;
  }
};

// export const actions: ActionTree<RootState, RootState> = {
//   fetchThings({ commit }) {
//     const things = this.$axios.$get('/things')
//     console.log(things)
//     commit('CHANGE_NAME', 'New name')
//   },
// }
