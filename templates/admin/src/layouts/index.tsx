import React, { useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import { IconContext } from 'react-icons';
import { useApp, AppContext } from '@/hooks/global/app';
import { Header, Sider, Breadcrumbs, Footer, ErrorBoundary, EnvAlert } from '@/components/Layouts';
import styles from './index.scss';

const { Content } = Layout;

const BasicLayout: React.FC<{
  location: any;
  route: any;
}> = props => {
  const { location: { pathname }, route } = props;
  const [collapsed, setCollapsed] = useState(false);
  const app = useApp(route.routes, {
    pathname
  });

  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={zh_CN}
      // getPopupContainer={triggerNode => triggerNode}
      >
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <AppContext.Provider value={app}>
            {app.routes.filter(item => !item.menu && item.path)
              .map(item => item.path).includes(pathname) ? (
                props.children
              ) : (
                <Layout>
                  <Sider collapsed={collapsed} onCollapse={setCollapsed} />

                  <Layout>
                    <Header />
                    
                    <EnvAlert />

                    <Breadcrumbs className={styles.breadcrumbs} />

                    <Content className={styles.content}>

                      <div className={styles.maincontent}>
                        {props.children}
                      </div>
                    </Content>
                    
                    <Footer className={styles.footer} />
                  </Layout>
                </Layout>
              )
            }
          </AppContext.Provider>
        </IconContext.Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default BasicLayout;