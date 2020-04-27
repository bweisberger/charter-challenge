import React, { useEffect } from 'react';
import { Filter } from './Filter';
import './FilterContainer.css';

interface ParentProps {
  genres: any | undefined;
  cities: any | undefined;
  states: any | undefined;
}

export default function FilterContainer({genres, cities, states}: ParentProps) {

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.checked, "target");
    return
  }
  return (
    <div className='filter-container'>
      <Filter name='genre' options={genres} handleFilter={handleFilter}/>
      <Filter name='state' options={states} handleFilter={handleFilter}/>
      <Filter name='city' options={cities} handleFilter={handleFilter}/>
    </div>
  )
}