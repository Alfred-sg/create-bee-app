import React, { useEffect } from 'react';
import { router } from 'umi';
import { useAppContext } from '@/hooks/global/app';
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
        router.push('/login')
      };

      return res;
    });
  });

  return userInfo && Object.keys(userInfo).length ? children : null;
};