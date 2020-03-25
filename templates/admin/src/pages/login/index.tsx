import React from 'react';
import { Form, Input, Button } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { login } from '@/services/global';
import router from 'umi/router';
import { TITLE, LOGO_URL } from '@/config';
import styles from './index.scss';

export default () => {
  const form = Form.useForm();
  const { validateFields } = form[0];

  const handleSubmit = () => {
    validateFields().then(fields => {
      login(fields).then(res => {
        if (res && res.success){
          router.push('');
        }
      })
    })
    .catch(e => console.error(e.message));
  };

  return (
    <div className={styles.normal}>
      <div className={styles.logo}>
        <span className={styles.logo_img}>
          <img alt="logo" src={LOGO_URL} />
        </span>
        <span className={styles.title}>{TITLE}</span>
      </div>

      <div className={styles.login_form}>
        <Form form={form[0]}>
          <Form.Item 
            // @ts-ignore
            name="name" 
            rules={[{ required: true, message: '请输入用户名!', whitespace: true }]}
          >
            <Input
              prefix={<AiOutlineUser />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item 
            // @ts-ignore
            name="password" 
            rules={[{ required: true, message: '请输入密码!', whitespace: true }]}
          >
            <Input
              prefix={<AiOutlineLock />}
              type="password"
              size="large"
              placeholder="密码"
            />
          </Form.Item>

          <Button 
            onClick={handleSubmit} 
            type="primary" 
            size="large"
            className={styles.login_button}
          >
            登陆
          </Button>
        </Form>
      </div>
    </div>
  );
}
