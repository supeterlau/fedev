import * as React from 'react';
import { Button } from 'remax/wechat';
import './index.css';

const LoginBtn = ({ login, children }) => {
  return (
    <Button
      className="login-button"
      hoverClass="none"
      openType="getUserInfo"
      onGetUserInfo={login}
    >
      {children}
    </Button>
  );
};

export default LoginBtn;