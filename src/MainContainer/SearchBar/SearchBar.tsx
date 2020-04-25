import React from 'react';

export default function SearchBar() {

  const handleSubmit = (): void => {

  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text'>Search Bar</input>
      <button type='submit'>Search</button>
    </form>
  )
}