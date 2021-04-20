import React from 'react';

import Nav from '../../../components/nav/Nav';
import Model from '../../../components/model/Model';
import { useHistory } from 'react-router-dom';
import { tw } from 'twind';

const ModelViewPage = () => {
  const history = useHistory();

  return (
    <>
      <Nav showBrand showSearch />
      <div className="px-20 md:mt-12">
        <button
          className={tw`border(1 gray-500) py-1 px-4 uppercase rounded bg-gray-500 font-semibold text-white cursor-pointer mb-2 -mt-4`}
          onClick={() => history.goBack()}
        >
          Back
        </button>
        <div className="grid grid-cols-2 gap-y-5 gap-x-10">
          <Model />
        </div>
      </div>
    </>
  );
};

export default ModelViewPage;
