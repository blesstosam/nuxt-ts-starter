<style lang="stylus">
.page-index
  padding: 24px
</style>
<template>
  <div class="page-index">
    <h2>分页请求数据的demo</h2>
    <Card class="mx-auto" tile>
      <li v-for="item in list" :key="item._id">
        {{ item.title }}
      </li>
    </Card>
    <Page :total="100" @on-change="handlePageChange" />
    <h2><nuxt-link to="/admin">Admin</nuxt-link></h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NuxtAppOptions } from '@nuxt/types';
import axios from 'axios';
import { Pager } from '@/types';
import { contentList } from '@/api/user';

@Component({
  async asyncData(context: NuxtAppOptions) {
    const { pageNum } = context.query;
    const pager: Pager = {
      current: pageNum ? Number(pageNum) : 1,
      pageSize: 10,
      total: 0,
    };
    const res = await contentList({ pageSize: pager.pageSize, pageNum: pager.current });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      pager.total = total;
      return {
        list,
        pager,
      };
    }
    return { list: [], pager, categoryList: [] };
  },

  // middleware: 'logger'
})
export default class PagesIndex extends Vue {
  // 定义数据的类型 这些数据都是通过 asyncData 从服务器传递过来的
  // asyncData 可以理解为 data 函数， 只不过数据是在服务器定义获取的 然后混合到客户端的data函数里
  list: any[];
  total: number;
  pager: Pager;
  categoryList: any[];
  activeCategoryIndex = 0;

  async mounted() {
    await axios.post('/api/user/new', { username: 'sam' });
  }

  get totalPages(): number {
    return Math.ceil(this.pager.total / this.pager.pageSize);
  }

  async handlePageChange(page: number) {
    this.pager.current = page;
    const { current, pageSize } = this.pager;
    const res = await contentList({ pageSize, pageNum: current });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      this.list = [...list];
      this.pager.total = total;
    } else {
      this.list = [];
      this.pager.total = 0;
    }
  }
}
</script>
