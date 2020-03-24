<style lang="stylus">
.right-footer
  a
    margin-right 8px
</style>
<template>
  <div>
    <h1>i am from default.vue</h1>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { logout } from '../api/user/index';
import LoginCard from '@/components/LoginCard.vue';

const defaultRoutes = [
  {
    title: '首页',
    to: '/'
  }
];
const adminRoutes = [
  {
    title: 'Admin',
    to: '/admin'
  }
];

@Component({
  components: { LoginCard }
})
export default class Default extends Vue {
  mounted() {
    // if logined
    const { userInfo } = this;
    if (userInfo.username && userInfo.isAdmin) {
      this.items = [...this.items, ...adminRoutes];
    }
  }

  get userInfo() {
    return this.$store.state.user || {};
  }

  @Watch('userInfo')
  handleLogin(val) {
    if (val.username && val.isAdmin) {
      this.items = [...this.items, ...adminRoutes];
    }
  }

  loginDialogShow: boolean = false;

  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  miniVariant: boolean = false;

  confirm = false;
  items = defaultRoutes;

  async doLogout() {
    await logout({ username: this.userInfo.username });
    this.confirm = false;
    localStorage.setItem('user_info', JSON.stringify({}));
    this.$store.commit('UPDATE_USER', {});
    this.items = defaultRoutes;
  }
}
</script>
