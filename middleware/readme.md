>In universal mode, middlewares will be called server-side once (on the first request to the Nuxt app or when page refreshes) and client-side when navigating to further routes. In SPA mode, middlewares will be called client-side on the first request and when navigating to further routes.

## 简单理解 middleware相当于路由钩子里执行的函数
1. 在pages里或者layout里单独写 middleware 相当于beforeRouteEnter钩子
```
export default {
  middleware: 'logger'
}
```
2. 在nuxt.config.js里写相当于 beforeEach 全局钩子
```
module.exports = {
  router: {
    middleware: 'logger'
  }
}
```