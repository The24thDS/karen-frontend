import React, { useCallback, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tw, css } from 'twind/css';
import { Link, useHistory } from 'react-router-dom';

import {
  selectCurrentUserData,
  selectUserLoggedIn,
} from 'state/selectors/users.selectors';
import { logout } from 'state/actions/users.actions';
import NavbarContext from 'state/contexts/NavbarContext';

import NavLink from './NavLink';
import BrandLink from './BrandLink';
import SearchInput from '../search/SearchInput';
import NavItem from './NavItem';
import md5 from 'md5';

const searchInputContainer = css({
  minWidth: '450px',
});
const showOnHover = css({
  '&:hover .dropdown-menu': {
    display: 'block',
  },
});
const dropdownItemStyle = tw(
  'cursor-pointer py-2 px-1 border-b-2 hover:(bg-gray-900 text-white)'
);

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    state: { showBrand, showSearch },
  } = useContext(NavbarContext);
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const currentUserData = useSelector(selectCurrentUserData);

  const logUserOut = useCallback(() => {
    sessionStorage.removeItem('json-wt');
    dispatch(logout());
    history.push('/login');
  }, [dispatch, history]);

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
  const userDropdown = useMemo(
    () =>
      isLoggedIn && (
        <NavItem addClassNames={tw(showOnHover, 'cursor-pointer')}>
          <img
            src={`https://www.gravatar.com/avatar/${md5(
              currentUserData.email ?? 'placeholder@a.a'
            )}?s=36&d=${encodeURI(
              `https://eu.ui-avatars.com/api/${currentUserData?.username}/36/1155ff/ffffff`
            )}`}
            alt="profile"
            className={tw(`rounded-full mr-2`)}
          />{' '}
          {currentUserData?.username}
          <ul
            className={tw(
              'hidden dropdown-menu absolute origin-top-right top-full right-0 w-40 bg-white p-2 text-black rounded-sm shadow z-50'
            )}
          >
            <li className={tw(dropdownItemStyle)}>Profile</li>
            <Link to="/models/new" className={tw(dropdownItemStyle, 'block')}>
              Upload model
            </Link>
            <li className={tw(dropdownItemStyle)}>Your models</li>
            <li className={tw(dropdownItemStyle)}>Your collections</li>
            <Link
              className={tw(dropdownItemStyle, 'block border-b-0')}
              onClick={logUserOut}
              to="/login"
            >
              Logout
            </Link>
          </ul>
        </NavItem>
      ),
    [currentUserData, isLoggedIn, logUserOut]
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
        {userDropdown}
      </ul>
    </nav>
  );
};

export default Navbar;
