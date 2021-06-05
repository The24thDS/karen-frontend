import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedModel } from 'state/actions/models.actions';
import { setSidepanelOpened } from 'state/actions/settings.actions';

import ModelItem from 'components/model-item/ModelItem';
import Grid from 'components/grid/Grid';

const ModelsGrid = ({
  models,
  cols = 4,
  item: Item = ModelItem,
  setSelectedModel,
  setSidepanelOpened,
}) => {
  useEffect(() => {
    return () => {
      setSidepanelOpened(false);
    };
  }, []);

  return (
    <Grid
      cols={cols}
      itemComponent={Item}
      items={models}
      uniqueItemKey="slug"
      classNames={tw`flex-grow`}
      onItemClick={(item) => {
        setSelectedModel(item);
        setSidepanelOpened(true);
      }}
    />
  );
};

ModelsGrid.propTypes = {
  models: PropTypes.array.isRequired,
  cols: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setSelectedModel, setSidepanelOpened }, dispatch),
});

export default connect(null, mapDispatchToProps)(ModelsGrid);
