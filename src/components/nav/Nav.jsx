import React from 'react';
import { connect } from 'react-redux';
import { tw, css } from 'twind/css';
import { bindActionCreators } from 'redux';

import {
  selectCurrentUserData,
  selectUserLoggedIn,
} from '../../state/selectors/users.selectors';
import { logout } from '../../state/actions/users.actions';

import NavLink from './NavLink';
import BrandLink from './BrandLink';
import SearchInput from '../search/SearchInput';
import { useHistory } from 'react-router-dom';
import NavItem from './NavItem';

const searchInputContainer = css({
  minWidth: '450px',
});

const Nav = ({
  showBrand,
  showSearch,
  isLoggedIn,
  currentUserData,
  logout,
}) => {
  const history = useHistory();
  const logUserOut = () => {
    sessionStorage.removeItem('json-wt');
    logout();
    history.push('/login');
  };

  const renderBrandLink = () =>
    showBrand === true ? <BrandLink to="/">KAREN</BrandLink> : '';
  const renderAllModelsLink = () => <NavLink to="/models">All Models</NavLink>;
  const renderModelUploadLink = () =>
    isLoggedIn === true ? <NavLink to="/models/new">Upload</NavLink> : '';
  const renderSearchInput = () =>
    showSearch === true ? (
      <SearchInput
        classNames={{
          container: tw`z-10 relative text-sm my-2 w-100 ${searchInputContainer}`,
          input: 'px-4',
          button: 'p-2',
        }}
      />
    ) : (
      ''
    );
  const renderLogoutLink = () =>
    isLoggedIn === true ? (
      <NavLink onClick={logUserOut} to="/login">
        Logout
      </NavLink>
    ) : (
      ''
    );
  const userGreetingItem = isLoggedIn && (
    <NavItem>Hello, {currentUserData.email.split('@')[0]}</NavItem>
  );
  const renderRegisterLink = () =>
    isLoggedIn === false ? <NavLink to="/register">Register</NavLink> : '';
  const renderLoginLink = () =>
    isLoggedIn === false ? <NavLink to="/login">Login</NavLink> : '';

  return (
    <nav className="flex mx-auto justify-between px-14 h-14 bg-gray-900">
      <ul className="flex">
        {renderBrandLink()}
        {renderAllModelsLink()}
        {renderModelUploadLink()}
      </ul>
      {renderSearchInput()}
      <ul className="flex">
        {renderLoginLink()}
        {renderRegisterLink()}
        {userGreetingItem}
        {renderLogoutLink()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
