import React from 'react';
import Input from '../../form/inputs/Input';

const ModelInfoInput = ({ register, errors, id, name, label, type }) => {
  return (
    <div className="flex items-center justify-between">
      <p>{label}</p>
      <Input
        id={id}
        type={type}
        name={name}
        register={register}
        errors={errors[name]}
        classNames={{ container: 'w-3/4' }}
      />
    </div>
  );
};

export default ModelInfoInput;
