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
): Promise<AjaxResponse> {
  return httpInstance.get('/content/list', param);
}
export function contentDetail(param: { id: string }): Promise<AjaxResponse> {
  return httpInstance.get(`/content/${param.id}`, {});
}
export function createContent(param: {
  user: string;
  title: string;
  desc?: string;
  content: string;
  category: string;
}): Promise<AjaxResponse> {
  return httpInstance.post('/content/create', param);
}

// 内容分类
export function categoryList(
  param: { pageSize: number; pageNum: number } = { pageSize: 10, pageNum: 1 }
): Promise<AjaxResponse> {
  return httpInstance.get('/category/list', param);
}
export function createCategory(param: {
  categoryTitle: string;
  categoryDesc?: string;
}): Promise<AjaxResponse> {
  return httpInstance.post('/category/create', param);
}
