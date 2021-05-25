import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkToken } from 'state/actions/users.actions';
import NavbarContext, {
  navbarDefaultState,
} from 'state/contexts/NavbarContext';

import Routes from './Routes';
import Navbar from 'components/nav/Navbar';
import Sidepanel from 'components/sidepanel/Sidepanel';
import SidepanelModelContent from 'components/sidepanel/SidepanelModelContent';
import ErrorToast from 'components/error-toast/ErrorToast';

import { setSidepanelOpened } from 'state/actions/settings.actions';
import { getSidepanelOpened } from 'state/selectors/settings.selectors';
import { clearFetchError } from 'state/actions/errors.actions';
import { useLocationChange } from 'utils/hooks';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const sidepanelOpened = useSelector(getSidepanelOpened);
  const [navbarState, setNavbarState] = useState({
    state: navbarDefaultState,
    setNavbarState: (navbarState) =>
      setNavbarState((currentState) => ({
        state: { ...currentState, ...navbarState },
        setNavbarState: currentState.setNavbarState,
      })),
  });

  useLocationChange(() => {
    dispatch(clearFetchError());
  });

  useEffect(() => {
    if (sessionStorage.getItem('json-wt')?.length) {
      dispatch(checkToken());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container max-w-full mx-auto">
      <NavbarContext.Provider value={navbarState}>
        <Navbar />
        <div className="pt-14 flex justify-center">
          <Routes />
          <Sidepanel
            opened={sidepanelOpened}
            onClose={() => {
              dispatch(setSidepanelOpened(false));
            }}
          >
            <SidepanelModelContent />
          </Sidepanel>
          <ErrorToast />
        </div>
      </NavbarContext.Provider>
    </main>
  );
};

export default App;
