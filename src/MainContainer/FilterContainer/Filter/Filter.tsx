import React, { useState, useEffect } from 'react';

interface ParentProps {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string | undefined;
  category: any | undefined;
  
}

export default function Filter({handleFilter, name, category}: ParentProps) {
  const [checkBoxes, setCheckBoxes] = useState<JSX.Element[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

  const categoryCountArray = (): any[][] => {
    const elements: any[][] = [];
    for(let key in category) {
      const element: any[] = [key, category[key]]
      elements.push(element);
    }
    return elements;
  }

  const sortByCount = (a: any[], b: any[]): number => {
    return b[1] - a[1];
  }

  const toggleExpand = () => {
    setExpanded(expanded => !expanded);
  }

  useEffect(() => {
    const elements = categoryCountArray();
    elements.sort(sortByCount);

    const mappedElements = elements.map(element => {
      const item = element[0];
      const count = element[1];
      return  (
        <span key={item}>
          <input type='checkbox' name={name} id={item} onChange={handleFilter}/>
          <label className='filter-label' htmlFor={item}>{capitalize(item)}&nbsp;({count})</label>
          <br/>
        </span>
      )
    })
    setCheckBoxes(mappedElements);
  }, [category]);

  useEffect(() => {
    checkBoxes.sort()
  })

  return (
    <span className={name}>
      {/* TODO: Create checkbox group with parent checkbox */}
  <h3 className='filter-title' onClick={toggleExpand}>{expanded ? "-" : "+"} { capitalize(name!) }</h3> 
      <div className='checkbox-container'>{ expanded ? checkBoxes : null }</div>
    </span>
  )
}