import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchModels } from '../../state/actions/models.actions';
import {
  selectModels,
  selectModelsLoading,
  selectModelsSearchTerm,
  selectModelsError,
} from '../../state/selectors/models.selectors';

import ModelsListEntry from '../../components/models-list-entry/ModelsListEntry';

const SearchResultsPage = ({ models, loading, error, searchTerm }) => {
  return (
    <>
      <div className="px-20 md:mt-12">
        <h1 className="text-xl font-semibold">
          Search results for{' '}
          <span className="italic font-bold">{searchTerm}</span>
        </h1>
        {loading && 'Loading...'}
        {!loading && (
          <div className="grid grid-cols-4 gap-4 mt-10">
            {models.map((m) => (
              <ModelsListEntry
                slug={m.slug}
                name={m.name}
                image={m.image}
                username={m.user.username}
              />
            ))}
          </div>
        )}
      </div>
    </>
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
