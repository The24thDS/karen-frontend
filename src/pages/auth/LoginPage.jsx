import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import { connect } from 'react-redux';
import { selectUserLoggedIn } from '../../state/selectors/users.selectors';
import { Redirect } from 'react-router-dom';

export const LoginPage = ({ isLoggedIn }) => {
  return (
    <>
      <div className="max-w-sm mx-auto px-6 md:mt-12">
        {isLoggedIn && <Redirect to="/" />}
        <h1 className="text-center font-semibold text-black text-xl">
          Log into your account now
        </h1>
        <LoginForm />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectUserLoggedIn(state),
  };
};

export default connect(mapStateToProps)(LoginPage);
