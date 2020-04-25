import React from 'react';

export default function SearchBar() {

  const handleSubmit = (): void => {

  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder="Search for restaurants" id="search-bar"/>
      <button type='submit'>Search</button>
    </form>
  )
}