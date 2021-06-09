import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { tw } from 'twind';

import {
  setSearchedModels,
  setSearchedModelsPage,
  setSearchedModelsTerm,
  clearSearchedModels,
} from 'state/actions/models.actions';
import { searchModels } from 'api/models.api';

import searchIcon from '../../assets/loupe.svg';

const SearchInput = ({ classNames }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = async () => {
    dispatch(clearSearchedModels());
    dispatch(setSearchedModelsPage(0));
    dispatch(setSearchedModelsTerm(searchTerm));
    if (history.location.pathname !== '/search') {
      history.push('/search');
    }
    const response = await searchModels({ q: searchTerm });
    if (response) {
      dispatch(setSearchedModels(response));
      dispatch(setSearchedModelsPage(1));
    }
  };

  return (
    <div className={tw`flex relative ${classNames?.container}`}>
      <input
        type="text"
        name="search"
        className={tw`rounded-xl w-full ${classNames?.input}`}
        placeholder="search models"
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
        onKeyPress={({ key }) => key === 'Enter' && onSearch()}
      />
      <img
        src={searchIcon}
        className={tw`w-auto h-full right-0 text-white cursor-pointer absolute ${classNames?.button}`}
        alt="search button"
        role="button"
        onClick={() => onSearch()}
      />
    </div>
  );
};

SearchInput.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    button: PropTypes.string,
  }),
};

export default SearchInput;
