import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tw, css } from 'twind/css';
import WithLoading from 'components/with-loading/WithLoading';
import { AiFillCloseCircle } from 'react-icons/ai';

const transitionDurationMs = 200;

const sidepanelOpenedCSS = css({
  width: '25vw',
});

const sidepanelClosedCSS = css({
  width: '0vw',
});

const useContentStatus = (opened) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (opened === true) {
      setTimeout(() => {
        setShowContent(true);
      }, transitionDurationMs);
    } else {
      setShowContent(false);
    }
  }, [opened]);

  return showContent;
};

const Sidepanel = ({ children, opened, onClose }) => {
  const shouldDisplayContent = useContentStatus(opened);

  return (
    <aside
      className={tw(
        `relative max-h-screen transition-all ease-linear duration-${transitionDurationMs}`,
        opened ? sidepanelOpenedCSS : sidepanelClosedCSS
      )}
    >
      <button
        className={tw`${
          opened ? 'block ' : 'hidden'
        } fixed cursor-pointer bg-none border-0 text-white z-10 text-xl w-8 h-8 right-[23vw]`}
        onClick={() => {
          onClose();
        }}
      >
        <AiFillCloseCircle />
      </button>
      <div
        className={tw(
          `bg-black text-white box-border fixed h-screen py-10 pl-6 right-0`,
          shouldDisplayContent ? 'block' : 'hidden',
          sidepanelOpenedCSS
        )}
      >
        <WithLoading condition={shouldDisplayContent}>{children}</WithLoading>
      </div>
    </aside>
  );
};

Sidepanel.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidepanel;
