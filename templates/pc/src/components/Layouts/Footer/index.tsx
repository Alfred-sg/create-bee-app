import React from 'react';
import { COMPANY_NAME } from '@/config';
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
        Copyright ©2020 {COMPANY_NAME}
      </div>
    </div>
  );
}
