import React from 'react';
import { IRestaurant } from '../types';
import { Restaurant } from '..';

interface ParentProps {
  restaurants: IRestaurant[];
}

export default function RestaurantList({restaurants}: ParentProps) {
  
  return (
    <ul className='restaurant-ul'>
      {
        restaurants ?
            restaurants.map((restaurant: IRestaurant) => {
              const { id } = restaurant;
              return (<Restaurant key={id} restaurant={restaurant} />)
            })
          
        :
          <div>loading</div>
      }
    </ul>
  )
}