import ModelsGrid from 'components/models-grid/ModelsGrid';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchModels } from '../../state/actions/models.actions';
import {
  selectModels,
  selectModelsError,
  selectModelsLoading,
  selectModelsSearchTerm,
} from '../../state/selectors/models.selectors';

const SearchResultsPage = ({ models, loading, error, searchTerm }) => {
  return (
    <div className="px-20 md:mt-12">
      <h1 className="text-xl font-semibold">
        Search results for{' '}
        <span className="italic font-bold">{searchTerm}</span>
      </h1>
      {loading && 'Loading...'}
      {!loading && <ModelsGrid models={models} />}
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  return {
    models: selectModels(state),
    loading: selectModelsLoading(state),
    error: selectModelsError(state),
    searchTerm: selectModelsSearchTerm(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ fetchModels }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
