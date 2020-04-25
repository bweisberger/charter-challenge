import React from 'react';

type Restaurant = {
  address1: string;
  attire: string;
  city: string;
  genre: string;
  hours: string;
  id: string;
  lat: string;
  long: string;
  name: string;
  state: string;
  tags: string;
  telephone: string;
  website: string;
  zip: string;
}

export default function RestaurantList({restaurants}: any) {
  if (restaurants?.length) {
    const list = restaurants.map((restaurant: Restaurant) => {
      const { id, name } = restaurant;
      return (<li key={id}>{name}</li>)
    })

    return list;
  }
  return null;
}