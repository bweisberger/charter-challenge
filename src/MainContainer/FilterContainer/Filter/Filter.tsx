import React, { useState, useEffect } from 'react';
import './Filter.css';

interface ParentProps {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string | undefined;
  category: any | undefined;
  
}

export default function Filter({handleFilter, name, category}: ParentProps) {
  const [checkBoxes, setCheckBoxes] = useState<JSX.Element[] | []>([]);

  const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

  useEffect(() => {
    const elements: any[][] = [];
    for(let key in category) {
      const element: any[] = [key, category[key].count, category[key].isChecked]
      elements.push(element);
    }
    elements.sort((a: any[], b: any[]): number => {
      if(parseInt(a[1]) < parseInt(b[1])){
        return 1;
      } else if (parseInt(a[1]) > parseInt(b[1])){
        return -1;
      } else {
        return 0;
      }
    })
    const mappedElements = elements.map(element => {
      const item = element[0];
      const count = element[1];
      const isChecked = element[2];
      return  <span className="checkbox-container" key={item}>
                <input type='checkbox' name={name} id={item} onChange={handleFilter} checked={isChecked}/>
                <label className='filter-label' htmlFor={item}>{capitalize(item)}&nbsp;({count})</label>
                &ensp;
              </span>
    })
    setCheckBoxes(mappedElements);
  }, [category]);

  useEffect(() => {
    checkBoxes.sort()
  })

  return (
    <span className={name}>
      <h2>{ capitalize(name!) }</h2> 
      <div>
        <input type='checkbox' name="check-all" id={name + '-check-all'}/> <label htmlFor={name + '-check-all'}>All</label>
      </div>
      { checkBoxes }
    </span>
  )
}