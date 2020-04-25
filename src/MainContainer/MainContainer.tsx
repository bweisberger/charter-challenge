import React, { useState } from 'react';
import { RestaurantTable } from './Restaurants';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';

export default function MainContainer() {
  return (
    <div>
      <SearchBar/>
      <Filters/>
      <RestaurantTable/>
    </div>
  )
}