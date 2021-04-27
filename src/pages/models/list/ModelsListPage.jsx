import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModelsListEntry } from '../../../components/models-list-entry';

import { fetchModels } from '../../../state/actions/models.actions';
import {
  selectModels,
  selectModelsLoading,
} from '../../../state/selectors/models.selectors';
import Nav from '../../../components/nav/Nav';

const ModelsListPage = ({ models, loading, fetchModels }) => {
  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav showBrand showSearch />
      {loading && 'Loading...'}
      {!loading && (
        <div className="grid grid-cols-4 gap-4 mt-10 mx-20">
          {models.map((m) => (
            <ModelsListEntry
              slug={m.slug}
              name={m.name}
              image={m.image}
              username={m.u.username}
            />
          ))}
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelsListPage);
