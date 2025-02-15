import React, { useState, useEffect } from 'react';
import { Filter } from './Filter';
import './FilterContainer.css';

interface ParentProps {
  // TODO: created interfaces to describe genres
  genres: any | undefined;
  cities: any | undefined;
  states: any | undefined;
  filterRestaurants: (data: any) => void;
}

export default function FilterContainer(props: ParentProps) {
  const { genres, states, cities, filterRestaurants } = props;

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filterData = {
      category: e.target.name,
      item: e.target.id,
      checked: e.target.checked,
    }
    filterRestaurants(filterData);
  }

  return (
    <div className='filter-container'>
      <Filter name='genre' category={genres} handleFilter={handleFilter}/>
      <Filter name='state' category={states} handleFilter={handleFilter}/>
      <Filter name='city' category={cities} handleFilter={handleFilter}/>
    </div>
  )
}