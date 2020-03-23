import React, { useEffect, useState, useRef } from 'react';
import { Icon, Avatar, Badge } from 'antd';
import router from 'umi/router';
import { useAppContext } from '@/hooks/global/app';

import styles from './index.scss';

export default (props: {
  onMenuCollapse: (collapsed: boolean) => void;
  collapsed: boolean
}) => {
  const { onMenuCollapse, collapsed } = props;
  const [visible, setVisible] = useState(false);
  const userPanelRef = useRef(null);
  const appContext = useAppContext();

  const handleCollapse = () => {
    onMenuCollapse && onMenuCollapse(!collapsed);
  };

  const showUserPanel = () => {
    setVisible(true);
  };

  const hideUserPanel = () => {
    setVisible(false);
  };

  const handleLoginOut = () => {
    appContext.setUserInfo({});
    router.push('/login');
  };

  useEffect(() => {
    const handleHideUserPanel = (e: any) => {
      if (visible && !e.target.contains(userPanelRef.current)) {
        hideUserPanel();
      }
    };

    document.addEventListener('click', handleHideUserPanel, false);

    return () => {
      document.removeEventListener('click', handleHideUserPanel, false)
    }
  }, [])

  return (
    <div className={styles.header}>
      <span className={styles.menu_collapse_icon} onClick={handleCollapse}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} style={{ fontSize: 25 }} />
      </span>

      <span className={styles.pannel}>
        <span className={styles.notification} onClick={showUserPanel}>
          <Badge count={10} dot>
            <Icon type="notification" />
          </Badge>
        </span>

        <span className={styles.avatar} onClick={showUserPanel}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="default"
          />
        </span>

        <span className={styles.username}>
          {appContext.userInfo && appContext.userInfo.name}
        </span>
      </span>

      {visible && (
        <div className={styles.settings} ref={userPanelRef}>
          <div className={styles.setting_item}>
            <Icon type="user" />
            <span>个人中心</span>
          </div>
          <div className={styles.setting_item}>
            <Icon type="setting" />
            <span>个人设置</span>
          </div>
          <div className={styles.loginout} onClick={handleLoginOut}>
            <Icon type="logout" /> <span>退出登录</span>
          </div>
        </div>
      )}
    </div>
  );
};
