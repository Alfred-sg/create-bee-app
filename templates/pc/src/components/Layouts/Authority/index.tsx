import React, { useEffect } from 'react';
import { router } from 'umi';
import { useAppContext } from '@/hooks/global/app';

/**
 * 判断权限
 */
export default ({
  authes,
  goto403,
  children
}: {
  authes?: string[];
  goto403?: boolean;
  children: React.ReactElement;
}) => {
  const appContext = useAppContext();
  
  useEffect(() => {
    if ( goto403 && authes && authes.length && appContext.canAccess(authes) ){
      router.push('403');
    };
  }, [authes]);

  return !authes || !authes.length || appContext.canAccess(authes) ? children : null;
};