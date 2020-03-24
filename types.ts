// 后台接口返回数据类型
export interface AjaxResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

export interface Pager {
  current: number;
  pageSize: number;
  total: number;
}
