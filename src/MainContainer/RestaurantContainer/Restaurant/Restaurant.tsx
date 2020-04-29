import React from 'react'
import { IRestaurant } from '../types';

interface IParentProps {
  restaurant: IRestaurant;
}

export default function Restaurant({restaurant}: IParentProps)  {
  const { name, city, state, telephone, genre } = restaurant;
  return (
    <li className='restaurant-li'>
      <h3 className='restaurant-name'>{name}</h3> {city}, {state} | {telephone} | {genre.split(',').join(', ')}
    </li>
  )
}