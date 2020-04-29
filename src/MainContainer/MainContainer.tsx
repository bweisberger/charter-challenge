import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RestaurantContainer } from './RestaurantContainer';
import { PageNumbers } from './RestaurantContainer';
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
  const [currentPage, setCurrentPage] = useState<string>('1')
  const [pages, setPages] = useState<number[]>([]);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);
  const [cityFilters, setCityFilters] = useState<string[]>([]);
  const [stateFilters, setStateFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryCount = (category: string): any => {
    const categories: any = {};
    restaurants.forEach(restaurant => {
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
          setGenreFilters(genreFilters => [item, ...genreFilters]);
        } else {
          setGenreFilters(
            genreFilters => genreFilters.filter(element => element !== item)
          );
        }
        break;
      case 'city':
        if (checked) {
          setCityFilters(cityFilters => [item, ...cityFilters])
        } else {
          setCityFilters(
            cityFilters => cityFilters.filter(element => element !== item)
          );
        }
        break;
      case 'state':
        if (checked) {
          setStateFilters(stateFilters => [item, ...stateFilters])
        } else {
          setStateFilters(
            stateFilters => stateFilters.filter(element => element !== item)
          );
        }
        break;
      default:
        console.error(`Filter called with category ${category}.`) 
        break;
    }
  }

  const handlePage = (e: React.MouseEvent<HTMLSpanElement>) => {
    setCurrentPage((e.target as HTMLSpanElement).textContent!);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldQuery = searchQuery;
    setSearchQuery(e.target.value);
    if (e.target.value.length < oldQuery.length) {
      searchRestaurants();
    } else {
      setSearchQuery(e.target.value);
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRestaurants();
  }

  const searchRestaurants = () => {
    const filtered: IRestaurant[] = [];
    if(searchQuery) {
      sortedRestaurants.forEach((restaurant: any) => {
        for (let key in restaurant) {
          if (restaurant[key].toLowerCase().includes(searchQuery.toLowerCase())) {
            filtered.push(restaurant);
            break;
          }
        }
      })
      setSortedRestaurants(filtered);
    } else {
      return;
    }
  }

  const calculatePages = (arr: IRestaurant[]) => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(arr.length / 10); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  const filterRestaurants = ({ category, item, checked }: IFilterData) => {
    toggleFilters(category, item, checked);
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
        setRestaurants([...response.data]);
      });
  }
  useEffect(() => {
    getRestaurants();
  }, [])

  useEffect(() => {
    const sorted = sortRestaurants(restaurants, 'name')
    setSortedRestaurants(sorted);

    setGenres(getCategoryCount('genre'));
    setCities(getCategoryCount('city'));
    setStates(getCategoryCount('state'));

    setPages(calculatePages(sorted));
    setCurrentPage('1');
  }, [restaurants])

  useEffect(() => {
    // Run through restaurants, if filter string is in that category, add the restaurant to array
    let sorted: IRestaurant[] = [];
    // TODO: Pull this out into its own function
    if (genreFilters.length || cityFilters.length || stateFilters.length ) {
      let filtered: IRestaurant[] = [];
      if(genreFilters.length){
        genreFilters.forEach(filter => {
          restaurants.forEach(restaurant => {
            if(restaurant.genre.includes(filter)) {
              if (!filtered.includes(restaurant)) {
                filtered.push(restaurant);
              }
            }
          })
        })
      }
      if(cityFilters.length){
        cityFilters.forEach(filter => {
          restaurants.forEach((restaurant: any) => {
            if (restaurant.city.includes(filter)) {
              if (!filtered.includes(restaurant)) {
                filtered.push(restaurant)
              }
            }
          })
        });
      }
      if(stateFilters.length){
        stateFilters.forEach(filter => {
          restaurants.forEach((restaurant: any) => {
            if (restaurant.state.includes(filter)) {
              if (!filtered.includes(restaurant)) {
                filtered.push(restaurant)
              }
            }
          })
        });
      }
      sorted = sortRestaurants(filtered, 'name');
    } else {
      sorted = sortRestaurants(restaurants, 'name');
    }
    setSortedRestaurants(sorted);
    setPages(calculatePages(sorted));
  }, [genreFilters, cityFilters, stateFilters, searchQuery])

  useEffect(() => {
    setPages(calculatePages(sortedRestaurants));
    setCurrentPage('1');
  }, [sortedRestaurants])

  return (
    <div className='main-container'>
      <SearchBar handleSearch={handleSearch} search={searchQuery} handleChange={handleChange} />
      <PageNumbers pages={pages} handlePage={handlePage} currentPage={currentPage}/>
      <FilterContainer genres={genres} states={states} cities={cities} filterRestaurants={filterRestaurants} />
      <RestaurantContainer restaurants={sortedRestaurants} currentPage={currentPage}/>
    </div>
  )
}