import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register as registerUser } from '../../api/users.api';
import Input from '../form/inputs/Input';
import Error from '../error/Error';
import SubmitButton from '../form/inputs/SubmitButton';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function RegisterForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    done: false,
  });

  const registerNewUser = async (data) => {
    setFormStatus({
      loading: true,
      error: null,
      done: false,
    });
    const response = await registerUser(data);
    if (response.ok && response.status === 201) {
      setFormStatus({
        loading: false,
        error: null,
        done: true,
      });
    } else {
      setFormStatus({
        loading: false,
        error: response.data,
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
        id="password"
        type="password"
        name="password"
        label="Password"
        errors={errors.password}
      />
      <SubmitButton
        text={formStatus.loading ? 'Creating your account...' : 'Register'}
      />
      {formStatus.error &&
        (formStatus.error?.message instanceof Array ? (
          formStatus.error?.message?.map((message) => (
            <Error message={message} className="mt-2" />
          ))
        ) : (
          <Error message={formStatus.error?.message} className="mt-2" />
        ))}
      {formStatus.done &&
        'Your account was successfully created. Go to log in to access it!'}
    </form>
  );
}

export default RegisterForm;
