import React from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../utils/general';

const ModelsListEntry = ({ slug, name, username, image }) => (
  <Link
    to={`/models/${slug}`}
    key={slug}
    className="flex flex-col rounded-md shadow-lg cursor-pointer hover:shadow-md transition-shadow"
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
  </Link>
);

export default ModelsListEntry;
