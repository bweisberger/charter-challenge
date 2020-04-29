import React from 'react';
import RestaurantList from './RestaurantList/RestaurantList';
import { IRestaurant } from './types';
import './RestaurantContainer.css';

interface ParentProps {
  restaurants: IRestaurant[];
  currentPage: string;
};
export default function RestaurantContainer({ restaurants, currentPage }: ParentProps) {

const restaurantsToDisplay = () => {
  const pageNumber = parseInt(currentPage);
  const lastIndex = pageNumber * 10;
  const firstIndex = lastIndex - 10;
  return restaurants.slice(firstIndex, lastIndex);
}

  return (
    <div className="restaurant-container">
        <RestaurantList restaurants={restaurantsToDisplay()} />
    </div>
  )
}