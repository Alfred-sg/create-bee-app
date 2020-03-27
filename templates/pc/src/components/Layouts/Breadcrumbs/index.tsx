import React from 'react';
import { Breadcrumb } from 'antd';
import * as Icons from 'react-icons/ai';
import { withRouter, router } from 'umi';
import classnames from 'classnames';
import { useAppContext } from '@/hooks/global/app';
import { BREADCRUMBS_MODE } from '@/config';
import { Route } from '@/types/global';
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
  const { currentRoutes } = appContext;
  const breadcrumbRoutes: Route[] = [];
  const mode = BREADCRUMBS_MODE;

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
  });

  const breadcrumbs = (
    <Breadcrumb>
      <Breadcrumb.Item onClick={() => router.push('/')}>
        <Icons.AiFillHome />
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
  const breadcrumbsClassName = classnames({
    [styles.breadcrumbs]: true,
    [styles.breadcrumbs_simple]: mode === 'simple',
    [styles.breadcrumbs_complex]: mode === 'complex',
  });

  const lastBreadcrumbRoute = breadcrumbRoutes[breadcrumbRoutes.length - 1]
  return mode === 'simple' ? (
    <div className={breadcrumbsClassName}>
      {breadcrumbs}
    </div>
  ) : (
    <div className={breadcrumbsClassName}>
      {breadcrumbs}
      <div className={styles.title}>
        {lastBreadcrumbRoute && lastBreadcrumbRoute.title}
      </div>
    </div>
  );
});
