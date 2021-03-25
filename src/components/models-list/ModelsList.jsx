import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchModels } from '../../state/actions/models.actions';
import {
  selectModels,
  selectModelsLoading,
} from '../../state/selectors/models.selectors';

const ModelsList = ({ models, loading, fetchModels }) => {
  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ModelEntry = (id, name) => (
    <div key={id}>
      <Link to={`/models/${id}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );

  return (
    <>
      {loading && 'Loading...'}
      {!loading && models.map((model) => ModelEntry(model.id, model.name))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelsList);
