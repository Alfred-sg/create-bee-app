import React from 'react';
import { List, InputItem, WingBlank, Button } from 'antd-mobile';
import { useForm } from 'chaos-hooks';
import { login } from '@/services/global';
import router from 'umi/router';
import { TITLE } from '@/config';
import styles from './index.scss';

export default () => {
  const { getFieldDecorator, getFieldError, validateFields } = useForm();

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
        <span className={styles.logo_img} />
        <span className={styles.title}>{TITLE}</span>
      </div>

      <WingBlank className={styles.login_form}>
          <List>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!', whitespace: true }]
            })(
              <InputItem
                placeholder="用户名"
                error={!!getFieldError('name')}
              />
            )}
          </List>
          
          <span className={styles.error}>
            {getFieldError('name') ? getFieldError('name').join(',') : ''}
          </span>

          <List>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码', whitespace: true }]
            })(
              <InputItem
                type="password"
                placeholder="密码"
                error={!!getFieldError('password')}
              />
            )}
          </List>
          
          <span className={styles.error}>
            {getFieldError('password') ? getFieldError('password').join(',') : ''}
          </span>

          <Button 
            onClick={handleSubmit} 
            type="primary" 
            size="large"
            className={styles.login_button}
          >
            登陆
          </Button>
      </WingBlank>
    </div>
  );
}
