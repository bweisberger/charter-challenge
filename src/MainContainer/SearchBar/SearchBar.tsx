import React from 'react';

interface ParentProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export default function SearchBar({handleSearch, search, handleChange}: ParentProps) {

  return (
    <form onSubmit={handleSearch}>
      <input type='text' placeholder="Search for restaurants" id="search-bar" value={search} onChange={handleChange}/>
      <button type='submit'>Search</button>
    </form>
  )
}