import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import { useApp, AppContext } from '@/hooks/global/app';
import { ErrorBoundary } from '@/components/Layouts';
import styles from './index.scss';

/**
 * 普通桌面应用 layout
 */
const BasicLayout: React.FC<{
  location: any;
  route: any;
}> = props => {
  const { location: { pathname }, route } = props;
  const app = useApp(route.routes, {
    pathname
  });

  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={zh_CN}
      // getPopupContainer={triggerNode => triggerNode}
      >
        <AppContext.Provider value={app}>
          <div className={styles.content}>
            {props.children}
          </div>
        </AppContext.Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default BasicLayout;