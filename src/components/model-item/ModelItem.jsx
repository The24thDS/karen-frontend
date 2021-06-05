import React from 'react';
import { tw } from 'twind';

import { getImagePath } from 'utils/general';

const ModelItem = ({
  slug,
  name,
  user: { username },
  image,
  onClick,
  addCardClassNames,
  addImageContainerClassNames,
  addImageClassName,
  addNameClassNames,
}) => (
  <div
    className={tw(
      `flex flex-col rounded-md shadow-lg cursor-pointer hover:shadow-md transition-shadow`,
      addCardClassNames
    )}
    onClick={onClick}
  >
    <div className={tw(`h-64 overflow-hidden`, addImageContainerClassNames)}>
      <div
        className={tw(
          `h-full bg-cover transform transition-all ease-in-out hover:scale-125`,
          addImageClassName
        )}
        style={{
          backgroundImage: `url(${getImagePath(slug, username, image)})`,
          backgroundPosition: 'center center',
        }}
      ></div>
    </div>
    <h2
      className={tw(
        `py-5 px-1 capitalize text-center font-semibold text-gray-700`,
        addNameClassNames
      )}
    >
      {name}
    </h2>
  </div>
);

export const ModelItemSmall = (props) => (
  <ModelItem {...props} addImageContainerClassNames={tw(`h-32`)} />
);

export default ModelItem;
