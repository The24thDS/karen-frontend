import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkToken } from 'state/actions/users.actions';
import NavbarContext, {
  navbarDefaultState,
} from 'state/contexts/NavbarContext';

import Routes from './Routes';
import Navbar from 'components/nav/Navbar';

import './App.css';
import Sidepanel from 'components/sidepanel/Sidepanel';
import { setSidepanelOpened } from 'state/actions/settings.actions';
import { getSidepanelOpened } from 'state/selectors/settings.selectors';
import SidepanelModelContent from 'components/sidepanel/SidepanelModelContent';

const App = ({ sidepanelOpened, checkToken, setSidepanelOpened }) => {
  const [navbarState, setNavbarState] = useState({
    state: navbarDefaultState,
    setNavbarState: (navbarState) =>
      setNavbarState((currentState) => ({
        state: { ...currentState, ...navbarState },
        setNavbarState: currentState.setNavbarState,
      })),
  });

  useEffect(() => {
    if (sessionStorage.getItem('json-wt')?.length) {
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container max-w-full mx-auto">
      <NavbarContext.Provider value={navbarState}>
        <Navbar />
        <div className="pt-14 flex">
          <Routes />
          <Sidepanel
            opened={sidepanelOpened}
            onClose={() => {
              setSidepanelOpened(false);
            }}
          >
            <SidepanelModelContent />
          </Sidepanel>
        </div>
      </NavbarContext.Provider>
    </main>
  );
};

const mapStateToProps = (state) => ({
  sidepanelOpened: getSidepanelOpened(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ checkToken, setSidepanelOpened }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
