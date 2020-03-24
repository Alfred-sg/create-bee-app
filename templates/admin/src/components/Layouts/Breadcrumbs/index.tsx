import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { useAppContext } from '@/hooks/global/app';
import { withRouter, router } from 'umi';
import { Route } from '@/types/global';
import { getMatchedRoutes } from '../utils';
import styles from './index.scss';

/**
 * 面包屑
 */
export default withRouter((props: {
  location: {
    pathname: string;
  }
}) => {
  const { location: { pathname } } = props;
  const appContext = useAppContext();
  const currentRoutes = getMatchedRoutes(appContext.routes, pathname, []);
  const breadcrumbRoutes: Route[] = [];

  currentRoutes.forEach((route, index) => {
    const pathnames = pathname.split('/').filter(item => !!item);

    if (!route.component && !(route.routes && route.path == route.routes[0].path)) {
      route.pathname = undefined;
      breadcrumbRoutes.push(route);
      return;
    }

    // 滤除同名项
    if (index > 1 && currentRoutes[index - 1].path == route.path) {
      return;
    }

    route.pathname = '/' + route.path.split('/').filter(item => !!item)
      .map((item, index) => {
        if (item[0] == ':') return pathnames[index];
        return item;
      }).join('/');

    breadcrumbRoutes.push(route);
  })

  return (
    <Breadcrumb className={styles.breadcrumbs}>
      <Breadcrumb.Item onClick={() => router.push('/')}>
        <Icon type="home" />
      </Breadcrumb.Item>

      {(breadcrumbRoutes || []).map(route => (
        <Breadcrumb.Item 
          key={route.path} 
          onClick={() => route.pathname && router.push({ pathname: route.pathname })}
        >
          <span>{route.title}</span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
});
