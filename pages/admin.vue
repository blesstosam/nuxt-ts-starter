<style lang="stylus"></style>
<template>
  <div>
    <h2>{{ msg }}</h2>
    <h3>{{ user }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NuxtAppOptions } from '@nuxt/types';
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
}
</script>
