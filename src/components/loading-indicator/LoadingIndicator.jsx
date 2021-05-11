import React from 'react';
import PropTypes from 'prop-types';
import { css, apply, tw, theme } from 'twind/css';

const LoadingIndicator = ({
  size,
  backgroundColor: bgColor,
  accentColor: accColor,
}) => {
  const sz = size.toString();
  const loadingStyle = css(
    apply`w-${sz} h-${sz} border(4 ${bgColor}-200) rounded-full animate-spin`,
    {
      borderTopColor: theme(`borderColor.${accColor}.500`),
    }
  );
  return <div className={tw(loadingStyle)}></div>;
};

LoadingIndicator.propTypes = {
  accentColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  accentColor: 'blue',
  backgroundColor: 'gray',
  size: 10,
};

export default LoadingIndicator;
