import React from 'react';
import './SearchBar.css';

interface ParentProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export default function SearchBar({handleSearch, search, handleChange}: ParentProps) {

  return (
    <form onSubmit={handleSearch} className='search-bar-container'>
      <input type='text' placeholder="Search for restaurants" id="search-bar" className='search-bar' value={search} onChange={handleChange}/>
      <button className='submit-button' type='submit'>Search</button>
    </form>
  )
}