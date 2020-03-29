/* eslint-disable-next-line */
let baseUrl = '';

switch (process.env.NODE_ENV) {
  case 'production':
    // 预上线环境
    if (process.env.VUE_APP_CURRENTMODE === 'predeploy') {
      baseUrl = 'http://localhost:3001';
    } else if (process.env.VUE_APP_CURRENTMODE === 'pretest') {
      // 测试环境
      baseUrl = 'http://localhost:3001';
    } else {
      baseUrl = 'http://localhost:3001';
    }
    break;
  case 'development':
    baseUrl = 'http://localhost:3001';
    break;
}

export { baseUrl };
