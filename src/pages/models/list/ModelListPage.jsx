import ModelsGrid from 'components/models-grid/ModelsGrid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchModels } from 'state/actions/models.actions';
import {
  selectModels,
  selectModelsLoading,
} from 'state/selectors/models.selectors';

const ModelListPage = ({ models, loading, fetchModels }) => {
  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && 'Loading...'}
      {!loading && <ModelsGrid models={models} />}
    </>
  );
};

const mapStateToProps = (state, _ownProps) => {
  return {
    models: selectModels(state),
    loading: selectModelsLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ fetchModels }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelListPage);
