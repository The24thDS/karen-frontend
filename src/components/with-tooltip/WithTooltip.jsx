import PropTypes from 'prop-types';
import { tw } from 'twind/css';
import { content } from '@twind/content';

const WithTooltip = ({ text, children }) => {
  const tooltip = tw`before::(${content(
    `"${text}"`
  )} absolute -left-full -top-1/2 -mt-5 z-50 p-1 text-sm bg-black text-white shadow rounded hidden w-max) hover:(before::block)`;
  return <span className={tw(tooltip, 'relative')}>{children}</span>;
};

WithTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default WithTooltip;
