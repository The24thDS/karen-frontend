import WithTooltip from 'components/with-tooltip/WithTooltip';
import React from 'react';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// import { getImagePath } from 'utils/general';

const CollectionItem = ({ slug, name, private: isPrivate, onClick }) => (
  <Link
    className="flex flex-col rounded-md shadow-lg cursor-pointer hover:shadow-md transition-shadow"
    to={`/collections/${slug}`}
  >
    <div className="h-64 overflow-hidden">
      <div
        className="h-full bg-cover transform transition-all ease-in-out hover:scale-125"
        style={{
          backgroundImage: `url(https://via.placeholder.com/400)`,
          backgroundPosition: 'center center',
        }}
      ></div>
    </div>
    <h2 className="flex justify-between items-center py-5 px-1 capitalize font-semibold text-gray-700">
      {name}{' '}
      {isPrivate && (
        <WithTooltip text="private">
          <RiGitRepositoryPrivateFill />
        </WithTooltip>
      )}
    </h2>
  </Link>
);

export default CollectionItem;
