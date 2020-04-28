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

interface IFilterData {
  category: string;
  item: string;
  checked: boolean;
}


export default function MainContainer() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [sortedRestaurants, setSortedRestaurants] = useState<IRestaurant[]>([]);
  const [genres, setGenres] = useState<any | undefined>();
  const [states, setStates] = useState<any | undefined>();
  const [cities, setCities] = useState<any | undefined>();
  const [genreFilters, setGenreFilters] = useState<string[]>([]);
  const [cityFilters, setCityFilters] = useState<string[]>([]);
  const [stateFilters, setStateFilters] = useState<string[]>([]);
  // const [search, setSearch] = useState<string | undefined>();

  const getCategoryCount = (category: string): any => {
    const categories: any = {};
    restaurants?.forEach(restaurant => {
      const arr: string[] = (restaurant as any)[category].split(',');
      arr.forEach(el => {
        if (!categories.hasOwnProperty(el)) {
          categories[el] = 1;
        } else {
          ++categories[el]
        }
      })
      return categories;
    })
    return categories;
  }

  const sortRestaurants = (eateries: IRestaurant[], key: keyof IRestaurant): IRestaurant[] => {
    const sorted = eateries?.sort((a, b): number => {
      if (a[key] < b[key]) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })
    return sorted;
  }
  const toggleFilters = (category: string, item: string, checked: boolean) => {
    switch(category) {
      case 'genre':
        if (checked) {
          setGenreFilters([item, ...genreFilters])
        } else {
          const filtered = genreFilters.filter(element => element !== item);
          setGenreFilters(filtered)
        }
        break;
      case 'city':
        if (checked) {
          setCityFilters([item, ...cityFilters])
        } else {
          const filtered = cityFilters.filter(element => element !== item);
          setCityFilters(filtered)
        }
        break;
      case 'state':
        if (checked) {
          setStateFilters([item, ...stateFilters])
        } else {
          const filtered = stateFilters.filter(element => element !== item);
          setStateFilters(filtered)
        }
        break;
      default:
        console.error(`Filter called with category ${category}.`) 
        break;
    }
  }

  const filterRestaurants = ({ category, item, checked }: IFilterData) => {
    toggleFilters(category, item, checked);
    // Run through restaurants, if filter string is in that category, add the restaurant to array
    const filtered: IRestaurant[] = [];
    if(genreFilters.length){
      restaurants?.forEach((restaurant: any) => {
        genreFilters.forEach(filter => {
          if (restaurant.genre.includes(filter)) {
            filtered.push(restaurant)
          }
        })
      });
    }
    if(cityFilters.length){
      restaurants?.forEach((restaurant: any) => {
        cityFilters.forEach(filter => {
          if (restaurant.city.includes(filter)) {
            filtered.push(restaurant)
          }
        })
      });
    }
    if(stateFilters.length){
      restaurants?.forEach((restaurant: any) => {
        stateFilters.forEach(filter => {
          if (restaurant.state.includes(filter)) {
            filtered.push(restaurant)
          }
        })
      });
    }
    setSortedRestaurants(filtered);
  }
    
  

  const getRestaurants = async (): Promise<void> => {
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
    const sorted = sortRestaurants(restaurants, 'name')

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
      <FilterContainer genres={genres} states={states} cities={cities} filterRestaurants={filterRestaurants} />
      <RestaurantContainer restaurants={sortedRestaurants} />
    </div>
  )
}