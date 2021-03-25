import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../form/inputs/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logUserIn } from '../../state/actions/users.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  selectCurrentUserError,
  selectCurrentUserLoading,
} from '../../state/selectors/users.selectors';
import Error from '../error/Error';
import SubmitButton from '../form/inputs/SubmitButton';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm({ logUserIn, loginLoading, loginError }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const loginErrorMessage =
    loginError?.statusCode === 401
      ? 'Incorrect email and password'
      : loginError?.message;

  return (
    <form onSubmit={handleSubmit(logUserIn)} className="flex flex-col mt-8">
      <Input
        register={register}
        id="email"
        type="email"
        name="email"
        label="Email"
        errors={errors.email}
      />
      <Input
        register={register}
        id="password"
        type="password"
        name="password"
        label="Password"
        errors={errors.password}
      />
      <SubmitButton text={loginLoading ? 'Logging you in...' : 'Login'} />
      {loginError && <Error message={loginErrorMessage} className="mt-2" />}
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    loginError: selectCurrentUserError(state),
    loginLoading: selectCurrentUserLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ logUserIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
