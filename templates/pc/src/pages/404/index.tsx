import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

/**
 * 404 页面
 */
export default () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在"
      extra={<Button type="primary" onClick={() => router.push('/') }>返回首页</Button>}
    />
  )
};