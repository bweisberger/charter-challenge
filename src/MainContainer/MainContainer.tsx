import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RestaurantContainer } from './RestaurantContainer';
import { IRestaurant } from './RestaurantContainer/types';
import { FilterContainer } from './FilterContainer';
import { SearchBar } from './SearchBar';
import './MainContainer.css';

// interface Category {
//   name: string;
// }

// interface CategoryCount {
//   count: number;
// }

export default function MainContainer() {
  const [restaurants, setRestaurants] = useState<IRestaurant[] | undefined>();
  const [sortedRestaurants, setSortedRestaurants] = useState<IRestaurant[] | undefined>();
  const [genres, setGenres] = useState<any | undefined>();
  const [states, setStates] = useState<any | undefined>();
  const [cities, setCities] = useState<any | undefined>();
  // const [search, setSearch] = useState<string | undefined>();

  const getCategoryCount = (category: string): any => {
    const count: any = {};
    restaurants?.forEach(restaurant => {
      const arr: string[] = (restaurant as any)[category].split(',');
      arr.forEach(el => {
        if(!count.hasOwnProperty(el)) {
          count[el] = 1;
        } else {
          ++count[el]
        }
      })
      return count;
    })
    return count;
  }

  
  const getRestaurants = async ():Promise<void> => {
    const options = {
      url: "https://code-challenge.spectrumtoolbox.com/api/restaurants",
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    }
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
    setGenres(getCategoryCount('genre'));
    setCities(getCategoryCount('city'));
    setStates(getCategoryCount('state'));
    setSortedRestaurants(sorted);
  }, [restaurants?.length])

  useEffect(() => {
    console.log(genres, cities, states, "in maincontainer")
  }, [genres, cities, states])
  return (
    <div className='main-container'>
      <SearchBar />
      <FilterContainer genres={genres} states={states} cities={cities}/>
      <RestaurantContainer restaurants={sortedRestaurants} />
    </div>
  )
}