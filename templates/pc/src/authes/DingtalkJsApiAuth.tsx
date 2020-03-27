import React, { useRef, useEffect } from 'react';
import router from 'umi/router';
import * as dd from 'dingtalk-jsapi';
import { getDingtalkTicket } from '@/services/global';
import showMessage from '@/utils/showMessage';

let dingtalkConfig = {
  agentId: undefined,// 必填，微应用ID
  corpId: undefined,// 必填，企业ID
  timeStamp: undefined,// 必填，生成签名的时间戳
  nonceStr: undefined,// 必填，生成签名的随机串
  signature: undefined,// 必填，签名
  jsApiList: [// 必填，需要使用的jsapi列表，注意：不要带dd
    'biz.contact.complexPicker',
    'biz.contact.choose',
    'biz.contact.chooseMobileContacts',
  ],
};

/**
 * 钉钉 jsapi 鉴权
 */
export default (props: any) => {
  const cntRef = useRef<number>(5);// 重试

  useEffect(() => {
    if ( process.env.NODE_ENV !== 'production' ) return;

    if (dd.env.platform === 'notInDingTalk') {
      router.push('/404');
    } else {
      if (!dingtalkConfig.timeStamp){
        const activeDingtalkJsApi = () => {
          const handleGetTicketError = (err: any) => {
            if (!cntRef.current) showMessage('获取签名失败，部分功能将不可用。如需使用，请刷新重试', err);
            else activeDingtalkJsApi();
          };
        
          // 获取钉钉签名
          getDingtalkTicket({
            url: location.href,
          }).then(res => {
            if (res && res.success){
              dingtalkConfig = {
                ...dingtalkConfig,
                timeStamp: res.data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
              };
        
              dd.config(dingtalkConfig);
              dd.error((err: any) => {
                showMessage('钉钉鉴权失败，部分功能将不可用。如需使用，请刷新重试', err);
              });
            } else {
              handleGetTicketError(res);
            };
          }).catch((err: any) => {
            handleGetTicketError(err);
          });
        }

        activeDingtalkJsApi();
      };

      return () => {
        cntRef.current = 0;
      };
    }
  }, []);

  return props.children;
}
