import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RestaurantContainer } from './RestaurantContainer';
import { IRestaurant } from './RestaurantContainer/types';
import { FilterContainer } from './FilterContainer';
import { SearchBar } from './SearchBar';
import './MainContainer.css';

export default function MainContainer() {
  const [restaurants, setRestaurants] = useState<IRestaurant[] | undefined>();
  const [sortedRestaurants, setSortedRestaurants] = useState<IRestaurant[] | undefined>();
  const [genres, setGenres] = useState<Set<string> | undefined>();
  const [states, setStates] = useState<Set<string> | undefined>();
  const [cities, setCities] = useState<Set<string> | undefined>();
  // const [search, setSearch] = useState<string | undefined>();

  const options = {
    url: "https://code-challenge.spectrumtoolbox.com/api/restaurants",
    headers: {
      Authorization: "Api-Key q3MNxtfep8Gt",
    },
  }

  const getRestaurants = async ():Promise<void> => {
    await axios(options)
      .then((response: any) => {
        console.log(response.data, 'response');
        setRestaurants([...response.data]);
      });
  }
  useEffect(() => {
    getRestaurants();
  }, [])

  useEffect(() => {
    const sorted = restaurants?.sort((a, b): number => {
      if(a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })
    let genreSet = new Set();
    restaurants?.forEach(restaurant => {
      const genreArray = restaurant.genre.split(',');
      genreArray.forEach(genre => genreSet.add(genre))
      console.log(genreSet, 'inside forEach')
    })
    console.log(genreSet, 'completed set');
    setSortedRestaurants(sorted);
  }, [restaurants?.length])
  return (
    <div className='main-container'>
      <SearchBar />
      <FilterContainer genres={genres} states={states} cities={cities}/>
      <RestaurantContainer restaurants={sortedRestaurants} />
    </div>
  )
}