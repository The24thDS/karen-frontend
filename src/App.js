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

function App({ checkToken }) {
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
        <Routes />
      </NavbarContext.Provider>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ checkToken }, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
