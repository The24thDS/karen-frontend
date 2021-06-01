import PropTypes from 'prop-types';
import React from 'react';
import { tw } from 'twind';

const Grid = ({
  items,
  itemComponent: Item,
  cols,
  uniqueItemKey,
  classNames,
  onItemClick,
}) => {
  return (
    <section
      className={tw`grid(& cols-${cols.toString()}) gap-4 ${classNames}`}
    >
      {items.map((item) => (
        <Item
          key={item[uniqueItemKey]}
          {...item}
          onClick={() => onItemClick(item)}
        />
      ))}
    </section>
  );
};

Grid.propTypes = {
  cols: PropTypes.number.isRequired,
  itemComponent: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  uniqueItemKey: PropTypes.string,
  classNames: PropTypes.string,
  onItemClick: PropTypes.func,
};

Grid.defaultProps = {
  uniqueItemKey: 'id',
};

export default Grid;
