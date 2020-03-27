import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

/**
 * 403 页面
 */
export default () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有足够的权限访问页面"
      extra={<Button type="primary" onClick={() => router.push('/') }>返回首页</Button>}
    />
  )
};