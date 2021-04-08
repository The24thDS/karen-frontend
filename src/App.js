import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import Routes from './Routes';
import { checkToken } from './state/actions/users.actions';

function App({ checkToken }) {
  useEffect(() => {
    if (sessionStorage.getItem('json-wt')?.length) {
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-full mx-auto">
      <Routes />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ checkToken }, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
