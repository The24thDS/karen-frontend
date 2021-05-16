import React from 'react';

import Model from '../../../components/model/Model';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { tw } from 'twind';

const buttonStyle = tw`border(1 gray-500) py-1 px-4 uppercase rounded font-semibold cursor-pointer mb-2 -mt-4`;

const ModelViewPage = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="px-20 md:mt-12">
      <button
        className={tw(buttonStyle, `bg-gray-500 text-white`)}
        onClick={() => history.goBack()}
      >
        Back
      </button>
      <Link
        className={tw(buttonStyle, `bg-blue-500 text-white ml-2`)}
        to={`${location.pathname}/edit`}
      >
        Edit
      </Link>
      <button
        className={tw(buttonStyle, `bg-red-500 text-white ml-2`)}
        onClick={() => console.log('delete here')}
      >
        Delete
      </button>
      <div className="grid grid-cols-2 gap-y-5 gap-x-10">
        <Model />
      </div>
    </div>
  );
};

export default ModelViewPage;
