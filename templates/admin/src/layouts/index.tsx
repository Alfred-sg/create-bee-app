import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import { useApp, Provider } from '@/hooks/global/app';
import { Header, Menu, Breadcrumbs, Footer, ErrorBoundary, EnvAlert } from '@/components/Layouts';
import { TITLE } from '@/config';
import styles from './index.scss';

const BasicLayout: React.FC<{
  location: any;
  route: any;
}> = props => {
  const { location: { pathname }, route } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const app = useApp(route.routes);

  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={zh_CN}
      // getPopupContainer={triggerNode => triggerNode}
      >
        <Provider value={app}>
          {app.routes.filter(item => !item.menu && item.path)
            .map(item => item.path).includes(pathname) ? (
              props.children
            ) : (
              <div className={styles.container}>
                {!menuCollapsed && (
                  <div className={styles.aside}>
                    <div className={styles.logo}>
                      {TITLE}
                    </div>

                    <div className={styles.menu}>
                      <Menu collapsed={menuCollapsed} {...props} />
                    </div>
                  </div>
                )}
                <div className={styles.main} style={{ left: menuCollapsed ? 0 : 256 }}>
                  <div className={styles.header}>
                    <Header onMenuCollapse={setMenuCollapsed} collapsed={menuCollapsed} />
                  </div>

                  <div className={styles.content}>
                    <EnvAlert />

                    <div className={styles.bread}>
                      <Breadcrumbs />
                    </div>

                    <div className={styles.maincontent}>
                      {props.children}
                    </div>

                    <Footer />
                  </div>
                </div>
              </div>
            )
          }
        </Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default BasicLayout;