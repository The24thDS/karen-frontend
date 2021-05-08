import React from 'react';

import { getImagePath } from 'utils/general';

const ModelItem = ({ slug, name, user: { username }, image, onClick }) => (
  <div
    className="flex flex-col rounded-md shadow-lg cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <div className="h-64 overflow-hidden">
      <div
        className="h-full bg-cover transform transition-all ease-in-out hover:scale-125"
        style={{
          backgroundImage: `url(${getImagePath(slug, username, image)})`,
          backgroundPosition: 'center center',
        }}
      ></div>
    </div>
    <h2 className="py-5 px-1 capitalize text-center font-semibold text-gray-700">
      {name}
    </h2>
  </div>
);

export default ModelItem;
