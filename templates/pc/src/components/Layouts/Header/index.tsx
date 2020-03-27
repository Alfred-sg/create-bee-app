import React, { useEffect, useState, useRef } from 'react';
import { Avatar } from 'antd';
import { IconContext } from 'react-icons';
import { AiOutlineLogout, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import router from 'umi/router';
import { ENABLE_LOGIN } from '@/config';
import { useAppContext } from '@/hooks/global/app';

import styles from './index.scss';

export default (props: {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  className?: string;
}) => {
  const { collapsed, onCollapse, className } = props;
  const [visible, setVisible] = useState(false);
  const userPanelRef = useRef(null);
  const appContext = useAppContext();

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
  }, []);

  return (
    <div className={`${styles.header} ${className || ''}`}>
      <span onClick={() => onCollapse(!collapsed)}>
        <IconContext.Provider value={{ className: styles.menu_collapse_icon }}>
          {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
        </IconContext.Provider>
      </span>

      <span className={styles.pannel}>
        <span className={styles.avatar} onClick={showUserPanel}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="default"
          />

          <span className={styles.username}>
            {appContext.userInfo && appContext.userInfo.name}
          </span>
        </span>
      </span>

      {ENABLE_LOGIN && visible && (
        <div className={styles.user_panel} ref={userPanelRef}>
          <div className={styles.loginout} onClick={handleLoginOut}>
            <AiOutlineLogout /> <span>退出登录</span>
          </div>
        </div>
      )}
    </div>
  );
};
