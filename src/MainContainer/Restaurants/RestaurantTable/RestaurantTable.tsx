import React, { useState, useEffect } from 'react';
import RestaurantList from '../RestaurantList/RestaurantList';
import axios from 'axios';
import { IRestaurant } from '../types';


export default function RestaurantTable() {

  const [restaurants, setRestaurants] = useState<IRestaurant[] | []>([]);
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