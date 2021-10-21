import { Component } from 'react';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';


export default class Searchbar extends Component {
    state = {
        searchValue: '',
    }

    handleSearchChange = e => {
      this.setState({searchValue: e.target.value.toLowerCase()})
      
    }

    handleSearchSubmit = e => {
    e.preventDefault();
    if(this.state.searchValue.trim() === ''){
      toast.error('Please, enter the search query!', {
        position: toast.POSITION.TOP_LEFT,
        theme: "colored",
      })
      return;
    }
    this.props.onSubmit(this.state.searchValue)
    // this.setState({searchValue: ''});
    this.reset();
    }

    reset = () => {
      this.setState({searchValue: ''});
    }

    render() {
        return (
        <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSearchSubmit}>
        <button type="submit" className={s.SearchFormButton}>
      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

    <input
      className={s.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.handleSearchChange}
      value={this.state.searchValue}
    />
  </form>
</header>
    )
    }

}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

