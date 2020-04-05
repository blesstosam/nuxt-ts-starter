<style lang="stylus"></style>
<template>
  <div>
    <h2>{{ msg }}</h2>
    <h3>{{ user }}</h3>

    <Button @click="register">Register</Button><br />
    <nuxt-link to="/">Index</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NuxtAppOptions } from '@nuxt/types';
import axios from 'axios';
import { getUserinfo } from '../api/user';

@Component({
  /* eslint-disable-next-line */
  async asyncData(context: NuxtAppOptions) {
    const user = await getUserinfo({ username: 'sam' });
    return { user };
  },
  layout: 'new-layout',
  // middleware: 'logger'
})
export default class AdminPage extends Vue {
  msg = 'this is admin page!';
  user: { [k: string]: string | number };

  async register() {
    await axios.post('/api/user/new', {
      username: '123',
      // post/put/delete 请求需要发送_csrf 这些请求会经过csrf中间件验证
      _csrf: this.$store.state.csrfToken,
    });
  }
}
</script>
