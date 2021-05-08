import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSelectedModel } from 'state/selectors/models.selectors';
import { getImagePath } from 'utils/general';

const SidepanelModelContent = ({ selectedModel }) => {
  return (
    <>
      <Link to={`/models/${selectedModel.slug}`}>
        <img
          className="rounded"
          src={getImagePath(
            selectedModel?.slug,
            selectedModel?.user?.username,
            selectedModel?.image
          )}
          alt=""
        />
        <h1 className="text-center text-2xl pt-4">{selectedModel?.name}</h1>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedModel: getSelectedModel(state),
});

export default connect(mapStateToProps)(SidepanelModelContent);
