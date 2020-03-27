import React from 'react';
import { useApp, AppContext } from '@/hooks/global/app';
import { ErrorBoundary } from '@/components/Layouts';
import styles from './index.scss';

/**
 * 普通桌面应用 layout
 */
const BasicLayout: React.FC<{
  location: any;
  route: any;
}> = props => {
  const { location: { pathname } } = props;
  const app = useApp({ });

  return (
    <ErrorBoundary>
      <AppContext.Provider value={app}>
        <div className={styles.content}>
          {props.children}
        </div>
      </AppContext.Provider>
    </ErrorBoundary>
  );
};

export default BasicLayout;
