import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedModel } from 'state/actions/models.actions';
import { setSidepanelOpened } from 'state/actions/settings.actions';

import ModelItem from 'components/model-item/ModelItem';
import Grid from 'components/grid/Grid';

const ModelsGrid = ({ models, setSelectedModel, setSidepanelOpened }) => {
  useEffect(() => {
    return () => {
      setSidepanelOpened(false);
    };
  }, []);

  return (
    <Grid
      cols={4}
      itemComponent={ModelItem}
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
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setSelectedModel, setSidepanelOpened }, dispatch),
});

export default connect(null, mapDispatchToProps)(ModelsGrid);
