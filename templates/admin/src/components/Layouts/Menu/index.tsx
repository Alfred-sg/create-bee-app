import React, { useEffect, useState, Fragment } from 'react';
import router from 'umi/router';
import { Menu, Icon } from 'antd';
import { useAppContext } from '@/hooks/global/app';
import { Menu as MenuType, Route } from '@/types/global';
import { matchLength, getMatchedRoutes } from '../utils';
import styles from './index.scss';

const { SubMenu } = Menu;

export default (props: {
  collapsed: boolean,
  location: {
    pathname: string,
  }
}) => {
  const { collapsed, location: { pathname } } = props;
  const appContext = useAppContext();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);//设置选中子菜单的key

  useEffect(() => {
    if (pathname === '/') return;
    const currentRoutes = getMatchedRoutes(appContext.menus as Route[], pathname, []);
    currentRoutes.forEach((menu, index) => {
      if (matchLength(menu.path, pathname)) {
        setSelectedKeys([`sub${index}_menuitem`]);
      };
    });
  }, [pathname])

  const handleMenuItemClick = (url: string) => {
    router.push(url);
  }

  //选中当前菜单，关闭其他菜单
  const hanldeOpenChange = (openKeys: string[]) => {
    setOpenKeys([openKeys[openKeys.length - 1]])
  };

  const renderMenu = (menu: MenuType, key: string) => {
    return menu.routes ? (
      <SubMenu
        key={key}
        title={menu.icon ? (
          <Fragment>
            <Icon type={menu.icon} />
            {menu.title}
          </Fragment>
        ) : menu.title}
      >
        {menu.routes.map((childMenu, childIndex) => {
          return renderMenu(childMenu, `${key}-${childIndex}`);
        })}
      </SubMenu>
    ) : (
        <Menu.Item key={key} onClick={() => handleMenuItemClick(menu.path)}>
          {menu.icon && <Icon type={menu.icon} />}
          {menu.title}
        </Menu.Item>
      );
  }

  return (
    <Menu
      style={{ width: 256 }}
      className={styles.menu}
      defaultOpenKeys={openKeys}
      mode="inline"
      theme="light"
      inlineCollapsed={collapsed}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={hanldeOpenChange}
    >
      {appContext.menus.map((menu, index) => {
        return renderMenu(menu, index + '');
      })}
    </Menu>
  );
};
