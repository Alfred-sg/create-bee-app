import React from 'react';
import { Alert } from 'antd';
import { IS_DEV, ENV_TEXT, GIT_BRANCH_NAME, GIT_COMMIT_HASH, GIT_COMMIT_MESSAGE } from '@/config';

/**
 * 环境、git 信息
 */
export default () => {
  const message = (
    <div>
      <div>当前环境：{ENV_TEXT}；提交分支：{GIT_BRANCH_NAME}；提交Hash：{GIT_COMMIT_HASH}</div>
      <div>提交信息：{GIT_COMMIT_MESSAGE}</div>
    </div>
  );

  return IS_DEV ? (
    <Alert message={message} type="warning" />
  ) : null;
};