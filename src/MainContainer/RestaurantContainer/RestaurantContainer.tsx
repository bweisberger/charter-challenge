import React from 'react';
import RestaurantList from './RestaurantList/RestaurantList';
import { IRestaurant } from './types';

interface ParentProps {
  restaurants: IRestaurant[] | undefined;
};
export default function RestaurantContainer({ restaurants }: ParentProps) {

  //TODO: logic for pagination based on number of restaurants and number of restaurantsperpage
const restaurantsToDisplay = () => {
  return restaurants;
}

  return (
    <ul>
      <RestaurantList restaurants={restaurantsToDisplay()} />
    </ul>
  )
}