import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tw } from 'twind';

import { searchModels } from '../../state/actions/models.actions';

import searchIcon from '../../assets/loupe.svg';

const SearchInput = ({ classNames, searchModels }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = () => {
    searchModels(searchTerm);
    if (history.location.pathname !== '/search') {
      history.push('/search');
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

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ searchModels }, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchInput);
