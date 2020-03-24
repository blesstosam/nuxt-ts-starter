import { GetterTree, ActionTree } from 'vuex';
/* eslint-disable-next-line */
import { RootState } from './index';

export const state = () => ({
  more: 3
});

export type AppModuleState = ReturnType<typeof state>;

export const getters: GetterTree<AppModuleState, RootState> = {
  evenMore: (state) => state.more + 5,
  nameAndMore: (state, getters, rootState) => `${rootState.user.username}: ${state.more}`
};

export const actions: ActionTree<AppModuleState, RootState> = {
  printRootState() {
    // console.log('accessing rootState:', rootState.user.username);
  }
};
