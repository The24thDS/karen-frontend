import React from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';

import Grid from 'components/grid/Grid';
import CollectionItem from 'components/collection-item/CollectionItem';

const CollectionsGrid = ({
  collections,
  fallbackMessage = 'No collections',
}) => {
  return collections.length > 0 ? (
    <Grid
      cols={4}
      itemComponent={CollectionItem}
      items={collections}
      uniqueItemKey="slug"
      classNames={tw`flex-grow`}
    />
  ) : (
    fallbackMessage
  );
};

CollectionsGrid.propTypes = {
  collections: PropTypes.array.isRequired,
  fallbackMessage: PropTypes.string,
};

export default CollectionsGrid;
