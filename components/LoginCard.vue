<template>
  <v-row justify="center">
    <v-dialog v-model="isShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">登录</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="username" label="用户名*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="密码*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*表示必填</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isShow = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="doLogin">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { login } from '../api/user/index';

@Component
export default class LoginCard extends Vue {
  username: string = '';
  password: string = '';

  async doLogin() {
    const { username, password } = this;
    const res = await login({ username, password });
    if (res.code === 200) {
      localStorage.setItem('user_info', JSON.stringify(res.data));
      this.$store.commit('UPDATE_USER', res.data);
      this.isShow = false;
    } else {
      alert(res.msg);
    }
  }

  @Prop({ required: true, default: false }) readonly show!: boolean;

  get isShow() {
    return this.show;
  }

  set isShow(val) {
    this.handleEmit(val);
  }

  @Emit('update:show')
  handleEmit(val: boolean) {
    return val;
  }

  @Watch('isShow')
  handleShowModal(val: boolean) {
    /* eslint-disable-next-line */
    if (!val) return;
    // 当显示modal组件的时候 do something
  }
}
</script>

<style lang="stylus"></style>
