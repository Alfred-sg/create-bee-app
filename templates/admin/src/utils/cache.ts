const cache: { [key: string]: any } = {};

/**
 * 设置缓存
 * @param name 
 * @param value 
 */
export const setCache = (name: string, value: any) => {
  cache[name] = value;
}

/**
 * 获取缓存
 * @param name 
 */
export const getCache = (name: string) => {
  return name ? cache[name] : cache;
}