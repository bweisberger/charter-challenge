import React, { useState, useEffect } from 'react';
import RestaurantList from './RestaurantList';
import axios from 'axios';

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

export default function Restaurants() {

  const [restaurants, setRestaurants] = useState<Restaurant[] | any[]>([]);
  const options = {
    url: "https://code-challenge.spectrumtoolbox.com/api/restaurants",
    headers: {
      Authorization: "Api-Key q3MNxtfep8Gt",
    },
  }
  
  useEffect(() => {

  axios(options)
    .then((response: any) => {
      console.log(response.data);
      setRestaurants([...response.data]);
    });
  }, [])

  return (
    <ul>
      <RestaurantList restaurants={ restaurants }/>
    </ul>
  )
}