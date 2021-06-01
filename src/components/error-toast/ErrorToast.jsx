import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tw } from 'twind';
import { AiOutlineClose } from 'react-icons/ai';

import { getErrorsData, getHasError } from 'state/selectors/errors.selectors';
import { hideFetchError } from 'state/actions/errors.actions';

const ErrorToast = () => {
  const hasError = useSelector(getHasError);
  const errorData = useSelector(getErrorsData);
  const dispatch = useDispatch();

  return (
    <div
      className={tw(
        'fixed bg-white shadow-xl p-2 pr-10 rounded transition-all duration-500 border-l-8 border-red-500 z-50',
        hasError ? 'bottom-5' : '-bottom-full'
      )}
      role="alert"
    >
      <h4 className={tw('text-lg font-bold')}>Error: {errorData?.error}!</h4>
      <p className={tw('font-medium')}>
        {errorData?.message.toString()} (Code: {errorData?.statusCode})
      </p>
      <AiOutlineClose
        className={tw(
          'absolute top-0 right-0 pr-2 text-2xl cursor-pointer h-full'
        )}
        onClick={() => dispatch(hideFetchError())}
      />
    </div>
  );
};

export default ErrorToast;
