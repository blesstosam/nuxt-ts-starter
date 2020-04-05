import path from 'path';
// @ts-ignore
import i18n from 'koa-i18n';
// @ts-ignore
import koaLocale from 'koa-locale';
import Koa from 'koa';

// todo need to fix
export function initI18n(app: Koa) {
  koaLocale(app);
  app.use(
    i18n(app, {
      directory: path.join(__dirname, '../../locale'),
      // extension: '.js',
      locales: ['zh-CN', 'en'], //  `zh-CN` defualtLocale, must match the locales to the filenames
      modes: [
        'query', //  optional detect querystring - `/?locale=en-US`
        // 'subdomain',            //  optional detect subdomain   - `zh-CN.koajs.com`
        'cookie', //  optional detect cookie      - `Cookie: locale=zh-TW`
        'header', //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
        // 'url',                  //  optional detect url         - `/en`
        // 'tld',                  //  optional detect tld(the last domain) - `koajs.cn`
        // function() {}           //  optional custom function (will be bound to the koa context)
      ],
    })
  );

  // app.use(function (ctx) {
  //   ctx.body = ctx.i18n.__('title');
  // })
}
