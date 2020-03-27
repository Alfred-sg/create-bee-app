import React from 'react';
import { WingBlank, Button } from 'antd-mobile';
import { router } from 'umi';
import styles from './index.scss';

/**
 * 500 页面
 */
export default () => {
  return (
    <div>
      <div className={styles.img}></div>
      <WingBlank>
        <Button type="primary" onClick={() => router.push('/')}>返回首页</Button>
      </WingBlank>
    </div>
  )
};
