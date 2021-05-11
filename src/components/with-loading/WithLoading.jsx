import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/loading-indicator/LoadingIndicator';

const WithLoading = ({ condition: shouldRenderComponent, children }) => {
  const renderPlaceholder = () => (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingIndicator />
    </div>
  );

  return shouldRenderComponent ? children : renderPlaceholder();
};

WithLoading.propTypes = {
  children: PropTypes.element.isRequired,
  condition: PropTypes.bool.isRequired,
};

export default WithLoading;
