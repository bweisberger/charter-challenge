import React from 'react';
import { RestaurantTable } from './Restaurants';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';
import './MainContainer.css';

export default function MainContainer() {
  return (
    <div className='main-container'>
      <SearchBar />
      <Filters />
      <RestaurantTable />
    </div>
  )
}