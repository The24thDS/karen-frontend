import React, { useContext, useEffect } from 'react';
import { tw, css } from 'twind/css';

import NavbarContext from 'state/contexts/NavbarContext';

import SearchInput from 'components/search/SearchInput';

import image from 'assets/home_page_image.jpg';

const heroCss = css({
  height: 'calc(100vh - 56px)',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
});

const HomePage = () => {
  const { setNavbarState } = useContext(NavbarContext);

  useEffect(() => {
    setNavbarState({
      showBrand: false,
      showSearch: false,
    });
    return () => {
      setNavbarState({
        showBrand: true,
        showSearch: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={tw(
          'w-full relative flex flex-col justify-center items-center',
          heroCss
        )}
      >
        <h1 className={tw`text-8xl text-white relative z-10 font-bold mb-10`}>
          KAREN
        </h1>
        <SearchInput
          classNames={{
            container: 'z-10 relative text-3xl',
            input: 'px-4 py-2',
            button: 'p-2',
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
