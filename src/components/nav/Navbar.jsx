import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { tw, css } from 'twind/css';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import {
  selectCurrentUserData,
  selectUserLoggedIn,
} from '../../state/selectors/users.selectors';
import { logout } from '../../state/actions/users.actions';
import NavbarContext from 'state/contexts/NavbarContext';

import NavLink from './NavLink';
import BrandLink from './BrandLink';
import SearchInput from '../search/SearchInput';
import NavItem from './NavItem';

const searchInputContainer = css({
  minWidth: '450px',
});

const Navbar = ({ isLoggedIn, currentUserData, logout }) => {
  const history = useHistory();
  const {
    state: { showBrand, showSearch },
  } = useContext(NavbarContext);
  const logUserOut = () => {
    sessionStorage.removeItem('json-wt');
    logout();
    history.push('/login');
  };

  const brandLink = showBrand && <BrandLink to="/">KAREN</BrandLink>;
  const allModelsLink = <NavLink to="/models">All Models</NavLink>;
  const modelUploadLink = isLoggedIn && (
    <NavLink to="/models/new">Upload</NavLink>
  );
  const searchInput = showSearch && (
    <SearchInput
      classNames={{
        container: tw`z-10 relative text-sm my-2 w-100 ${searchInputContainer}`,
        input: 'px-4',
        button: 'p-2',
      }}
    />
  );
  const logoutLink = isLoggedIn && (
    <NavLink onClick={logUserOut} to="/login">
      Logout
    </NavLink>
  );
  const userGreetingItem = isLoggedIn && (
    <NavItem>Hello, {currentUserData.username}</NavItem>
  );
  const registerLink = !isLoggedIn && (
    <NavLink to="/register">Register</NavLink>
  );
  const loginLink = !isLoggedIn && <NavLink to="/login">Login</NavLink>;

  return (
    <nav className="flex mx-auto justify-between px-14 h-14 bg-gray-900 fixed w-screen z-10">
      <ul className="flex">
        {brandLink}
        {allModelsLink}
        {modelUploadLink}
      </ul>
      {searchInput}
      <ul className="flex">
        {loginLink}
        {registerLink}
        {userGreetingItem}
        {logoutLink}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectUserLoggedIn(state),
    currentUserData: selectCurrentUserData(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
