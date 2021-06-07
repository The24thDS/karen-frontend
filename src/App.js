import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarContext, {
  navbarDefaultState,
} from 'state/contexts/NavbarContext';

import { checkToken } from 'api/users.api';
import { clearFetchError } from 'state/actions/errors.actions';
import { logUserIn } from 'state/actions/users.actions';
import { setSidepanelOpened } from 'state/actions/settings.actions';
import { getSidepanelOpened } from 'state/selectors/settings.selectors';
import { useLocationChange } from 'utils/hooks';
import { getBearerToken } from 'utils/general';

import Routes from './Routes';
import Navbar from 'components/nav/Navbar';
import Sidepanel from 'components/sidepanel/Sidepanel';
import SidepanelModelContent from 'components/sidepanel/SidepanelModelContent';
import ErrorToast from 'components/error-toast/ErrorToast';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  // USE SELECTOR HOOKS
  const sidepanelOpened = useSelector(getSidepanelOpened);

  // USE STATE HOOKS
  const [navbarState, setNavbarState] = useState({
    state: navbarDefaultState,
    setNavbarState: (navbarState) =>
      setNavbarState((currentState) => ({
        state: { ...currentState, ...navbarState },
        setNavbarState: currentState.setNavbarState,
      })),
  });

  // USE EFFECT HOOKS
  useLocationChange(() => {
    dispatch(clearFetchError());
  });

  useEffect(() => {
    if (getBearerToken()) {
      (async function logUserInWithToken() {
        const response = await checkToken();
        if (response?.valid) {
          dispatch(logUserIn(response.user));
        }
      })();
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
