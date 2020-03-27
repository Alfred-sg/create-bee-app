/**
 * 是否 pc 环境
 */
export const IsPC = () => {
  const { userAgent } = navigator;
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  return !agents.some(agent => userAgent.indexOf(agent) > 0);
}


/**
 *  获取 UUID
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */
export function generateUUID(len: number, radix: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

export const dateFormat = (date: Date | string, format = 'yyyy-MM-dd HH:mm') => {
  if (typeof date === 'string') date = new Date(date);

  const map: {
    [key: string]: any
  } = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "H+": date.getHours(),                   //小时   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };

  if (/(y+)/.test(format)){
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  };

  Object.keys(map).map(key => {
    if (new RegExp("(" + key + ")").test(format)) {
      format = format.replace(RegExp.$1,
        (RegExp.$1.length == 1) ? 
          (map[key]) : 
          (("00" + map[key]).substr(("" + map[key]).length))
      );
    }
  })

  return format;
};