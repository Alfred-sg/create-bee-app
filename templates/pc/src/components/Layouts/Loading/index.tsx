import React from 'react';
import styles from './index.scss'

export default () => {
  return (
    <div className={styles.loading}>
      <div className={styles.content}>页面加载中......</div>
    </div>
  );
}
