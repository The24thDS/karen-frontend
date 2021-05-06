import React from 'react';
import RegisterForm from '../../components/register-form/RegisterForm';
import { connect } from 'react-redux';
import { selectUserLoggedIn } from '../../state/selectors/users.selectors';

export const RegisterPage = () => {
  return (
    <div className="max-w-sm mx-auto px-6 md:mt-12">
      <h1 className="text-center font-semibold text-black text-xl">
        Create your account now
      </h1>
      <RegisterForm />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectUserLoggedIn(state),
  };
};

export default connect(mapStateToProps)(RegisterPage);
