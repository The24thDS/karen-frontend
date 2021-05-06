import React from 'react';

import LoginForm from '../../components/login-form/LoginForm';

export const LoginPage = () => {
  return (
    <div className="max-w-sm mx-auto px-6 md:mt-12">
      <h1 className="text-center font-semibold text-black text-xl">
        Log into your account now
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
