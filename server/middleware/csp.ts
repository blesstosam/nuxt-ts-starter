import { Context, Next } from 'koa';
import uuid from 'uuid/v4'

// 默认配置-只允许该域名下内容
type ReturnStrFun = (ctx: Context) => string;
type DefaultCspParam = {
  enableWarn: boolean;
  enableNonce: boolean;
  policy: { [k: string]: Array<ReturnStrFun | string> };
};
export const defaultParams: DefaultCspParam = {
  // 是否显示警告信息
  enableWarn: true,
  enableNonce: false,   // todo 怎么在script标签上加上nonce='xxx'
  policy: {
    'default-src': ['self', 'unsafe-eval', 'unsafe-inline'], // 用来设置下面各个选项的默认值
    'style-src': ['self', 'unsafe-eval', 'unsafe-inline'],
    'img-src': ['https:']
  },
  // 如果不设置某个限制选项，就会使用 default-src 设置的值，再就是默认允许任何值

  // 选项可选值
  // 主机名: example.org，https://example.com:443
  // 路径名: example.org/resources/js/
  // 通配符: *.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）
  // 协议名: https:、data:
  // 关键字: 'self'：当前域名，需要加引号
  // 关键字: 'none'：禁止加载任何外部资源，需要加引号
};

/* eslint-disable-next-line */
export function csp({ enableWarn, enableNonce, policy } = defaultParams) {
  return async (ctx: Context, next: Next) => {
    await next();

    if (enableNonce) {
      policy['script-src'] = [() => `nonce-${uuid()}`]
    }

    let policyStr = filterLegalPolicy(policy, ctx)
      .map((item) => {
        return item.map(addQuotes).join(' ');
      })
      .join(';');
    
    // todo 怎么获取Content-Type 由于nuxt接管了渲染 这里拿不到 为什么？？？
    // console.log(ctx.response, ctx.res.getHeader('Content-Type'), 222)
    if (ctx.response.type === 'text/html') {
      ctx.set('Content-Security-Policy', policyStr);
    }
  };
}

// 过滤掉非合法的policy
function filterLegalPolicy(policy: typeof defaultParams.policy, ctx: Context) {
  const effectiveAttr = [
    'default-src', // 用来设置下面各个选项的默认值
    'script-src', // 外部脚本
    'style-src', // 样式表
    'img-src', // 图像
    'media-src', // 媒体文件（音频和视频）
    'font-src', // 字体文件
    'object-src', // 插件（比如 Flash）
    'child-src', // 框架
    'frame-ancestors', // 嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
    'frame-src',
    'connect-src', //HTTP 连接（通过 XHR、WebSockets、EventSource等）
    'worker-src', //worker脚本
    'manifest-src', //manifest 文件
    'block-all-mixed-content',
  ];
  return effectiveAttr
    .filter((attr) => Boolean(policy[attr]))
    .map((attr) => [
      attr,
      ...policy[attr].map((item) => {
        if (typeof item === 'function') {
          return item(ctx);
        }
        return item;
      }),
    ]);
}

// 一些可选值需要加引号
function addQuotes(str: string) {
  const keyWords = ['none', 'self', 'unsafe-inline', 'unsafe-eval'];

  // 以上关键字需要加引号 "self" => "'self'"
  return keyWords.includes(str) ? `'${str}'` : str;
}
