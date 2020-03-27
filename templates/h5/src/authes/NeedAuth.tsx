import React from 'react';
import { Authority } from '@/components/Layouts';
import { Route } from '@/types/global';

/**
 * 页面权限
 */
export default ({
  route,
  children
}: {
  route: Route,
  children: React.ReactElement;
}) => {
  return (
    <Authority authes={route.authes} goto403={true}>
      {children}
    </Authority>
  );
};
