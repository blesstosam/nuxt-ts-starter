# Nuxt-ts-starter

> Nuxtjs + Typescript + Koa Starter.
> No typescript/runtime


## Todo



## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## lint-staged v8.2.1 不要升级
会导致@babel/runtime 被删除导致报错

## tsconfig.json 里的 "module": "esnext" 要注释掉 否则无法识别 import 语法
