import React from 'react';
import RestaurantList from './RestaurantList/RestaurantList';
import { IRestaurant } from './types';
import './RestaurantContainer.css';

interface ParentProps {
  restaurants: IRestaurant[];
};
export default function RestaurantContainer({ restaurants }: ParentProps) {

  //TODO: logic for pagination based on number of restaurants and number of restaurantsperpage
const restaurantsToDisplay = () => {
  return restaurants;
}

  return (
    <div className="restaurant-container">
        <RestaurantList restaurants={restaurantsToDisplay()} />
    </div>
  )
}