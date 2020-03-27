import React, { useEffect } from 'react';
import { router } from 'umi';
import { useAppContext } from '@/hooks/global/app';
import showMessage from '@/utils/showMessage';
import { Response } from '@/types/global';

/**
 * 登录
 */
export default ({
  children
}: {
  children: React.ReactElement;
}) => {
  const appContext = useAppContext();
  const { userInfo, fetchUserInfo } = appContext;

  useEffect(() => {
    fetchUserInfo({}).then((res: Response) => {
      if (!res || !res.success){
        showMessage('获取用户信息失败', res);
        router.push('/login')
      };

      return res;
    }).catch((err: any) => {
      showMessage('获取用户信息失败', err);
    });
  });

  return userInfo && Object.keys(userInfo).length ? children : null;
};
