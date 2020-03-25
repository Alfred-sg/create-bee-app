import React from 'react';
import styles from './index.scss';

/**
 * 尾
 */
export default ({
  className
}: {
  className?: string,
}) => {
  return (
    <div className={`${styles.footer} ${className || ''}`}>
      <div className={styles.copyright}>
        ©2020
      </div>
    </div>
  );
}
