import Vue from 'vue';

import { Page, Card } from 'view-design'; // 引入自己用到的组件

const components = {
  Page,
  Card,
};

function install(components: { [k: string]: any }) {
  for (const key in components) {
    if (components.hasOwnProperty(key)) {
      Vue.component(key, components[key]);
    }
  }
}

install(components);
