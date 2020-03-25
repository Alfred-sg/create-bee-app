import { get, post } from '@/utils/request';
import { Response } from '@/types/global';

/** 获取用户信息 */
export async function getUserInfo(params: any): Promise<Response> {
  return get(`/getUserInfo`, params);
}