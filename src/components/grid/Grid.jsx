import PropTypes from 'prop-types';
import React from 'react';
import { tw } from 'twind';

const Grid = ({ items, itemComponent: Item, cols, uniqueItemKey }) => {
  return (
    <section className={tw`grid(& cols-${cols.toString()}) gap-4 mt-10 mx-20`}>
      {items.map((item) => (
        <Item key={item[uniqueItemKey]} {...item} />
      ))}
    </section>
  );
};

Grid.propTypes = {
  cols: PropTypes.number.isRequired,
  itemComponent: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  uniqueItemKey: PropTypes.string,
};

Grid.defaultProps = {
  uniqueItemKey: 'id',
};

export default Grid;
