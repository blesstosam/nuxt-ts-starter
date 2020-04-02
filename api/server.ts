/* eslint-disable-next-line */
let baseUrl = process.env.API_URL_DEV;

switch (process.env.NODE_ENV) {
  case 'production':
    // 预上线环境
    if (process.env.VUE_APP_CURRENTMODE === 'predeploy') {
    } else if (process.env.VUE_APP_CURRENTMODE === 'pretest') {
      // 测试环境
    } else {
    }
    break;
  case 'development':
    // baseUrl = 'http://localhost:3001';
    break;
}

export { baseUrl };
