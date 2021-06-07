import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';
import * as yup from 'yup';

import { getErrorsData, getHasError } from 'state/selectors/errors.selectors';
import { logUserIn } from 'state/actions/users.actions';
import { login } from 'api/users.api';

import Input from '../form/inputs/Input';
import Error from '../error/Error';
import SubmitButton from '../form/inputs/SubmitButton';

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  // USE SELECTOR HOOKS
  const hasError = useSelector(getHasError);
  const errorData = useSelector(getErrorsData);

  // USE STATE HOOKS
  const [loading, setLoading] = useState(false);

  // USE MEMO HOOKS
  const loginErrorMessage = useMemo(
    () =>
      errorData?.statusCode === 401
        ? 'Incorrect email and password'
        : errorData?.message,
    [errorData]
  );

  // FUNCTIONS
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await login(data);
    setLoading(false);
    if (response !== null) {
      dispatch(logUserIn(response.user));
      localStorage.setItem('karen_jwt', response.access_token);
      history.replace('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-8">
      <Input
        register={register}
        id="email"
        name="email"
        label="Email / Username"
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
      <SubmitButton text={loading ? 'Logging you in...' : 'Login'} />
      {hasError && <Error message={loginErrorMessage} className="mt-2" />}
    </form>
  );
};

export default LoginForm;
