import React from 'react';
import PropTypes from 'prop-types';

import ModelItem from 'components/model-item/ModelItem';
import Grid from 'components/grid/Grid';

const ModelsGrid = ({ models }) => {
  return (
    <>
      <Grid
        cols={4}
        items={models}
        itemComponent={ModelItem}
        uniqueItemKey="slug"
      />
    </>
  );
};

ModelsGrid.propTypes = {
  models: PropTypes.array.isRequired,
};

export default ModelsGrid;
