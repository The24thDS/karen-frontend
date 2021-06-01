import React from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';

import LoadingIndicator from 'components/loading-indicator/LoadingIndicator';

const WithLoading = ({
  condition: shouldRenderComponent,
  addClassNames,
  children,
}) => {
  const renderPlaceholder = () => (
    <div
      className={tw(
        `w-full h-full flex justify-center items-center`,
        addClassNames
      )}
    >
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
