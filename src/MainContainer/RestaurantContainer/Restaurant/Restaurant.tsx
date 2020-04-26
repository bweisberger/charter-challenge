import React from 'react'
import { IRestaurant } from '../types';

interface IParentProps {
  restaurant: IRestaurant;
}

export default function Restaurant({restaurant}: IParentProps)  {
  const { name, city, state, telephone, genre } = restaurant;
  return (
    <li>
      {name} | {city} | {state} | {telephone} | {genre}
    </li>
  )
}