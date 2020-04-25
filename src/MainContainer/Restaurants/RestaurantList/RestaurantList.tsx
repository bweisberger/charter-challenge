import React from 'react';
import { IRestaurant } from '../types';
import { Restaurant } from '../';

export default function RestaurantList({restaurants}: any) {
  if (restaurants?.length) {
    const list = restaurants.map((restaurant: IRestaurant) => {
      const { id, name } = restaurant;
      return (<Restaurant id={id} name={name}/>)
    })

    return list;
  }
  return null;
}