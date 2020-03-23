import axios from 'axios';
import { message as antdMessage } from 'antd';
import { getCache, setCache } from './cache';
import { URL_PREFIX } from '../config';

type Method = 'get' | 'post' | 'put' | 'delete';

interface Response {
  code: number,
  data: any,
  success: boolean,
  msg?: string,
  message?: string,
}

// 获取响应，通过 catch 语句显示错误内容
export function request(
  method: Method,
  url: string,
  params?: {[key: string]: any},
  opts?: {[key: string]: any},
){
  return new Promise(async (resolve) => {
    const res = await axios.request({
      method,
      url: URL_PREFIX + url,
      params: ['get', 'delete'].indexOf(method) !== -1 ? params || {} : {  },
      data: ['post', 'put'].indexOf(method) !== -1 ? params : undefined,
      timeout: 10000,
      ...(opts || {}),
    }).catch((err) => {
      resolve();
    });

    if ( !res ) return resolve();

    resolve(res ? {
      ...res,
      origin: {
        method,
        url,
        params,
      }
    } : res);
  });
}

// get 请求，通过 axios.request 发送实际请求
export async function get(
  url: string,
  params?: {[key: string]: any},
  opts?: {[key: string]: any},
){
  if (opts && opts.enableCache){
    const cache = getCache(url + JSON.stringify(params) + JSON.stringify(opts));
    if (cache) return cache;
  }

  const res = await request('get', url, params, opts);

  if (opts && opts.enableCache){
    setCache(url + JSON.stringify(params) + JSON.stringify(opts), res);
  };

  return res;
}

// post 请求
export async function post(
  url: string,
  params?: {[key: string]: any},
  opts?: {[key: string]: any},
){
  const res = await request('post', url, params, opts);
  return res;
}

// delete 请求
export async function del(
  url: string,
  params?: {[key: string]: any},
  opts?: {[key: string]: any},
){
  const res = await request('delete', url, params, opts);
  return res;
}

// 使用拦截器处理状态码及 code 值，在 axios - then/catch 回调前执行
axios.interceptors.response.use((res) => {
  // const data: Response = res.data;
  const { data, status, statusText, request: req, config } = res;
  const disableErrorMessage = config && 'disableErrorMessage' in config ? config.disableErrorMessage : false;
  const { responseURL: url } = req;

  // http 状态码
  if ( status !== 200 ) {
    return Promise.reject({
      code: status,
      messsage: statusText,
      url,
    });
  }

  const { code, success, msg } = data;

  // eslint-disable-next-line
  if ( code == 402 ){
    const { location } = window;
    if ( !location.hash.match(/^#\/login/) ) location.hash = '/login';
    return;
  }

  // 响应 code 值
  // if ( !success && !disableErrorMessage ) {
  //   return Promise.reject({
  //     code,
  //     message: msg || data.message || data.errorMessage || '出错',
  //     errorMessage: data.errorMessage,
  //     url,
  //   });
  // }

  return data;
}, err => Promise.reject(err));
