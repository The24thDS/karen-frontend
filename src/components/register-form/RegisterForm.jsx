import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { getErrorsData, getHasError } from 'state/selectors/errors.selectors';
import { register as registerUser } from 'api/users.api';

import Input from 'components/form/inputs/Input';
import Error from 'components/error/Error';
import SubmitButton from 'components/form/inputs/SubmitButton';
import { clearFetchError } from 'state/actions/errors.actions';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  // USE SELECTOR HOOKS
  const hasError = useSelector(getHasError);
  const errorData = useSelector(getErrorsData);

  // USE STATE HOOKS
  const [formStatus, setFormStatus] = useState({
    loading: false,
    done: false,
  });

  // FUNCTIONS
  const registerNewUser = async (data) => {
    setFormStatus({
      loading: true,
      done: false,
    });
    dispatch(clearFetchError());
    const response = await registerUser(data);
    if (response) {
      setFormStatus({
        loading: false,
        done: true,
      });
    } else {
      setFormStatus({
        loading: false,
        done: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerNewUser)}
      className="flex flex-col mt-8"
    >
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
        id="username"
        type="text"
        name="username"
        label="Username"
        errors={errors.username}
      />
      <Input
        register={register}
        id="password"
        type="password"
        name="password"
        label="Password"
        errors={errors.password}
      />
      <SubmitButton
        text={formStatus.loading ? 'Creating your account...' : 'Register'}
      />
      {hasError &&
        (errorData?.message instanceof Array ? (
          errorData?.message?.map((message) => (
            <Error message={message} className="mt-2" />
          ))
        ) : (
          <Error message={errorData?.message} className="mt-2" />
        ))}
      {formStatus.done &&
        'Your account was successfully created. Go to log in to access it!'}
    </form>
  );
};

export default RegisterForm;
