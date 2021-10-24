import { useState } from 'react';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';


export default function Searchbar({ onSubmit }) {
  
  const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = e => {
      setSearchValue(e.target.value.toLowerCase())
      
    }

    const handleSearchSubmit = e => {
    e.preventDefault();
    if(searchValue.trim() === ''){
      toast.error('Please, enter the search query!', {
        position: toast.POSITION.TOP_LEFT,
        theme: "colored",
      })
      return;
    }
    onSubmit(searchValue)
      setSearchValue('');
    }

        return (
        <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSearchSubmit}>
        <button type="submit" className={s.SearchFormButton}>
      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

    <input
      className={s.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleSearchChange}
      value={searchValue}
    />
  </form>
</header>
    )
    }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

