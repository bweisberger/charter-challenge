import React from 'react'
// import { IRestaurant } from '../types';

interface IParentProps {
  id: string;
  name: string;
}

export default function Restaurant(props: IParentProps)  {
  const { name, id } = props;
  return (
    <li key={id}>
      {name}
    </li>
  )
}