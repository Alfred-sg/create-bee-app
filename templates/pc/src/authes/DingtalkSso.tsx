import { useEffect } from 'react';
import router from 'umi/router';
import * as dd from 'dingtalk-jsapi';
import { useAppContext } from '@/hooks/global/app';
import showMessage from '@/utils/showMessage';
import { Response } from '@/types/global';

/**
 * 钉钉免登
 */
export default (props: any) => {
  const appContext = useAppContext();
  const { userInfo, fetchUserInfo } = appContext;

  useEffect(() => {
    if ( process.env.NODE_ENV !== 'production' ) return;

    if (dd.env.platform === 'notInDingTalk') {
      router.push('/404');
    } else {
      dd.ready(async () => {
        if (!Object.keys(userInfo)){
          dd.runtime.permission.requestAuthCode({
            corpId: undefined,
            // @ts-ignore
            onSuccess(res) {
              fetchUserInfo({
                authCode: res.code,
              }).then((res: Response) => {
                if (!res || !res.success){
                  showMessage('获取用户信息失败', res);
                  router.push('/404')
                };
              }).catch((err: any) => {
                showMessage('获取用户信息失败', err);
              });
            },
            onFail(err: any) {
              showMessage('获取 auth_code 失败', err);
            },
          });
        }
      });
    }
  }, []);

  return props.children;
};