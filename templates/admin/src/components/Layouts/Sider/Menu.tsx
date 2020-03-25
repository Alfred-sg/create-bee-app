import React, { useEffect, useState, Fragment } from 'react';
import { router, withRouter } from 'umi';
import { Menu } from 'antd';
import * as Icons from 'react-icons/ai';
import { useAppContext } from '@/hooks/global/app';
import { Menu as MenuType } from '@/types/global';
import styles from './index.scss';

const { SubMenu } = Menu;

export default withRouter((props: any) => {
  const { collapsed, theme, location: { pathname } } = props;
  const appContext = useAppContext();
  const { currentRoutes } = appContext;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);//设置选中子菜单的key

  useEffect(() => {
    currentRoutes.forEach((menu, level) => {
      if (menu.path.split('/').length === pathname.split('/').length) {
        const key = `${level}-${menu.path}`;
        setSelectedKeys([key]);
        if (menu.routes && !openKeys.includes(key)){
          setOpenKeys([key]);
        }
      };
    });
  }, [pathname, currentRoutes])

  const handleMenuItemClick = (url: string) => {
    router.push(url);
  }

  //选中当前菜单，关闭其他菜单
  const hanldeOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const rendetIcon = (menu: MenuType, level: number) => {
    // @ts-ignore
    const Icon = menu.icon ? Icons[menu.icon] : 
      !level ? Icons.AiOutlineAppstore : undefined;
    
    // antd 机制，sider 折叠时，anticon 后的 span 宽度会被置为 0
    return Icon ? <span className={'anticon ' + styles.icon}><Icon /></span> : null;
  }

  const renderMenu = (menu: MenuType, level: number) => {
    const key = `${level}-${menu.path}`;
    return menu.routes ? (
      <SubMenu
        key={key}
        title={menu.icon ? (
          <Fragment>
            {rendetIcon(menu, level)}
            {menu.title}
          </Fragment>
        ) : menu.title}
      >
        {menu.routes.map((childMenu) => {
          return renderMenu(childMenu, level + 1);
        })}
      </SubMenu>
    ) : (
        <Menu.Item key={key} onClick={() => handleMenuItemClick(menu.path)}>
          {rendetIcon(menu, level)}
          <span>{menu.title}</span>
        </Menu.Item>
      );
  }

  return (
    <Menu
      defaultOpenKeys={openKeys}
      mode="inline"
      theme={theme}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={hanldeOpenChange}
    >
      {appContext.menus.map((menu) => {
        return renderMenu(menu, 0);
      })}
    </Menu>
  );
});
