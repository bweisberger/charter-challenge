import React, { useState, useEffect } from 'react';

interface ParentProps {
  handleFilter: (event: React.ChangeEvent) => void;
  name: string | undefined;
  options: any | undefined;
}

export default function Filter({handleFilter, name, options}: ParentProps) {
  const [checkBoxes, setCheckBoxes] = useState<JSX.Element[] | []>([]);

  const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
  useEffect(() => {
    const elements = [];
    for(let key in options) {
      const count = options[key]
      elements.push(
        <div>
          <input type='checkbox' name={key} id={key} onChange={handleFilter}/>
          <label htmlFor={key}>{capitalize(key)}&nbsp;({count})</label>
        </div>
      )
    }
    setCheckBoxes(elements);
  }, [options]);

  return (
    <div className={ name }>
      { checkBoxes }
    </div>
  )
}