import React, { useState, useEffect } from 'react';
import './Filter.css';

interface ParentProps {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string | undefined;
  options: any | undefined;
}

export default function Filter({handleFilter, name, options}: ParentProps) {
  const [checkBoxes, setCheckBoxes] = useState<JSX.Element[] | []>([]);

  const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
  useEffect(() => {
    const elements: string[][] = [];
    for(let key in options) {
      const element = [key, options[key]]
      elements.push(element);
    }
    elements.sort((a: string[], b: string[]): number => {
      if(parseInt(a[1]) < parseInt(b[1])){
        return 1;
      } else if (parseInt(a[1]) > parseInt(b[1])){
        return -1;
      } else {
        return 0;
      }
    })
    const mappedElements = elements.map(element => {
      const category = element[0];
      const count = element[1];
      return  <div className='filter' key={category}>
                <input type='checkbox' name={category} id={category} onChange={handleFilter}/>
                <label htmlFor={category}>{capitalize(category)}&nbsp;({count})</label>
              </div>
    })
    setCheckBoxes(mappedElements);
  }, [options]);

  useEffect(() => {
    checkBoxes.sort()
  })

  return (
    <div className={ name }>
      <h2>{capitalize(name!)}</h2> 
      { checkBoxes }
    </div>
  )
}