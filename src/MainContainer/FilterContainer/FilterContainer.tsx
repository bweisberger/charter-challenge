import React, { useEffect } from 'react';
import { Filter } from './Filter';
import './FilterContainer.css';

interface ParentProps {
  genres: any | undefined;
  cities: any | undefined;
  states: any | undefined;
}

export default function FilterContainer({genres, cities, states}: ParentProps) {

  const handleFilter = (e: React.ChangeEvent): void => {
    console.log(e.target, "target");
    return
  }
  return (
    <div>
      <Filter name='genre' options={genres} handleFilter={handleFilter}/>
      <Filter name='state' options={states} handleFilter={handleFilter}/>
      <Filter name='city' options={cities} handleFilter={handleFilter}/>
    </div>
  )
}