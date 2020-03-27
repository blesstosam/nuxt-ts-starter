// import {NuxtAppOptions} from '@nuxt/types'
/* eslint-disable */
export default function (
  // context
  // The context provides additional objects/params from Nuxt to Vue components
  // and is available in special nuxt lifecycle areas like
  // asyncData, fetch, plugins, middleware and nuxtServerInit.
  context
) {
  const {
    app, // The root Vue instance options that includes all your plugins
    store, // Vuex Store instance. Available only if the vuex store is set.
    route, // Vue Router route instance.
    params, // Alias of route.params.
    query, // Alias of route.query.
    env, // Environment variables set in nuxt.config.js
    isDev,
    isHMR,
    redirect, // Use this method to redirect the user to another route
    error, // Use this method to show the error page
  } = context;
  console.log('log from test.js..............');
  // Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context;
    // console.log(route)
    // redirect('/404')
  }
  // Client-side
  // 当客户端的路由跳转时触发
  if (process.client) {
    // nuxtState === window.__NUXT__
    const { from, nuxtState } = context;
    // console.log(nuxtState, 'nuxtstate')
  }
}
