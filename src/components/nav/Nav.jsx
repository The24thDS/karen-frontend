import React from 'react';
import { connect } from 'react-redux';

import {
  selectCurrentUserData,
  selectUserLoggedIn,
} from '../../state/selectors/users.selectors';

import NavLink from './NavLink';
import BrandLink from './BrandLink';
import SearchInput from '../search/SearchInput';
import { tw, css } from 'twind/css';

const searchInputContainer = css({
  minWidth: '450px',
});

const Nav = ({ showBrand, showSearch, isLoggedIn, currentUserData }) => {
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
    isLoggedIn === true ? <NavLink to="/logout">Logout</NavLink> : '';
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
        {isLoggedIn && <p>Hello, {currentUserData.email.split('@')[0]}</p>}
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

export default connect(mapStateToProps)(Nav);
