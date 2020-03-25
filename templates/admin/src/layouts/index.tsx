import React, { useState } from 'react';
import { ConfigProvider, Layout, Drawer } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import { IconContext } from 'react-icons';
import { useMediaQuery } from 'react-responsive'
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
  const isSmall = useMediaQuery({
    query: '(max-width: 768px)'
  });

  return (
    <ErrorBoundary>
      <ConfigProvider
        locale={zh_CN}
      // getPopupContainer={triggerNode => triggerNode}
      >
        <IconContext.Provider value={{ className: styles.react_icons }}>
          <AppContext.Provider value={app}>
            {app.routes.filter(item => !item.menu && item.path)
              .map(item => item.path).includes(pathname) ? (
                props.children
              ) : (
                <Layout>
                  {isSmall ? (
                    <Drawer
                      placement="left"
                      closable={true}
                      onClose={() => setCollapsed(!collapsed)}
                      visible={!collapsed}
                      bodyStyle={{padding: 0}}
                    >
                      <Sider collapsed={false} onCollapse={() => {}} />
                    </Drawer>
                  ) : <Sider collapsed={collapsed} onCollapse={setCollapsed} />}

                  <Layout>
                    <Header collapsed={collapsed} onCollapse={setCollapsed} />
                    
                    <EnvAlert />

                    <Breadcrumbs />

                    <Content className={styles.content}>
                      {props.children}
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