<style lang="stylus">
.page-index
  .pager
    position fixed
    bottom 85px
    left 0
    right 0
</style>
<template>
  <div class="container page-index">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  async asyncData() {}

  // middleware: 'logger'
})
export default class AdminPage extends Vue {
  msg = 'this is admin page!';
}
</script>
