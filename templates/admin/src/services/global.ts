import { get, post } from '@/utils/request';

/** 获取用户信息 */
export async function getUserInfo(params: any) {
  return get(`/getUserInfo`, params);
}