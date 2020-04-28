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
}


export default function MainContainer() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [sortedRestaurants, setSortedRestaurants] = useState<IRestaurant[]>([]);
  const [genres, setGenres] = useState<any | undefined>();
  const [states, setStates] = useState<any | undefined>();
  const [cities, setCities] = useState<any | undefined>();
  const [filters, setFilters] = useState<string[]>([]);
  // const [search, setSearch] = useState<string | undefined>();

  const getCategoryCount = (category: string): any => {
    const categories: any = {};
    restaurants?.forEach(restaurant => {
      const arr: string[] = (restaurant as any)[category].split(',');
      arr.forEach(el => {
        if (!categories.hasOwnProperty(el)) {
          categories[el] = { count: 1, isChecked: false };
        } else {
          ++categories[el].count
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
  // const toggleCheck = (category: string, item: string) {
  //   switch(category) {
  //     case 'genre':
  //       setGenresgenres[item].isChecked
  //       break;
  //     case 'city':
  //       cities[item].isChecked
  //       break;
  //     case 'state':
  //       states[item].isChecked
  //       break;
  //   }
  // }

  const filterRestaurants = ({ category, item }: IFilterData) => {
    console.log(restaurants, 'sorted');
    console.log(category, 'category');
    console.log(item, 'item');
    setFilters([item, ...filters])
    // toggleCheck(category, item);

    // Run through restaurants, if filter string is in that category, add the restaurant to array
    const filtered: IRestaurant[] = [];
    restaurants?.forEach((restaurant: any) => {
      filters.forEach(filter => {
        if (restaurant[category].includes(filter)) {
          filtered.push(restaurant)
        }
      })
      }
    });
    
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