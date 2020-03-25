import { HttpService } from '../util';
import { baseUrl } from '../server';
import { AjaxResponse } from '@/types';

export const httpInstance = new HttpService(baseUrl);

// 登录/登出
export function login(param: { username: string; password: string }): Promise<AjaxResponse> {
  return httpInstance.post('/user/login', param);
}
export function logout(param: { username: string }): Promise<AjaxResponse> {
  return httpInstance.post('/user/logout', param);
}

// 内容
export function contentList(
  param: { pageSize: number; pageNum: number } = { pageSize: 10, pageNum: 1 }
): AjaxResponse {
  const { pageNum } = param;
  if (pageNum === 1) {
    return {
      code: 200,
      data: {
        list: [
          { _id: '1', title: '111', content: '111' },
          { _id: '2', title: '222', content: '222' }
        ]
      },
      msg: ''
    };
  } else if (pageNum === 2) {
    return { code: 200, data: { list: [{ _id: '3', title: '333', content: '333' }] }, msg: '' };
  }
}
