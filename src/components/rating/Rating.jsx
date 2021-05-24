import React from 'react';
import { tw, css } from 'twind/css';
import { TiArrowDownThick, TiArrowUpThick } from 'react-icons/ti';

const arrowsStyles = tw`h-full flex items-center p-1 cursor-pointer`;
const minWidth = css({ minWidth: '3rem' });

const Rating = ({ value, onUpvote, onDownvote, isUpvoted, isDownvoted }) => {
  return (
    <div className={tw`flex items-center border shadow-md`}>
      <span
        className={tw(arrowsStyles, isUpvoted ? 'bg-green-300' : 'bg-white')}
        onClick={onUpvote}
      >
        <TiArrowUpThick />
      </span>
      <span
        className={tw(
          'h-full border-l border-r px-2 py-1 text-center',
          minWidth
        )}
      >
        {value}
      </span>
      <span
        className={tw(arrowsStyles, isDownvoted ? 'bg-red-300' : 'bg-white')}
        onClick={onDownvote}
      >
        <TiArrowDownThick />
      </span>
    </div>
  );
};

export default Rating;
