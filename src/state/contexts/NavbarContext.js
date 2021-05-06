import { createContext } from 'react';

export const navbarDefaultState = {
  showBrand: true,
  showSearch: true,
};

export default createContext({
  state: navbarDefaultState,
  setNavbarState: (navbarState) => {},
});
