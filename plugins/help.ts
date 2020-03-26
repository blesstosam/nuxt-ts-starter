import Vue from 'vue';

function install(Vue: any) {
  // console.log('help init');
  Vue.mixin({
    created() {
      // console.log('comes from help plugin...')
    },
  });
}

export default () => {
  Vue.use(install);
};
